import { HTMLTemplate } from '../../lib';
import RippleElement from './RippleElement';
import html from './SelectionControl.html';

const template = new HTMLTemplate(html);

const options = window.mdc.options;

export default class SelectionControl extends RippleElement {

  private _value: string = null;
  private _name: string;
  private _checked: boolean = false;
  protected inputEl: HTMLInputElement = null;

  constructor(inputType: string) {
    super();
    this.shadowRoot.appendChild(template.fragment);
    this.addEventListener('click', this.onChange);

    if (options.useInputElement) {
      const inputEl = document.createElement('input');
      inputEl.type = inputType;
      inputEl.name = this._name;
      inputEl.value = this._value;
      inputEl.checked = this._checked;
      this.inputEl = inputEl;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (options.useInputElement) this.appendChild(this.inputEl);
  }

  static get observedAttributes() {
    return ['checked', 'name', 'value', ...RippleElement.observedAttributes];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'checked':
        if (newValue === 'false') {
          this.removeAttribute('checked');
          break;
        }
        this._checked = newValue !== null;
        if (options.useInputElement) this.inputEl.checked = this._checked;
        break;
      case 'name':
        this._name = newValue;
        if (options.useInputElement) this.inputEl.name = newValue;
        break;
      case 'value':
        this._value = newValue;
        if (options.useInputElement) this.inputEl.value = newValue;
        break;
    }
  }

  onChange() {
    this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }
  
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (value) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this.setAttribute('name', value);
  }

  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
  }
}

declare global {
  module MDC {
    interface SelectionControlProps<T> extends RippleElementProps<T> {
      checked?: boolean;
      name?: string;
      value?: string;
      onInput?: (event: FormEvent<T>) => void;
    }
  }
}