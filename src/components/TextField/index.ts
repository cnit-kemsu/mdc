import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['name', 'value'];

export default class TextField extends HTMLElement {

  inputElement: HTMLInputElement;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    this.onChange = this.onChange.bind(this);
    
    this.inputElement = this.shadowRoot.querySelector('#input');
    this.inputElement.addEventListener('input', this.onChange);
  }

  static get observedAttributes() {
    return observedAttributes;
  }

  onChange() {
    console.log('change');
    this.setAttribute('value', this.inputElement.value);

    this.dispatchEvent(new Event('input'));
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
    this.setAttribute('value', value);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'name':
        this.inputElement.name = newValue;
        break;
      case 'value':
        this.inputElement.value = newValue;
        break;
    }
  }
}