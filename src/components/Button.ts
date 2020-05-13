import RippleElement from '@components/base/RippleElement';
import Icon from './Icon';
// import template from '!template!./Button.html';
import template from './Button.html?template';

const observedAttributes = ['outlined', 'raised', 'icon', 'label', ...RippleElement.observedAttributes];

export default class Button extends RippleElement {

  private _icon : Icon;
  private _label : HTMLLabelElement;

  constructor() {
    super();

    console.log(template);

    this.shadowRoot.appendChild(template.clonedContent);

    // if (navigator.userAgent.indexOf('Firefox') > 0) {
    //   this.style.setProperty('border-width', '1.5px');
    // }
    this._icon = this.shadowRoot.querySelector('md-icon');
    this._label = this.shadowRoot.querySelector('label');
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (newValue !== null) {
      if (name === 'raised' && this.hasAttribute('raised')) this.removeAttribute('outlined');
      if (name === 'outlined' && this.hasAttribute('outlined')) this.removeAttribute('raised');
    }
    switch (name) {
      case 'icon':
        this._icon.icon = newValue;
        //this._icon.setAttribute('icon', newValue);
        break;
      case 'label':
        this._label.style.setProperty('--md-label-text', `'${newValue}'`);
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