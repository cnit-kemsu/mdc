import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['name', 'value'];

export default class TextField extends HTMLElement {

  private inputElement: HTMLInputElement;
  private labelStyle: CSSStyleDeclaration;
  shadowRoot1: any;
  constructor() {
    super();

    //@ts-ignore
    this.shadowRoot1 = this.attachShadow({ mode: 'closed' });
    this.shadowRoot1.appendChild(template.clonedContent);

    this.handleChange = this.handleChange.bind(this);
    this.inputElement = this.shadowRoot1.querySelector('input');
    //this.inputElement.addEventListener('change', this.handleChange, { capture: true });
    this.inputElement.addEventListener('input', this.handleChange, { capture: true });

    const label = this.shadowRoot1.querySelector('label');
    this.labelStyle = label.style;
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'name':
        this.inputElement.name = newValue;
        break;
      case 'value':
        this.value = newValue;
        break;
    }
  }

  onChange() {
    if (this.inputElement.value) this.labelStyle.setProperty('--md-label-transform', 'var(--md-label-elevated)');
    else this.labelStyle.setProperty('--md-label-transform', 'var(--md-label-lowered)');
  }

  handleChange(event) {
    //event.preventDefault();
    event.stopPropagation();
    this.onChange();
    //const ev = new InputEvent('input', { bubbles: true, cancelable: true });
    const ev = new Event('input', { bubbles: true });
    // @ts-ignore
    //ev.simulated = true;
    this.dispatchEvent(ev);
    //this.dispatchEvent(event);
  }

  get name(): string {
    return this.inputElement.name;
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }

  get value(): string {
    return this.inputElement.value;
  }
  set value(value: string) {
    this.inputElement.value = value;
    this.onChange();
  }
}