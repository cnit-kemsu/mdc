import HTMLTemplate from '@lib/HTMLTemplate1';
import html from './TextField.template.html';
import InputField from './base/InputField';

const template = new HTMLTemplate(html);

export default class TextField extends InputField {
  
  private inputEl: HTMLInputElement;

  constructor() {
    super();

    this.containerEl.prepend(template.clonedContent);
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