import RippleElement from '@components/base/RippleElement';
import template from './SelectionControl.html?template';

const observedAttributes = ['checked', 'name', 'value', ...RippleElement.observedAttributes];

export default class SelectionControl extends RippleElement {

  value: string = null;

  constructor() {
    super();

    this.shadowRoot.appendChild(template.clonedContent);

    this.onChange = this.onChange.bind(this);

    this.addEventListener('click', this.onChange);
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'value') this.value = newValue;
  }

  onChange() {
    this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }

  get checked(): boolean {
    return this.getAttribute('checked') !== null;
  }
  set checked(value: boolean) {
    if (value) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }

  get name(): string {
    return this.getAttribute('name');
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }
}