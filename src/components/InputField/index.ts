import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['label', 'helper-text', 'error', 'name', 'value', 'disabled'];

export default class InputField extends HTMLElement {

  protected $label: HTMLLabelElement;
  protected $helperText: HTMLDivElement;

  constructor(...childNodes: Node[]) {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    for (const node of childNodes) this.shadowRoot.appendChild(node);

    this.$label = this.shadowRoot.querySelector('label');
    this.$helperText = this.shadowRoot.querySelector('.helper-text');
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'label':
        this.$label.innerText = newValue || ''; break;
      case 'helper-text':
        if (this.getAttribute('error') === null) this.$helperText.innerText = newValue || ''; break;
      case 'error':
        this.$helperText.innerText = newValue || this.getAttribute('helper-text') || ''; break;
    }
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

  get disabled(): boolean {
    return this.getAttribute('disabled') !== null;
  }
  set disabled(value: boolean) {
    if (value) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }
}