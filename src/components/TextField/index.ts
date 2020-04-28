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
    console.log(name);
    if (name === 'value') this.value = newValue;
    if (name === 'disabled') {
      if (newValue === null) {
        this.tabIndex = 0;
        this.textInput.disabled = true;
      } else {
        this.tabIndex = -1;
        this.textInput.disabled = false;
      }
    }
  }

  onChange() {
    const isEmpty = !this.textInput.value;
    if (this.isEmpty === isEmpty) return;
    this.isEmpty = isEmpty;
    if (isEmpty) this.labelStyle.setProperty('--md-label-transform', 'var(--md-label-lowered)');
    else this.labelStyle.setProperty('--md-label-transform', 'var(--md-label-elevated)');
  }

  get name(): string {
    return this.getAttribute('name');
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }

  get disabled(): boolean {
    return Boolean(this.getAttribute('disabled'));
  }
  set disabled(value: boolean) {
    this.setAttribute('disabled', value ? '' : null);
  }

  get value(): string {
    return this.textInput.value;
  }
  set value(value: string) {
    this.textInput.value = value;
    this.onChange();
  }
}