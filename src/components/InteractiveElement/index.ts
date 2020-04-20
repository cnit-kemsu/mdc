import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

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
  // // Animation duration of the 1st phase of the ripple
  // private duration_phase1: number = 0;
  // // Animation duration of the 3rd phase of the ripple
  // private duration_phase3: number = 0;
  // Current ripple animation timeout id
  private currentTimeout: number = 0;
  
  protected setOverlayStyleProp: (propertyName: string, value: string) => void;
  private removeOverlayStyleProp: (propertyName: string) => string;
  private getOverlayComputedStyle: () => CSSStyleDeclaration;

  protected inputElement: HTMLInputElement;

  constructor(templateNode: Node) {
    super();
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    const overlay = this.shadowRoot.children[1] as HTMLElement;
    const overlayStyle = overlay.style;
    this.setOverlayStyleProp = overlayStyle.setProperty.bind(overlayStyle);
    this.removeOverlayStyleProp = overlayStyle.removeProperty.bind(overlayStyle);
    this.getOverlayComputedStyle = () => getComputedStyle(overlay);

    this.releasePressedState = this.releasePressedState.bind(this);
    this.ripple_startPhase1 = this.ripple_startPhase1.bind(this);
    this.ripple_onPhase1Complete = this.ripple_onPhase1Complete.bind(this);
    this.ripple_onPhase3Complete = this.ripple_onPhase3Complete.bind(this);

    this.addEventListener('mousedown', this.handleMousedown);
    this.addEventListener('keydown', this.handleKeydown);

    this.shadowRoot.appendChild(templateNode);
    this.inputElement = this.shadowRoot.querySelector('#input');
    // this.inputElement = this.shadowRoot.childNodes[this.shadowRoot.childNodes.length - 1] as HTMLInputElement;
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

  static get observedAttributes() {
    return ['disabled'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'disabled') {
      if (newValue !== null) this.inputElement.disabled = true;
      else this.inputElement.disabled = false;
    }
  }

  // private resetOverlayTransitionCallback = () => this.setOverlayStyleProp('--md-overlay-transition-current', 'var(--md-overlay-transition)');
  // private resetOverlayTransition = () => requestAnimationFrame(this.resetOverlayTransitionCallback);
  private ripple_onPhase3Complete() {
    this.ripplePhase = 0;
    this.removeOverlayStyleProp('--md-ripple-animation');
    
    this.setOverlayStyleProp('--md-overlay-opacity-current', 'var(--md-overlay-opacity)');
    //requestAnimationFrame(this.resetOverlayTransition);
  }
  private ripple_startPhase3() {
    this.ripplePhase = 3;
    this.setOverlayStyleProp('--md-ripple-animation', 'var(--md-ripple-fade)');
    // this.currentTimeout = <any>setTimeout(this.ripple_onPhase3Complete, this.duration_phase3);
    this.currentTimeout = <any>setTimeout(this.ripple_onPhase3Complete, 150);
  }
  private ripple_onPhase1Complete() {
    if (this.isPressed) this.ripplePhase = 2;
    else this.ripple_startPhase3();
  }
  private ripple_startPhase1() {
    const overlayCurrentStyle = this.getOverlayComputedStyle();

    // this.duration_phase1 = Math.max(
    //   parseInt(overlayCurrentStyle.getPropertyValue('--md-ripple-transform-duration')),
    //   parseInt(overlayCurrentStyle.getPropertyValue('--md-ripple-fadein-duration'))
    // );
    // this.duration_phase3 = parseInt(overlayCurrentStyle.getPropertyValue('--md-ripple-fadeout-duration'));

    this.setOverlayStyleProp('--md-overlay-opacity-current', overlayCurrentStyle.getPropertyValue('--md-overlay-opacity'));
    //this.setOverlayStyleProp('--md-overlay-transition-current', 'none');

    this.setOverlayStyleProp('--md-ripple-animation', 'var(--md-ripple-spread)');
    // this.currentTimeout = <any>setTimeout(this.ripple_onPhase1Complete, this.duration_phase1);
    this.currentTimeout = <any>setTimeout(this.ripple_onPhase1Complete, 225);
  }
  
  private invokePressedState() {
    this.isPressed = true;
    const { clientWidth, clientHeight, sizeSnapshot, pressX, pressY } = this;

    if (sizeSnapshot.width !== clientWidth || sizeSnapshot.height !== clientHeight) {
      sizeSnapshot.width = clientWidth;
      sizeSnapshot.height = clientHeight;
      // Math.round
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
      requestAnimationFrame(this.ripple_startPhase1);
    } else {
      if (this.ripplePhase === 3) clearTimeout(this.currentTimeout);
      this.ripplePhase = 1;
      this.ripple_startPhase1();
    }
  }
  private releasePressedState() {
    this.isPressed = false;
    if (this.ripplePhase === 2) this.ripple_startPhase3();
  }

  private handleMousedown(event: MouseEvent) {
    if (this.isPressed) return;
    mouseupCallback = this.releasePressedState;
    this.pressX = event.offsetX;
    this.pressY = event.offsetY;
    // const { left, top } = this.getBoundingClientRect();
    // this.pressX = event.clientX - left;
    // this.pressY = event.clientY - top;
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