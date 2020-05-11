import { HTMLTemplate, customElement } from '@lib';
import html from './template.html';
import InputField from '../InputField';

const template = new HTMLTemplate(html);

@customElement('md-datefield')
export default class DateField extends InputField {

  private _value = '';
  private inputEl: HTMLInputElement;

  constructor() {
    super();

    this.containerEl.prepend(template.clonedContent);
    this.inputEl = this.shadowRoot.querySelector('input');
    this.addEventListener('input', this.onInput);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'disabled') this.inputEl.disabled = newValue !== null;
  }

  onInput({ inputType, data }: InputEvent) {
    const { inputEl } = this;
    let caretPosition = inputEl.selectionStart;

    this.value = inputEl.value;
    const value = this.value;

    let lastDigitIndex = value.indexOf('_');
    if (inputType === 'deleteContentBackward' && value[lastDigitIndex - 1] === '-') lastDigitIndex--;

    if (caretPosition > lastDigitIndex) caretPosition = lastDigitIndex;
    else switch (inputType) {
      case 'insertText':
        const charCode = data.charCodeAt(0);
        if (charCode < 48 || charCode > 57) {
          if (value[caretPosition - 1] !== '-') caretPosition--;
        } else if (value[caretPosition] === '-' || value[caretPosition - 1] === '-') caretPosition++;
        break;
      case 'deleteContentBackward':
        if (value[caretPosition - 1] === '-') caretPosition--;
        break;
      case 'deleteContentForward':
        if (value[caretPosition] === '-') caretPosition++;
        break;
    }
    
    inputEl.selectionStart = caretPosition;
    inputEl.selectionEnd = caretPosition;
  }

  formatValue(value: string) {
    const _value = value.replace(/\D/g, '');
    let day = (_value.slice(0, 2) + '__').slice(0, 2),
      month = (_value.slice(2, 4) + '__').slice(0, 2),
      year = (_value.slice(4, 8) + '____').slice(0, 4);
    return `${day}-${month}-${year}`;
  }

  get value(): string {
    return this._value;
  }
  set value(value: string) {
    const _value = this.formatValue(value);
    this._value = _value;
    this.inputEl.value = _value;
    super.onChange();
  }
}

interface DateFieldProps extends React.HTMLAttributes<HTMLElement> {
  value?: string;
  label?: string;
}
declare global {
  module JSX {
    interface IntrinsicElements {
      'md-datefield': DateFieldProps;
    }
  }
}