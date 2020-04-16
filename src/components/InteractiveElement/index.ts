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
  private duration1: number = 0;
  private duration2: number = 0;
  private currentTimeout: number = 0;
  private animationStage: number = 0;
  private overlay: HTMLElement;
  private overlayStyle: CSSStyleDeclaration;

  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    const child = template.content.cloneNode(true);
    this.shadowRoot.appendChild(child);

    this.overlay = this.shadowRoot.children[1] as HTMLElement;
    this.overlayStyle = this.overlay.style;

    this.onMouseUp = this.onMouseUp.bind(this);
    this.playAnimation1 = this.playAnimation1.bind(this);
    this.onAnimation1Complete = this.onAnimation1Complete.bind(this);
    this.onAnimation2Complete = this.onAnimation2Complete.bind(this);

    this.addEventListener('mousedown', this.onMouseDown);
  }

  private onAnimation2Complete() {
    this.animationStage = 0;
    this.overlayStyle.removeProperty('--md-ripple-animation');
    this.overlayStyle.setProperty('--md-overlay-opacity-1-current', 'var(--md-overlay-opacity-1)');
  }
  private playAnimation2() {
    this.animationStage = 2;
    this.overlayStyle.setProperty('--md-ripple-animation', 'var(--md-ripple-stage2)');
    this.currentTimeout = <any>setTimeout(this.onAnimation2Complete, this.duration2);
  }
  private onAnimation1Complete() {
    if (this.isPressed) this.animationStage = 0;
    else this.playAnimation2();
  }
  private playAnimation1() {
    this.overlayStyle.setProperty('--md-ripple-animation', 'var(--md-ripple-stage1)');
    this.currentTimeout = <any>setTimeout(this.onAnimation1Complete, this.duration1);
  }

  private onMouseDown(event: MouseEvent) {
    currentMouseUpCallback = this.onMouseUp;
    this.isPressed = true;
    const { clientWidth, clientHeight, sizeSnapshot } = this;

    if (sizeSnapshot.width !== clientWidth || sizeSnapshot.height !== clientHeight) {
      sizeSnapshot.width = clientWidth;
      sizeSnapshot.height = clientHeight;
      // Math.round
      const rippleOverlaySize = Math.sqrt(clientWidth * clientWidth + clientHeight * clientHeight);
      this.overlayStyle.setProperty('--md-ripple-size', rippleOverlaySize + 'px');
      this.overlayStyle.setProperty('--md-ripple-left', (clientWidth - rippleOverlaySize) / 2 + 'px');
      this.overlayStyle.setProperty('--md-ripple-top', (clientHeight - rippleOverlaySize) / 2 + 'px');
    }
    
    /*
      const { left, top } = this.getBoundingClientRect();
      const offsetX === event.clientX - left;
      const offsetY === event.clientY - top;
    */
    this.overlayStyle.setProperty('--md-ripple-start-x', event.offsetX - clientWidth / 2 + 'px');
    this.overlayStyle.setProperty('--md-ripple-start-y', event.offsetY - clientHeight / 2 + 'px');

    const ov_comp_style = getComputedStyle(this.overlay);
    this.overlayStyle.setProperty('--md-overlay-opacity-1-current', ov_comp_style.getPropertyValue('--md-overlay-opacity-1'));

    this.duration1 = Math.max(
      parseInt(ov_comp_style.getPropertyValue('--md-ripple-transofrm-duration')),
      parseInt(ov_comp_style.getPropertyValue('--md-ripple-fadein-duration'))
    );
    this.duration2 = parseInt(ov_comp_style.getPropertyValue('--md-ripple-fadeout-duration'));

    if (this.animationStage !== 0) clearTimeout(this.currentTimeout);  
    if (this.animationStage === 1) {
      this.overlayStyle.removeProperty('--md-ripple-animation');
      requestAnimationFrame(this.playAnimation1);
    } else {
      this.animationStage = 1;
      this.playAnimation1();
    }
  }

  onMouseUp() {
    this.isPressed = false;
    if (this.animationStage === 0) this.playAnimation2();
  }
}

let currentMouseUpCallback: () => void = null;
document.addEventListener('mouseup', () => {
  if (currentMouseUpCallback === null) return;
  currentMouseUpCallback();
  currentMouseUpCallback = null;
});