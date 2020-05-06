import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import RippleElement from '../base/RippleElement';
import Select from '../Select';

const template = new HTMLTemplate(html);

export default class SelectOption extends RippleElement {

  private $select: Select;

  constructor() {
    super(template.clonedContent);

    this.addEventListener('keyup', this.handleKeyup);
    this.addEventListener('click', this.onClick);
  }

  connectedCallback() {
    this.tabIndex = -1;

    //this.$select = this.closest('md-select') as Select;
    this.$select = this.parentNode as Select;
    this.$select.requireToAdoptOptions = true;
  }
  disconnectedCallback() {
    this.$select.requireToAdoptOptions = true;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    //
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ') return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }

  private onClick() {
    this.dispatchEvent(new CustomEvent('select', { bubbles: true, cancelable: true, composed: true }));
  }

  get value(): string {
    return this.getAttribute('value');
  }
}