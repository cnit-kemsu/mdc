import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import InputField from '../InputField';

const template = new HTMLTemplate(html);

export default class TextField extends InputField {

  private isEmpty: boolean = true;
  private $textInput: HTMLInputElement;

  constructor() {
    super(template.clonedContent);

    this.$textInput = this.shadowRoot.querySelector('input');
    this.addEventListener('input', this.onChange);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'value':
        this.value = newValue; break;
      case 'disabled':
        this.$textInput.disabled = newValue !== null; break;
    }
  }

  private onChange() {
    const isEmpty = !this.$textInput.value;
    if (this.isEmpty === isEmpty) return;
    this.isEmpty = isEmpty;
    if (isEmpty) this.$label.style.removeProperty('--md-label-transform');
    else this.$label.style.setProperty('--md-label-transform', 'var(--md-label-elevated)');
  }

  get value(): string {
    return this.$textInput.value;
  }
  set value(value: string) {
    this.$textInput.value = value;
    this.onChange();
  }
}