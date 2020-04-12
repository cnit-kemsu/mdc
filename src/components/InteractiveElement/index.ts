import templateHTML from './template.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

export default class InteractiveElement extends HTMLElement {

  private lastPressProps: {
    clientWidth: number,
    clientHeight: number
  } = {
    clientWidth: undefined,
    clientHeight: undefined
  };

  private fadeinTimeout: any;
  private isActive: boolean = false;

  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    const child = template.content.cloneNode(true);
    this.shadowRoot.appendChild(child);

    this.playRippleFadeinAnimation = this.playRippleFadeinAnimation.bind(this);
    this.onFadeinTimeoutExpires = this.onFadeinTimeoutExpires.bind(this);
    this.onMousedown = this.onMousedown.bind(this);
    this.onMouseup = this.onMouseup.bind(this);

    this.addEventListener('mousedown', this.onMousedown);
    this.addEventListener('mouseup', this.onMouseup);
  }

  private playRippleFadeoutAnimation() {
    this.style.setProperty('--ripple-animation', 'var(--ripple-out-animation)');
  }

  private onFadeinTimeoutExpires() {
    this.fadeinTimeout = undefined;
    if (this.isActive) return;
    this.playRippleFadeoutAnimation();
  }

  private playRippleFadeinAnimation() {
    this.style.setProperty('--ripple-animation', 'var(--ripple-in-animation)');
    this.fadeinTimeout = setTimeout(this.onFadeinTimeoutExpires, 225);
  }

  private onMousedown(event: MouseEvent) {

    const { clientWidth, clientHeight, offsetLeft, offsetTop, lastPressProps } = this;

    if (lastPressProps.clientWidth !== clientWidth || lastPressProps.clientHeight !== clientHeight) {
      lastPressProps.clientWidth = clientWidth;
      lastPressProps.clientHeight = clientHeight;
      const rippleEndSize = Math.round(Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight));
      this.style.setProperty('--ripple-end-size', rippleEndSize + 'px');
      this.style.setProperty('--ripple-end-x', (clientWidth - rippleEndSize) / 2 + 'px');
      this.style.setProperty('--ripple-end-y', (clientHeight - rippleEndSize) / 2 + 'px');
    }
    
    this.style.setProperty('--ripple-start-x', event.clientX - (offsetLeft + clientWidth / 2) + 'px');
    this.style.setProperty('--ripple-start-y', event.clientY - (offsetTop + clientHeight / 2) + 'px');

    this.isActive = true;
    if (this.fadeinTimeout !== undefined) {
      clearTimeout(this.fadeinTimeout);
      this.style.removeProperty('--ripple-animation');
      window.requestAnimationFrame(this.playRippleFadeinAnimation);
    } else this.playRippleFadeinAnimation();
  }

  onMouseup() {
    this.isActive = false;
    if (this.fadeinTimeout === undefined) this.playRippleFadeoutAnimation();
  }
}