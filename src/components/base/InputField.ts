import InputElement from './InputElement';
import template from './InputField.html';

export default class InputField extends InputElement {

  private isEmpty: boolean = true;
  protected containerEl: HTMLDivElement;
  protected labelEl: HTMLLabelElement;
  protected helperTextEl: HTMLDivElement;
  protected textInputEl: HTMLInputElement;

  constructor() {
    super('text');

    this.shadowRoot.appendChild(template.fragment);
    this.containerEl = this.shadowRoot.querySelector('.container');
    this.labelEl = this.shadowRoot.querySelector('label');
    this.helperTextEl = this.shadowRoot.querySelector('.helper-text');
  }

  static get observedAttributes() {
    return ['label', 'helper-text', 'error', ...InputElement.observedAttributes];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'disabled':
        this.textInputEl.disabled = newValue !== null;
        break;
      case 'label':
        this.labelEl.innerText = newValue || '';
        break;
      case 'helper-text':
        if (this.getAttribute('error') === null) this.helperTextEl.innerText = newValue || '';
        break;
      case 'error':
        this.helperTextEl.innerText = newValue || this.getAttribute('helper-text') || '';
        break;
    }
  }

  protected onChange() {
    const isEmpty = !this.value;
    if (this.isEmpty === isEmpty) return;
    this.isEmpty = isEmpty;
    if (isEmpty) this.labelEl.style.removeProperty('--md-label-transform');
    else this.labelEl.style.setProperty('--md-label-transform', 'var(--md-label-elevated)');
  }

  get label(): string {
    return this.getAttribute('label');
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }

  get helperText(): string {
    return this.getAttribute('helper-text');
  }
  set helperText(value: string) {
    this.setAttribute('helper-text', value);
  }

  get error(): string {
    return this.getAttribute('error');
  }
  set error(value: string) {
    this.setAttribute('error', value);
  }

  set value(value: string) {
    super.value = value;
    this.textInputEl.value = value;
    this.onChange();
  }
}

declare global {
  module MDC {
    interface InputFieldProps<T> extends InputElementProps<T> {
      label?: string;
      'helper-text'?: string;
      error?: string;
    }
  }
}