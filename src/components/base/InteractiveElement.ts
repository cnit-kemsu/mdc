import HTMLTemplate from '@lib/HTMLTemplate1';
import html from './InteractiveElement.template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['disabled'];

export default class InteractiveElement extends HTMLElement {

  protected focusableEl: HTMLElement = this;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    this.addEventListener('keyup', this.handleKeyup);
  }

  connectedCallback() {
    // if (!this.disabled)
    this.focusableEl.tabIndex = 0;
  }
  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'disabled') {
      if (newValue === 'false') this.setAttribute('disabled', null);
      else this.focusableEl.tabIndex = newValue === null ? 0 : -1;
    }
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ') return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }

  get disabled(): boolean {
    //return this.focusableEl.tabIndex === -1;
    return this.getAttribute('disabled') !== null;
  }
  set disabled(value: boolean) {
    this.setAttribute('disabled', value ? '' : null);
  }
}