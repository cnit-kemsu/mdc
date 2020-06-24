import customElement from '@internals/customElement';
import template from './Dropdown.html';

@customElement('md-dropdown')
export default class Dropdown extends HTMLElement {

  private _open: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);
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
          //this.style.setProperty('animation', 'var(--fadein)');
          //this.style.setProperty('display', 'block');
        } else {
          //this.style.setProperty('animation', 'var(--fadeout)');
          //setTimeout(() => this.style.removeProperty('display'), 900);
        }
        break;
    }
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