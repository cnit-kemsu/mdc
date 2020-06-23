import '@internals/initOptions';
import InteractiveElement from './InteractiveElement';

const __APPEND_INPUT_ELEMENT__ = window.webmd.appendInputElement;

export default class InputElement extends InteractiveElement {

  protected _value: string = null;
  private _name: string;
  protected inputEl: HTMLInputElement = null;

  constructor(type: string/*, props: any*/) {
    super();

    if (__APPEND_INPUT_ELEMENT__) {
      const inputEl = document.createElement('input');
      inputEl.style.display = 'none';
      inputEl.type = type;
      //inputEl.name = this._name;
      //inputEl.value = this._value;
      //inputEl.checked = this._checked;
      //if (props != null) Object.assign(inputEl, props);
      this.inputEl = inputEl;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (__APPEND_INPUT_ELEMENT__) this.appendChild(this.inputEl);
  }

  static get observedAttributes() {
    return ['name', 'value', ...InteractiveElement.observedAttributes];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'name':
        this._name = newValue;
        if (__APPEND_INPUT_ELEMENT__) this.inputEl.name = newValue;
        break;
      case 'value':
        //this._value = newValue;
        //if (__APPEND_INPUT_ELEMENT__) this.inputEl.value = newValue;
        this.value = newValue;
        break;
    }
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }

  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
    if (__APPEND_INPUT_ELEMENT__) this.inputEl.value = value;
  }
}

declare global {
  module MDC {
    interface FormEvent<T> extends React.FormEvent<T> {
      target: T & EventTarget;
    }
    interface InputElementProps<T> extends InteractiveElementProps<T> {
      name?: string;
      value?: string;
      onInput?: (event: FormEvent<T>) => void;
    }
  }
}