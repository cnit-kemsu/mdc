import customElement from '@internals/customElement';
import template from './Dropdown.html';

@customElement('m-dropdown')
export default class Dropdown extends HTMLElement {

  private style1: HTMLStyleElement;
  private style2: HTMLStyleElement;
  private style3: HTMLStyleElement;
  private timeout: any = null;
  
  private _sideward: boolean = false;
  private _anchor: HTMLElement = null;
  private _open: boolean = false;
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);

    const style1 = document.createElement('style');
    style1.innerHTML = `:host{display:none;}`;
    this.style1 = style1;

    const style2 = document.createElement('style');
    style2.innerHTML = `:host{transform:scale(1);opacity:1;}`;
    this.style2 = style2;

    this.appendStyle1 = this.appendStyle1.bind(this);
    this.appendStyle2 = this.appendStyle2.bind(this);

    this.shadowRoot.appendChild(this.style1);
  }

  static get observedAttributes() {
    return ['open', 'sideward'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'open':
        const open = newValue !== null;
        this._open = open;

        if (open) {

          if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
          } else this.shadowRoot.removeChild(this.style1);

          this.appendStyle3();

          requestAnimationFrame(this.appendStyle2);
        }
        else {
          this.shadowRoot.removeChild(this.style2);
          this.timeout = setTimeout(this.appendStyle1, 75);
        }
        break;
    }
  }

  appendStyle1() {
    this.shadowRoot.appendChild(this.style1);
    this.timeout = null;
    this.shadowRoot.removeChild(this.style3);
  }
  appendStyle2() {
    this.shadowRoot.appendChild(this.style2);
  }
  appendStyle3() {
    const { _sideward, _anchor } = this;
    const rect = this.getBoundingClientRect();
    const anchorRect = _anchor.getBoundingClientRect();
    const docHeight = document.documentElement.clientHeight;
    //const docWidth = document.documentElement.clientWidth;

    const style3 = document.createElement('style');
    if (_sideward) {
    } else {
      let bottomOverflow = anchorRect.bottom + rect.height - docHeight;
      if (bottomOverflow < 0) bottomOverflow = 0;
  
      let topOverflow = rect.height - anchorRect.top;
      if (topOverflow < 0) topOverflow = 0;
  
      style3.innerHTML = ':host{' + (bottomOverflow > topOverflow
      ? `
        transform-origin: center bottom;
        bottom: ${anchorRect.height}px;
      `
      : `
        transform-origin: center top;
        top: ${anchorRect.height}px;
      `) + '}';
    }

    this.style3 = style3;
    this.shadowRoot.appendChild(style3);
  }

  get sideward(): boolean {
    return this._sideward;
  }
  set sideward(value: boolean) {
    this._sideward = value;
  }

  get anchor(): HTMLElement {
    return this._anchor;
  }
  set anchor(value: HTMLElement) {
    this._anchor = value || null;
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