import { customElement } from '@lib';
import RippleElement from '@components/base/RippleElement';
import Icon from './Icon';
import template from './Button.html?template';

@customElement('md-button')
export default class Button extends RippleElement {

  private iconEl : Icon;
  private labelEl : HTMLLabelElement;

  constructor() {
    super();

    this.shadowRoot.appendChild(template.fragment);

    // if (navigator.userAgent.indexOf('Firefox') > 0) {
    //   this.style.setProperty('border-width', '1.5px');
    // }
    this.iconEl = this.shadowRoot.querySelector('md-icon');
    this.labelEl = this.shadowRoot.querySelector('label');
  }

  static get observedAttributes() {
    return ['outlined', 'raised', 'icon', 'label'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (newValue !== null) {
      if (name === 'raised' && this.hasAttribute('raised')) this.removeAttribute('outlined');
      if (name === 'outlined' && this.hasAttribute('outlined')) this.removeAttribute('raised');
    }
    switch (name) {
      case 'icon':
        this.iconEl.storeKey = newValue;
        //this._icon.setAttribute('icon', newValue);
        break;
      case 'label':
        this.labelEl.style.setProperty('--md-label-text', `'${newValue}'`);
        break;
    }
  }

  get label(): string {
    return this.getAttribute('label');
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }

  get icon(): string {
    return this.getAttribute('icon');
  }
  set icon(value: string) {
    this.setAttribute('icon', value);
  }
}