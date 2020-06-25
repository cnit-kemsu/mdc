import customElement from '@internals/customElement';
import template from './Dropdown.html';

@customElement('md-dropdown')
export default class Dropdown extends HTMLElement {

  private _open: boolean = false;
  private style1: HTMLStyleElement;
  private style2: HTMLStyleElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);

    const style1 = document.createElement('style');
    style1.innerHTML = `:host{
      display: block;
    }`;
    this.style1 = style1;

    const style2 = document.createElement('style');
    style2.innerHTML = `:host {
      transform: scale(1);
      opacity: 1;
      transition: opacity 30ms linear, transform 120ms ease;
    }`;
    this.style2 = style2;

    this.appendStyle2 = this.appendStyle2.bind(this);
    this.removeStyle1 = this.removeStyle1.bind(this);
  }

  static get observedAttributes() {
    return ['open'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'open':
        const open = newValue !== null;
        this._open = open;
        if (open) {
          this.shadowRoot.appendChild(this.style1);

          //const { top, left, bottom, right }
          const rect
          = this.getBoundingClientRect();
          console.log(rect);
          console.log(document.documentElement.clientHeight);

          const docHeight = document.documentElement.clientHeight;

          let bottomOverflow = rect.bottom - docHeight;
          if (bottomOverflow < 0) bottomOverflow = 0;
          if (bottomOverflow > 0) {
            this.style.setProperty('bottom', '56px');
          } else {
            this.style.setProperty('top', '56px');
          }

          requestAnimationFrame(this.appendStyle2);
        } else {
          this.shadowRoot.removeChild(this.style2);
          setTimeout(this.removeStyle1, 75);
        }
        break;
    }
  }

  appendStyle2() {
    this.shadowRoot.appendChild(this.style2);
  }
  removeStyle1() {
    !this._open && this.shadowRoot.removeChild(this.style1);
    this.style.removeProperty('bottom');
    this.style.removeProperty('top');
  }

  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    if (value === this._open) return;
    if (value) this.setAttribute('open', '');
    else this.removeAttribute('open');
  }
}