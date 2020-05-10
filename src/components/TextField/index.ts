import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import InputField from '../InputField';

const template = new HTMLTemplate(html);

export default class TextField extends InputField {

  
  private inputEl: HTMLInputElement;

  constructor() {
    super(template.clonedContent);

    this.inputEl = this.shadowRoot.querySelector('input');
    this.addEventListener('input', this.onChange);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'disabled') this.inputEl.disabled = newValue !== null;
  }

  get value(): string {
    return this.inputEl.value;
  }
  set value(value: string) {
    this.inputEl.value = value;
    super.onChange();
  }
}