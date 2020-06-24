import customElement from '../internals/customElement';
import InteractiveElement from './base/InteractiveElement';
import RippleEffect from './base/RippleEffect';
import template from './SelectOption.html';

@customElement('md-option')
export default class SelectOption extends InteractiveElement {

  private labelEl: HTMLSpanElement;
  private _value: string = '';
  private _label: string = '';
  private _selected: boolean = false;

  constructor() {
    super();

    new RippleEffect(this);
    this.shadowRoot.appendChild(template.fragment);
    this.labelEl = this.shadowRoot.querySelector('label');
    this.addEventListener('click', this.handleClick);
  }

  connectedCallback() {
    this.tabIndex = -1;
  }

  static get observedAttributes() {
    return ['label', 'value', 'selected'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'label':
        this._label = newValue;
        this.labelEl.innerText = newValue;
        break;
      case 'value':
        this._value = newValue;
        break;
      case 'selected':
        const selected = newValue !== null;
        this._selected = selected;
        this.tabIndex = selected ? 0 : -1;
        this.dispatchEvent(new CustomEvent('select', { bubbles: true, cancelable: true, composed: true }));
        break;
    }
  }

  private handleClick(event: Event) {
    this.selected = true;
  }

  get label(): string {
    return this._label;
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }

  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this.setAttribute('value', value);
  }

  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    if (value === this._selected) return;
    if (value) this.setAttribute('selected', '');
    else this.removeAttribute('selected');
  }
}