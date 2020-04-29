import RippleElement from '@components/base/RippleElement';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['checked', 'name', 'value', ...RippleElement.observedAttributes];

export default class SelectionControl extends RippleElement {

  value: string = null;

  constructor(templateNode: Node) {
    super(template.clonedContent, templateNode);

    this.onChange = this.onChange.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    this.addEventListener('click', this.onChange);
    this.addEventListener('keyup', this.handleKeyup);
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'value') this.value = newValue;
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ') return;
    this.onChange();
  }

  onChange() {
    this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }

  get checked(): boolean {
    return this.getAttribute('checked') !== null;
  }
  set checked(value: boolean) {
    if (value) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }

  get name(): string {
    return this.getAttribute('name');
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }
}