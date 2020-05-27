import HTMLTemplate from '../lib/HTMLTemplate';
import customElement from '../lib/customElement';
import RippleElement from './base/RippleElement';
import Select from './Select';
import template from './SelectOption.html';

const observedAttributes = ['label', 'value'];

@customElement('md-option')
export default class SelectOption extends RippleElement {

  private selectEl: Select;
  private labelEl: HTMLSpanElement;
  private _value: string = '';
  private _label: string = '';

  constructor() {
    super();

    this.shadowRoot.appendChild(template.fragment);

    this.labelEl = this.shadowRoot.querySelector('label');
    
    this.addEventListener('click', this.onClick);
  }

  connectedCallback() {
    this.tabIndex = -1;

    //this.selectEl = this.closest('md-select') as Select;
    this.selectEl = this.parentNode as Select;
    this.selectEl.requireToAdoptOptions = true;
  }
  disconnectedCallback() {
    this.selectEl.requireToAdoptOptions = true;
  }
  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'value':
        this._value = newValue;
        break;
      case 'label':
        this._label = newValue;
        this.labelEl.innerText = newValue;
        break;
    }
  }

  private onClick() {
    this.dispatchEvent(new CustomEvent('select', { bubbles: true, cancelable: true, composed: true }));
  }

  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this.setAttribute('value', value);
  }

  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }
}