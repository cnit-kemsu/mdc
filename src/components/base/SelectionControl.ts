import RippleElement from '@components/base/RippleElement';
import template from './SelectionControl.html?template';

export default abstract class SelectionControl extends RippleElement {

  abstract get type(): string;
  value: string = null;
  private _name: string;
  private _checked: boolean = false;
  protected childInputEl: HTMLInputElement = null;

  constructor() {
    super();
    this.shadowRoot.appendChild(template.fragment);
    this.addEventListener('click', this.onChange);
  }

  connectedCallback() {
    if (this.childInputEl === null) {
      const inputEl = document.createElement('input');
      inputEl.type = this.type;
      inputEl.name = this._name;
      inputEl.value = this.value;
      inputEl.checked = this._checked;
      this.appendChild(inputEl);
      this.childInputEl = inputEl;
    }
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
        if (this._isConnected) this.childInputEl.checked = this._checked;
        break;
      case 'name':
        this._name = newValue;
        if (this._isConnected) this.childInputEl.name = newValue;
        break;
      case 'value':
        this.value = newValue;
        break;
    }
  }

  onChange() {
    this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }

  protected get _isConnected() {
    return this.childInputEl !== null;
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