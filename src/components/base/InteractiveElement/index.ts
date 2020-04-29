import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['disabled'];

export default class InteractiveElement extends HTMLElement {

  constructor(...childNodes: Node[]) {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    for (const node of childNodes) this.shadowRoot.appendChild(node);
  }

  connectedCallback() {
    if (!this.disabled) this.tabIndex = 0;
  }
  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'disabled') this.tabIndex = newValue === null ? 0 : -1;
  }

  get disabled(): boolean {
    return this.getAttribute('disabled') !== null;
  }
  set disabled(value: boolean) {
    this.setAttribute('disabled', value ? '' : null);
  }
}