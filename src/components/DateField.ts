import customElement from '@internals/customElement';
import IconStore from '../IconStore';
import TextField from './TextField';
import template from './DateField.html';
import DatePicker from './DatePicker';DatePicker;
import CalendarIcon from '../icons/calendar_today.svg';

IconStore.set('calendar_today', CalendarIcon);

@customElement('md-datefield')
export default class DateField extends TextField {

  constructor() {
    super();

    this.containerEl.appendChild(template.fragment);

    this.dropdownEl = this.shadowRoot.querySelector('md-date-picker');
    this.dropdownEl.anchor = this.containerEl;
    const button = this.shadowRoot.querySelector('md-icon');
    button.addEventListener('click', this.handleIconClick.bind(this));

    this.addEventListener('focusout', (event: FocusEvent) => {
      if (!this.contains(<Node>event.relatedTarget)) {
        //if (this.open) this.open = false;
        console.log('should close');
      }
    });
  }

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

  private handleIconClick() {
    //clickawayCallback = null;
    this.open = !this.open;
  }

  private _open = false;
  private dropdownEl: DatePicker;
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    this._open = value;
    this.dropdownEl.open = value;

    if (value) this.setAttribute('open', '');
    else this.removeAttribute('open');

    if (value) this.containerEl.style.setProperty('--md-background-color', '#f5f5f5');
    else this.containerEl.style.removeProperty('--md-background-color');

    // if (value) clickawayCallback = (event) => {
    //   if (!this.contains(event.target) && this.open) this.open = false;
    // }
  }
}

// let clickawayCallback: (event: any) => void = null;
// function invokeClickawayCallback(event) {
//   const { key } = event;
//   if (event instanceof KeyboardEvent && key !== 'Tab') return;
//   if (clickawayCallback === null) return;
//   clickawayCallback(event);
//   clickawayCallback = null
// };
// addEventListener('mouseup',invokeClickawayCallback);
// addEventListener('keyup', invokeClickawayCallback);
// addEventListener('contextmenu', invokeClickawayCallback);

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