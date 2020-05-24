import { HTMLTemplate, customElement } from '../lib';
import RippleElement from './base/RippleElement';
import Icon from './Icon';
import html from './IconButton.html';

const template = new HTMLTemplate(html);

@customElement('md-icon-button')
export default class IconButton extends RippleElement {
  private iconEl : Icon;

  constructor() {
    super();
    this.shadowRoot.appendChild(template.fragment);
    this.iconEl = this.shadowRoot.querySelector('md-icon');
  }

  static get observedAttributes() {
    return ['store-key'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'store-key':
        this.iconEl.storeKey = newValue;
        break;
    }
  }

  get storeKey(): string {
    return this.getAttribute('icon');
  }
  set storeKey(value: string) {
    this.setAttribute('icon', value);
  }
}