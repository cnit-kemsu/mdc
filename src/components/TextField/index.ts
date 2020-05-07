import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import InputField from '../InputField';

const template = new HTMLTemplate(html);

export default class TextField extends InputField {

  
  private $textInput: HTMLInputElement;

  constructor() {
    super(template.clonedContent);

    this.$textInput = this.shadowRoot.querySelector('input');
    this.addEventListener('input', this.onChange);
    this.addEventListener('keydown', this.keydown);
    this.$textInput.addEventListener('paste', this.paste);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'disabled') this.$textInput.disabled = newValue !== null;
  }

  onChange() {
    super.onChange();
    // const value = this.$textInput.value;
    // const regexp = /(\d{1,2})?-?(\d{1,2})?-?(\d{1,4})?/;
    // const res = regexp.exec(value);
    // console.log(res);
    // const newValue =`${res[1] || ' '}-${res[2] || '  '}-${res[3] || ' '}`;
    // //const newValue = value.replace(/(\d{2})(\d{3})?(\d{2})?/, '$1-$2-$3');
    // console.log(this.$textInput.selectionStart);

    // const selst = this.$textInput.selectionStart;
    // this.$textInput.value = newValue;
    // this.$textInput.selectionStart = selst;
    // this.$textInput.selectionEnd = selst;

    // const value = this.$textInput.value;
    // const values = value.split(/[./-]/g);
    // const regexp = /(\d{1,2})?-?(\d{1,2})?-?(\d{1,4})?/;
    // const res = regexp.exec(value);
    // console.log(res);
    // const newValue =`${res[1] || ' '}-${res[2] || '  '}-${res[3] || ' '}`;
    // //const newValue = value.replace(/(\d{2})(\d{3})?(\d{2})?/, '$1-$2-$3');
    // console.log(this.$textInput.selectionStart);

    // const selst = this.$textInput.selectionStart;
    // this.$textInput.value = newValue;
    // this.$textInput.selectionStart = selst;
    // this.$textInput.selectionEnd = selst;
  }

  keydown(event) {
    const key = event.key;
    if (
      key === 'Backspace'
      || (key === 'v' && event.ctrlKey)
      || (key === 'c' && event.ctrlKey)
      || key === 'ArrowRight'
      || key === 'ArrowLeft'
      || (!isNaN(key) && key !== ' ')
    ) return;
    event.preventDefault();
  }

  paste(event) {
    const text = event.clipboardData.getData('text');
    if (/(^\d{1,2}([./-](\d{1,2}([./-]\d{0,4})?)?)?$)|(^\d{4}([./-](\d{1,2}([./-]\d{0,2})?)?)?$)/.test(text)) return;
    event.preventDefault();
  }

  get value(): string {
    return this.$textInput.value;
  }
  set value(value: string) {
    this.$textInput.value = value;
    super.onChange();
  }
}