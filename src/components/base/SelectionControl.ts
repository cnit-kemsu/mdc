import HTMLTemplate from '../../lib/HTMLTemplate';
import RippleElement from './RippleElement';
import template from './SelectionControl.html';

declare global {
  interface Window {
    mdcOptions: {
      appendInputElement: boolean;
      implicitUncheck: boolean;
    }
  }
}

// @ts-ignore
if (window.mdcOptions === undefined) window.mdcOptions = {};
if (window.mdcOptions.appendInputElement === undefined) window.mdcOptions = {
  ...window.mdcOptions,
  appendInputElement: true
};

const __APPEND_INPUT_ELEMENT__ = window.mdcOptions.appendInputElement;

export default class SelectionControl extends RippleElement {

  private _value: string = null;
  private _name: string;
  private _checked: boolean = false;
  protected inputEl: HTMLInputElement = null;

  constructor(inputType: string) {
    super();
    this.shadowRoot.appendChild(template.fragment);
    this.addEventListener('click', this.onClick);

    if (__APPEND_INPUT_ELEMENT__) {
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
    if (__APPEND_INPUT_ELEMENT__) this.appendChild(this.inputEl);
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
        if (__APPEND_INPUT_ELEMENT__) this.inputEl.checked = this._checked;
        break;
      case 'name':
        this._name = newValue;
        if (__APPEND_INPUT_ELEMENT__) this.inputEl.name = newValue;
        break;
      case 'value':
        this._value = newValue;
        if (__APPEND_INPUT_ELEMENT__) this.inputEl.value = newValue;
        break;
    }
  }

  onClick() {
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

/** Determines whether an input element should be appended to custom elements as a child node for use with form elements. */
//declare const __APPEND_INPUT_ELEMENT__: boolean;

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