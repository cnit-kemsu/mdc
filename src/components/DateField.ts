import customElement from '@internals/customElement';
import TextField from './TextField';
import template from './DateField.html';

@customElement('md-datefield')
export default class DateField extends TextField {

  handleInput(event: InputEvent) {
    event.stopPropagation();

    const { inputType, data } = event;
    const { textInputEl } = this;
    let caretPosition = textInputEl.selectionStart;

    this.value = textInputEl.value;
    const value = this.value;

    let lastDigitIndex = value.indexOf('_');
    if (inputType === 'deleteContentBackward' && value[lastDigitIndex - 1] === '-') lastDigitIndex--;

    if (lastDigitIndex > 0 && caretPosition > lastDigitIndex) caretPosition = lastDigitIndex;
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
    
    textInputEl.selectionStart = caretPosition;
    textInputEl.selectionEnd = caretPosition;

    this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }

  formatValue(value: string) {
    const _value = value.replace(/\D/g, '');
    let day = (_value.slice(0, 2) + '__').slice(0, 2),
      month = (_value.slice(2, 4) + '__').slice(0, 2),
      year = (_value.slice(4, 8) + '____').slice(0, 4);
    return `${day}-${month}-${year}`;
  }

  get value(): string {
    return super.value;
  }
  set value(value: string) {
    super.value = this.formatValue(value);
  }
}

declare global {
  module MDC {
    interface DateFieldProps extends InputFieldProps<DateField> {
    }
  }
  module JSX {
    interface IntrinsicElements {
      'md-datefield': MDC.DateFieldProps;
    }
  }
}