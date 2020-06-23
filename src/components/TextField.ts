import customElement from '@internals/customElement';
import InputField from './base/InputField';
import template from './TextField.html';

@customElement('md-textfield')
export default class TextField extends InputField {

  protected textInputEl: HTMLInputElement;

  constructor() {
    super();

    this.containerEl.prepend(template.fragment);
    this.textInputEl = this.shadowRoot.querySelector('input');
    
    this.handleInput = this.handleInput.bind(this);
    this.textInputEl.addEventListener('input', this.handleInput);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'disabled') this.textInputEl.disabled = newValue !== null;
  }

  protected handleInput(event: Event) {
    //event.stopPropagation();
    super.value = this.textInputEl.value;
    //this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }

  get value(): string {
    return super.value;
  }
  set value(value: string) {
    super.value = value;
    this.textInputEl.value = value;
  }
}

declare global {
  module MDC {
    interface TextFieldProps extends InputFieldProps<TextField> {
    }
  }
  module JSX {
    interface IntrinsicElements {
      'md-textfield': MDC.TextFieldProps;
    }
  }
}