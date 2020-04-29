import RippleElement from '@components/base/RippleElement';
import Icon from '../Icon';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['outlined', 'raised', 'icon', ...RippleElement.observedAttributes];

export default class Button extends RippleElement {

  private icon : Icon;

  constructor() {
    super(template.clonedContent);

    this.addEventListener('keyup', this.handleKeyup);

    // if (navigator.userAgent.indexOf('Firefox') > 0) {
    //   this.style.setProperty('border-width', '1.5px');
    // }
    this.icon = this.shadowRoot.querySelector('md-icon');
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ') return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (newValue !== null) {
      if (name === 'raised' && this.hasAttribute('raised')) this.removeAttribute('outlined');
      if (name === 'outlined' && this.hasAttribute('outlined')) this.removeAttribute('raised');
    }
    if (name === 'icon') {
      this.icon.setAttribute('name', newValue);
    }
  }
}