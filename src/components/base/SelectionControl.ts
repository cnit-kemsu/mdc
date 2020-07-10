import InputElement from './InputElement';
import RippleEffect from './RippleEffect';
import template from './SelectionControl.html';

const __APPEND_INPUT_ELEMENT__ = window.material.appendInputElement;

export default class SelectionControl extends InputElement {

  private _checked: boolean = false;

  constructor(type: string) {
    super(type);

    new RippleEffect(this);
    this.shadowRoot.appendChild(template.fragment);
    this.addEventListener('click', this.handleClick);
  }

  static get observedAttributes() {
    return ['checked', ...InputElement.observedAttributes];
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
    }
  }

  handleClick() {
    this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }
  
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (value) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }
}

declare global {
  module Material {
    interface SelectionControlProps<T> extends InputElementProps<T> {
      checked?: boolean;
    }
  }
}