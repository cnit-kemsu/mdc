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
  
  //private overlay: HTMLElement;
  //private overlayStyle: CSSStyleDeclaration;
  private setOverlayStyleProperty: (propertyName: string, value: string) => void;
  private removeOverlayStyleProperty: (propertyName: string) => string;
  private getOverlayComputedStyle: () => CSSStyleDeclaration;

  protected inputElement: HTMLInputElement;

  constructor(templateNode: Node) {
    super();
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    //this.overlay = this.shadowRoot.children[1] as HTMLElement;
    const overlay = this.shadowRoot.children[1] as HTMLElement;
    const overlayStyle = overlay.style;
    //this.overlayStyle = this.overlay.style;
    this.setOverlayStyleProperty = overlayStyle.setProperty.bind(overlayStyle);
    this.removeOverlayStyleProperty = overlayStyle.removeProperty.bind(overlayStyle);
    this.getOverlayComputedStyle = () => getComputedStyle(overlay);

    this.cancelPressedState = this.cancelPressedState.bind(this);
    this.ripple_startPhase1 = this.ripple_startPhase1.bind(this);
    this.ripple_onPhase1Complete = this.ripple_onPhase1Complete.bind(this);
    this.ripple_onPhase3Complete = this.ripple_onPhase3Complete.bind(this);

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

  private ripple_onPhase3Complete() {
    this.ripplePhase = 0;
    this.removeOverlayStyleProperty('--md-ripple-animation');
    this.setOverlayStyleProperty('--md-overlay-opacity-1-current', 'var(--md-overlay-opacity-1)');
  }
  private ripple_startPhase3() {
    this.ripplePhase = 3;
    this.setOverlayStyleProperty('--md-ripple-animation', 'var(--md-ripple-fade)');
    this.currentTimeout = <any>setTimeout(this.ripple_onPhase3Complete, this.duration_phase3);
  }
  private ripple_onPhase1Complete() {
    if (this.isPressed) this.ripplePhase = 2;
    else this.ripple_startPhase3();
  }
  private ripple_startPhase1() {
    const ov_comp_style = this.getOverlayComputedStyle();
    
    this.duration_phase1 = Math.max(
      parseInt(ov_comp_style.getPropertyValue('--md-ripple-transofrm-duration')),
      parseInt(ov_comp_style.getPropertyValue('--md-ripple-fadein-duration'))
    );
    this.duration_phase3 = parseInt(ov_comp_style.getPropertyValue('--md-ripple-fadeout-duration'));

    this.setOverlayStyleProperty('--md-overlay-opacity-1-current', ov_comp_style.getPropertyValue('--md-overlay-opacity-1'));

    this.setOverlayStyleProperty('--md-ripple-animation', 'var(--md-ripple-spread)');
    this.currentTimeout = <any>setTimeout(this.ripple_onPhase1Complete, this.duration_phase1);
  }
  
  private invokePressedState(startX?: number, startY?: number) {
    this.isPressed = true;
    const { clientWidth, clientHeight, sizeSnapshot } = this;

    if (sizeSnapshot.width !== clientWidth || sizeSnapshot.height !== clientHeight) {
      sizeSnapshot.width = clientWidth;
      sizeSnapshot.height = clientHeight;
      const rippleSize = Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight);
      this.setOverlayStyleProperty('--md-ripple-size', rippleSize + 'px');
      this.setOverlayStyleProperty('--md-ripple-left', (clientWidth - rippleSize) / 2 + 'px');
      this.setOverlayStyleProperty('--md-ripple-top', (clientHeight - rippleSize) / 2 + 'px');
    }
    
    this.setOverlayStyleProperty('--md-ripple-start-x', (startX - clientWidth / 2 || 0) + 'px');
    this.setOverlayStyleProperty('--md-ripple-start-y', (startY - clientHeight / 2 || 0) + 'px');

    if (this.ripplePhase === 1) {
      clearTimeout(this.currentTimeout);
      this.removeOverlayStyleProperty('--md-ripple-animation');
      requestAnimationFrame(this.ripple_startPhase1);
    } else {
      if (this.ripplePhase === 3) clearTimeout(this.currentTimeout);
      this.ripplePhase = 1;
      this.ripple_startPhase1();
    }
  }
  private cancelPressedState() {
    this.isPressed = false;
    if (this.ripplePhase === 2) this.ripple_startPhase3();
  }

  private handleMousedown({ offsetX, offsetY }: MouseEvent) {
    if (!this.isPressed) {
      __mouseup_callback = this.cancelPressedState;
      this.invokePressedState(offsetX, offsetY);
    }
  }
  private handleKeydown({ key }: KeyboardEvent) {
    if (key === ' ' && !this.isPressed) {
      __invoke_keyup_callback();
      __keyup_callback = this.cancelPressedState;
      this.invokePressedState();
    }
  }
}

let __mouseup_callback: () => void = null;
addEventListener('mouseup', function () {
  if (__mouseup_callback === null) return;
  __mouseup_callback();
  __mouseup_callback = null;
});

let __keyup_callback: () => void = null;
function __invoke_keyup_callback() {
  if (__keyup_callback === null) return;
  __keyup_callback();
  __keyup_callback = null;
};
addEventListener('keyup', function ({ key }: KeyboardEvent) {
  if (key === ' ') __invoke_keyup_callback();
});
addEventListener('contextmenu', __invoke_keyup_callback);

// Math.round

// this.inputElement = this.shadowRoot.childNodes[this.shadowRoot.childNodes.length - 1] as HTMLInputElement;

// const { left, top } = this.getBoundingClientRect();
// this.playAnimation1(event.clientX - left, event.clientY - top);