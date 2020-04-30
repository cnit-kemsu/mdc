import RippleElement from '@components/base/RippleElement';
import Icon from '../Icon';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['icon', ...RippleElement.observedAttributes];

export default class Button extends RippleElement {

  private _icon : Icon;
  private _label : HTMLLabelElement;

  constructor() {
    super(template.clonedContent);

    this.addEventListener('keyup', this.handleKeyup);

    this._icon = this.shadowRoot.querySelector('md-icon');
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'icon':
        this._icon.icon = newValue;
        //this._icon.setAttribute('icon', newValue);
        break;
    }
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ') return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }


  get icon(): string {
    return this.getAttribute('icon');
  }
  set icon(value: string) {
    this.setAttribute('icon', value);
  }
}