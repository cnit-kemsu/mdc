import customElement from '../lib/customElement';
import InteractiveElement from './base/InteractiveElement';
import RippleEffect from './base/RippleEffect';
import Icon from './Icon';
import template from './IconButton.html';

@customElement('md-icon-button')
export default class IconButton extends InteractiveElement {
  private iconEl : Icon;

  constructor() {
    super();
    new RippleEffect(this);
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