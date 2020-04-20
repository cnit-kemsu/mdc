import InteractiveElement from '@components/InteractiveElement';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['outlined', 'raised', ...InteractiveElement.observedAttributes];

export default class Button extends InteractiveElement {

  constructor() {
    super(template.clonedContent);
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
  }
}