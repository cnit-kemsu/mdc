import templateHTML from './template.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

interface SizeSnapshot {
  width: number;
  height: number;
}

export default class InteractiveElement extends HTMLElement {

  private isPressed: boolean = false;
  private sizeSnapshot: SizeSnapshot = { width: 0, height: 0 };
  private pressX: number = -1;
  private pressY: number = -1;
  // All ripple phases:
  // 0 - not existent;
  // 1 - animation of spreading;
  // 2 - sustaining;
  // 3 - animation of fading.
  private ripplePhase: number = 0;
  // Animation duration of the 1st phase of the ripple
  private duration_phase1: number = 0;
  // Animation duration of the 3rd phase of the ripple
  private duration_phase3: number = 0;
  // Current ripple animation timeout id
  private currentTimeout: number = 0;
  
  private setOverlayStyleProp: (propertyName: string, value: string) => void;
  private removeOverlayStyleProp: (propertyName: string) => string;
  private getOverlayComputedStyle: () => CSSStyleDeclaration;

  protected inputElement: HTMLInputElement;

  constructor(templateNode: Node) {
    super();
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const overlay = this.shadowRoot.children[1] as HTMLElement;
    const overlayStyle = overlay.style;
    this.setOverlayStyleProp = overlayStyle.setProperty.bind(overlayStyle);
    this.removeOverlayStyleProp = overlayStyle.removeProperty.bind(overlayStyle);
    this.getOverlayComputedStyle = () => getComputedStyle(overlay);

    this.releasePressedState = this.releasePressedState.bind(this);
    this.startRipplePhase1 = this.startRipplePhase1.bind(this);
    this.onRipplePhase1Complete = this.onRipplePhase1Complete.bind(this);
    this.onRipplePhase3Complete = this.onRipplePhase3Complete.bind(this);

    this.addEventListener('mousedown', this.handleMousedown);
    this.addEventListener('keydown', this.handleKeydown);

    this.shadowRoot.appendChild(templateNode);
    this.inputElement = this.shadowRoot.querySelector('#input');
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', '');
      this.inputElement.disabled = true;
    } else {
      this.removeAttribute('disabled');
      this.inputElement.disabled = false;
    }
  }

  connectedCallback() {
    if (this.hasAttribute('disabled')) this.inputElement.disabled = true;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'disabled') {
      if (newValue !== null) this.inputElement.disabled = true;
      this.inputElement.disabled = false;
    }
  }

  private onRipplePhase3Complete() {
    this.ripplePhase = 0;
    this.removeOverlayStyleProp('--md-ripple-animation');
    this.setOverlayStyleProp('--md-overlay-opacity-1-current', 'var(--md-overlay-opacity-1)');
  }
  private startRipplePhase3() {
    this.ripplePhase = 3;
    this.setOverlayStyleProp('--md-ripple-animation', 'var(--md-ripple-fade)');
    this.currentTimeout = <any>setTimeout(this.onRipplePhase3Complete, this.duration_phase3);
  }
  private onRipplePhase1Complete() {
    if (this.isPressed) this.ripplePhase = 2;
    else this.startRipplePhase3();
  }
  private startRipplePhase1() {
    const ov_comp_style = this.getOverlayComputedStyle();
    this.duration_phase1 = Math.max(
      parseInt(ov_comp_style.getPropertyValue('--md-ripple-duration-transform')),
      parseInt(ov_comp_style.getPropertyValue('--md-ripple-duration-fadein'))
    );
    this.duration_phase3 = parseInt(ov_comp_style.getPropertyValue('--md-ripple-duration-fadeout'));
    this.setOverlayStyleProp('--md-overlay-opacity-1-current', ov_comp_style.getPropertyValue('--md-overlay-opacity-1'));

    this.setOverlayStyleProp('--md-ripple-animation', 'var(--md-ripple-spread)');
    this.currentTimeout = <any>setTimeout(this.onRipplePhase1Complete, this.duration_phase1);
  }
  
  private invokePressedState() {
    this.isPressed = true;
    const { clientWidth, clientHeight, sizeSnapshot, pressX, pressY } = this;

    if (sizeSnapshot.width !== clientWidth || sizeSnapshot.height !== clientHeight) {
      sizeSnapshot.width = clientWidth;
      sizeSnapshot.height = clientHeight;
      const rippleSize = Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight);
      this.setOverlayStyleProp('--md-ripple-size', rippleSize + 'px');
      this.setOverlayStyleProp('--md-ripple-left', (clientWidth - rippleSize) / 2 + 'px');
      this.setOverlayStyleProp('--md-ripple-top', (clientHeight - rippleSize) / 2 + 'px');
    }
    
    const startX = pressX === -1 ? 0 : pressX - clientWidth / 2;
    const startY = pressY === -1 ? 0 : pressY - clientHeight / 2;
    this.setOverlayStyleProp('--md-ripple-start-x', startX + 'px');
    this.setOverlayStyleProp('--md-ripple-start-y', startY + 'px');

    if (this.ripplePhase === 1) {
      clearTimeout(this.currentTimeout);
      this.removeOverlayStyleProp('--md-ripple-animation');
      requestAnimationFrame(this.startRipplePhase1);
    } else {
      if (this.ripplePhase === 3) clearTimeout(this.currentTimeout);
      this.ripplePhase = 1;
      this.startRipplePhase1();
    }
  }
  private releasePressedState() {
    this.isPressed = false;
    if (this.ripplePhase === 2) this.startRipplePhase3();
  }

  private handleMousedown(event: MouseEvent) {
    if (this.isPressed) return;
    mouseupCallback = this.releasePressedState;
    this.pressX = event.offsetX;
    this.pressY = event.offsetY;
    this.invokePressedState();
  }
  private handleKeydown(event: KeyboardEvent) {
    if (event.key !== ' ' || this.isPressed) return;
    invokeKeyupCallback();
    keyupCallback = this.releasePressedState;
    this.pressX = -1;
    this.pressY = -1;
    this.invokePressedState();
  }
}

let mouseupCallback: () => void = null;
addEventListener('mouseup', function () {
  if (mouseupCallback === null) return;
  mouseupCallback();
  mouseupCallback = null;
});

let keyupCallback: () => void = null;
function invokeKeyupCallback() {
  if (keyupCallback === null) return;
  keyupCallback();
  keyupCallback = null;
};
addEventListener('keyup', function (event: KeyboardEvent) {
  if (event.key === ' ') invokeKeyupCallback();
});
addEventListener('contextmenu', invokeKeyupCallback);

// Math.round

// this.inputElement = this.shadowRoot.childNodes[this.shadowRoot.childNodes.length - 1] as HTMLInputElement;

// const { left, top } = this.getBoundingClientRect();
// this.playAnimation1(event.clientX - left, event.clientY - top);