import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['label', 'helper-text', 'error', 'name', 'value', 'disabled'];

export default abstract class InputField extends HTMLElement {

  private isEmpty: boolean = true;
  protected containerEl: HTMLDivElement;
  protected labelEl: HTMLLabelElement;
  protected helperTextEl: HTMLDivElement;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    this.containerEl = this.shadowRoot.querySelector('.container');
    this.labelEl = this.shadowRoot.querySelector('label');
    this.helperTextEl = this.shadowRoot.querySelector('.helper-text');
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'label':
        this.labelEl.innerText = newValue || '';
        break;
      case 'helper-text':
        if (this.getAttribute('error') === null) this.helperTextEl.innerText = newValue || '';
        break;
      case 'error':
        this.helperTextEl.innerText = newValue || this.getAttribute('helper-text') || '';
        break;
      case 'value':
        this.value = newValue;
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

  get name(): string {
    return this.getAttribute('name');
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }

  abstract get value(): string;
  abstract set value(value: string);

  get disabled(): boolean {
    return this.getAttribute('disabled') !== null;
  }
  set disabled(value: boolean) {
    if (value) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }
}