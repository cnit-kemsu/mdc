import RippleElement from '@components/base/RippleElement';
import Icon from './Icon';
import template from './IconButton.html?template';

const observedAttributes = ['icon', ...RippleElement.observedAttributes];

export default class IconButton extends RippleElement {

  private _icon : Icon;

  constructor() {
    super();

    this.shadowRoot.appendChild(template.clonedContent);

    this._icon = this.shadowRoot.querySelector('md-icon');
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'icon':
        this._icon.icon = newValue;
        //this._icon.setAttribute('icon', newValue);
        break;
    }
  }

  get icon(): string {
    return this.getAttribute('icon');
  }
  set icon(value: string) {
    this.setAttribute('icon', value);
  }
}