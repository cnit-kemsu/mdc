import { customElement, IconStore } from '@lib';
import template from './Icon.html?template';

@customElement('md-icon')
export default class Icon extends HTMLElement {
  svgEl: SVGElement = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);
  }

  static get observedAttributes() {
    return ['store-key'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'store-key':
        if (this.svgEl !== null) this.shadowRoot.removeChild(this.svgEl);
        const template = IconStore.get(newValue);
        this.svgEl = template?.fragment.firstChild || null;
        if (this.svgEl !== null) this.shadowRoot.appendChild(this.svgEl);
        break;
    }
  }

  get storeKey(): string {
    return this.getAttribute('store-key');
  }
  set storeKey(value: string) {
    this.setAttribute('store-key', value);
  }
}

