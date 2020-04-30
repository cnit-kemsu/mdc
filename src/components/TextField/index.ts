import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['name', 'value', 'disabled'];

export default class TextField extends HTMLElement {

  private textInput: HTMLInputElement;
  private labelStyle: CSSStyleDeclaration;
  private isEmpty: boolean = true;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    this.textInput = this.shadowRoot.querySelector('input');
    this.addEventListener('input', this.onChange);

    const label = this.shadowRoot.querySelector('label');
    this.labelStyle = label.style;
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'value') this.value = newValue;
    if (name === 'disabled') this.textInput.disabled = newValue !== null;
  }

  onChange() {
    const isEmpty = !this.textInput.value;
    if (this.isEmpty === isEmpty) return;
    this.isEmpty = isEmpty;
    if (isEmpty) this.labelStyle.setProperty('--md-label-transform', 'var(--md-label-lowered)');
    else this.labelStyle.setProperty('--md-label-transform', 'var(--md-label-elevated)');
  }

  get disabled(): boolean {
    return this.getAttribute('disabled') !== null;
  }
  set disabled(value: boolean) {
    if (value) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }

  get name(): string {
    return this.getAttribute('name');
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }

  get value(): string {
    return this.textInput.value;
  }
  set value(value: string) {
    this.textInput.value = value;
    this.onChange();
  }
}