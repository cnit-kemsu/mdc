import InteractiveElement from './InteractiveElement';
import './RippleOverlay';
import template from './RippleEffect.html';

interface SizeSnapshot {
  width: number;
  height: number;
}

export default class RippleEffect {

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

  private targetEl: InteractiveElement;

  constructor(targetEl: InteractiveElement) {

    this.targetEl = targetEl;
    targetEl.shadowRoot.appendChild(template.fragment);

    const overlay = targetEl.shadowRoot.querySelector('m-ripple-overlay') as HTMLElement;
    const overlayStyle = overlay.style;
    this.setOverlayStyleProp = overlayStyle.setProperty.bind(overlayStyle);
    this.removeOverlayStyleProp = overlayStyle.removeProperty.bind(overlayStyle);
    this.getOverlayComputedStyle = () => getComputedStyle(overlay);

    this.releasePressedState = this.releasePressedState.bind(this);
    this.ripple_startPhase1 = this.ripple_startPhase1.bind(this);
    this.ripple_onPhase1Complete = this.ripple_onPhase1Complete.bind(this);
    this.ripple_onPhase3Complete = this.ripple_onPhase3Complete.bind(this);

    this.handleMousedown = this.handleMousedown.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    targetEl.addEventListener('mousedown', this.handleMousedown);
    targetEl.addEventListener('keydown', this.handleKeydown);

    // targetEl.addEventListener('touchstart', this.handleTouchstart);
    // targetEl.addEventListener('touchend', this.handleTouchend);
    // targetEl.addEventListener('mouseup', this.handleMouseup);
  }
  private ripple_onPhase3Complete() {
    this.ripplePhase = 0;
    this.removeOverlayStyleProp('--m-ripple-animation');
    
    this.setOverlayStyleProp('--m-overlay-current-opacity', 'var(--m-overlay-opacity)');
  }
  private ripple_startPhase3() {
    this.ripplePhase = 3;
    this.setOverlayStyleProp('--m-ripple-animation', 'var(--m-ripple-fade)');
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
    //   parseInt(overlayCurrentStyle.getPropertyValue('--m-ripple-transform-duration')),
    //   parseInt(overlayCurrentStyle.getPropertyValue('--m-ripple-fadein-duration'))
    // );
    // this.duration_phase3 = parseInt(overlayCurrentStyle.getPropertyValue('--m-ripple-fadeout-duration'));

    this.setOverlayStyleProp('--m-overlay-current-opacity', overlayCurrentStyle.getPropertyValue('--m-overlay-opacity'));

    this.setOverlayStyleProp('--m-ripple-animation', 'var(--m-ripple-spread)');
    // this.currentTimeout = <any>setTimeout(this.ripple_onPhase1Complete, this.duration_phase1);
    this.currentTimeout = <any>setTimeout(this.ripple_onPhase1Complete, 225);
  }
  
  private invokePressedState() {
    this.isPressed = true;
    const { targetEl: { clientWidth, clientHeight }, sizeSnapshot, pressX, pressY } = this;

    if (sizeSnapshot.width !== clientWidth || sizeSnapshot.height !== clientHeight) {
      sizeSnapshot.width = clientWidth;
      sizeSnapshot.height = clientHeight;
      // Math.round
      const rippleSize = Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight);
      this.setOverlayStyleProp('--m-ripple-size', rippleSize + 'px');
      this.setOverlayStyleProp('--m-ripple-left', (clientWidth - rippleSize) / 2 + 'px');
      this.setOverlayStyleProp('--m-ripple-top', (clientHeight - rippleSize) / 2 + 'px');
    }
    
    const startX = pressX === -1 ? 0 : pressX - clientWidth / 2;
    const startY = pressY === -1 ? 0 : pressY - clientHeight / 2;
    this.setOverlayStyleProp('--m-ripple-start-x', startX + 'px');
    this.setOverlayStyleProp('--m-ripple-start-y', startY + 'px');

    if (this.ripplePhase === 1) {
      clearTimeout(this.currentTimeout);
      this.removeOverlayStyleProp('--m-ripple-animation');
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

  // private handleTouchstart(event: TouchEvent) {
  //   if (this.isPressed) return;
  //   // touchendCallback = this.releasePressedState;
  //   const touch = event.touches[0];
  //   const { left, top } = this.getBoundingClientRect();
  //   this.pressX = touch.clientX - left;
  //   this.pressY = touch.clientY - top;
  //   this.invokePressedState();
  // }

  // private handleTouchend(event: TouchEvent) {
  //   //event.preventDefault();
  //   //this.releasePressedState();
  // }

  // private handleMouseup() {
  //   this.releasePressedState();
  // }

  private handleMousedown(event: MouseEvent) {
    if (this.isPressed) return;
    mouseupCallback = this.releasePressedState;
    this.pressX = event.offsetX;
    this.pressY = event.offsetY;
    this.invokePressedState();
  }

  private handleKeydown(event: KeyboardEvent) {
    if (event.key !== ' ' || this.isPressed) return;
    event.preventDefault();
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

// let touchendCallback: () => void = null;
// addEventListener('touchend', function (event: TouchEvent) {
//   if (touchendCallback === null) return;
//   touchendCallback();
//   touchendCallback = null;
// });

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