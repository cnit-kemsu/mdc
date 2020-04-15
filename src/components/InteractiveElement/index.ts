import templateHTML from './template.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

export default class InteractiveElement extends HTMLElement {

  private fixed: {
    width: number,
    height: number
  } = {
    width: 0,
    height: 0
  };

  private fadeinTimeout: any;
  private fadeoutTimeout: any;
  private isPressed: boolean = false;

  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    const child = template.content.cloneNode(true);
    this.shadowRoot.appendChild(child);

    this.playRippleFadeinAnimation = this.playRippleFadeinAnimation.bind(this);
    this.onFadeinTimeoutExpires = this.onFadeinTimeoutExpires.bind(this);
    //this.onMousedown = this.onMousedown.bind(this);
    //this.onMouseup = this.onMouseup.bind(this);

    this.addEventListener('mousedown', this.onMousedown);
  }

  private playRippleFadeoutAnimation() {
    this.style.setProperty('--ripple-animation', 'var(--ripple-fadeout-animation)');
    this.fadeoutTimeout = setTimeout(() => {
      this.style.removeProperty('--ripple-animation');
      this.style.setProperty('--overlay-opacity', 'var(--state-overlay-opacity)');
    }, 150);
  }

  private onFadeinTimeoutExpires() {
    this.fadeinTimeout = undefined;
    if (this.isPressed) return;
    this.playRippleFadeoutAnimation();
  }

  private playRippleFadeinAnimation() {
    this.style.setProperty('--ripple-animation', 'var(--ripple-fadein-animation)');
    this.fadeinTimeout = setTimeout(this.onFadeinTimeoutExpires, 225);
  }

  private onMousedown(event: MouseEvent) {
    
    currentPressedElement = this;

    const { clientWidth, clientHeight, fixed } = this;

    if (fixed.width !== clientWidth || fixed.height !== clientHeight) {
      fixed.width = clientWidth;
      fixed.height = clientHeight;
      // Math.round
      const rippleOverlaySize = Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight);
      this.style.setProperty('--ripple-overlay-size', rippleOverlaySize + 'px');
      this.style.setProperty('--ripple-overlay-left', (clientWidth - rippleOverlaySize) / 2 + 'px');
      this.style.setProperty('--ripple-overlay-top', (clientHeight - rippleOverlaySize) / 2 + 'px');
    }
    
    /*
      const { left, top } = this.getBoundingClientRect();
      const offsetX === event.clientX - left;
      const offsetY === event.clientY - top;
    */
    this.style.setProperty('--ripple-animation-start-x', event.offsetX - clientWidth / 2 + 'px');
    this.style.setProperty('--ripple-animation-start-y', event.offsetY - clientHeight / 2 + 'px');

    if (this.fadeoutTimeout !== undefined) {
      clearTimeout(this.fadeoutTimeout);
      this.fadeoutTimeout = undefined;
    }

    const style = window.getComputedStyle(this);
    this.style.setProperty('--overlay-opacity', style.getPropertyValue('--state-overlay-opacity'));

    this.isPressed = true;
    if (this.fadeinTimeout !== undefined) {
      clearTimeout(this.fadeinTimeout);
      this.style.removeProperty('--ripple-animation');
      window.requestAnimationFrame(this.playRippleFadeinAnimation);
    } else this.playRippleFadeinAnimation();
  }

  disablePressedState() {
    this.isPressed = false;
    if (this.fadeinTimeout === undefined) this.playRippleFadeoutAnimation();
  }
}

let currentPressedElement: InteractiveElement = null;
document.addEventListener('mouseup', () => {
  if (currentPressedElement === null) return;
  currentPressedElement.disablePressedState();
  currentPressedElement = null;
});
