import customElement from '@internals/customElement';
import InputField from './base/InputField';
import template from './TextField.html';

@customElement('md-textfield')
export default class TextField extends InputField {

  constructor() {
    super();

    this.containerEl.prepend(template.fragment);
    this.textInputEl = this.shadowRoot.querySelector('input');
    this.addEventListener('input', this.onChange);
  }
}

declare global {
  module MDC {
    interface TextFieldProps extends InputFieldProps<TextField> {
    }
  }
  module JSX {
    interface IntrinsicElements {
      'md-datefield': MDC.TextFieldProps;
    }
  }
}