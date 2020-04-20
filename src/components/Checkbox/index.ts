import InteractiveElement from '@components/InteractiveElement';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['checked', ...InteractiveElement.observedAttributes];

export default class Checkbox extends InteractiveElement {

  constructor() {
    super(template.clonedContent);

    this.onInputElementChange = this.onInputElementChange.bind(this);
    
    this.inputElement.addEventListener('change', this.onInputElementChange);
  }

  static get observedAttributes() {
    return observedAttributes;
  }

  onInputElementChange(event) {
    if (this.inputElement.checked) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
    this.dispatchEvent(new Event('change'));
  }

  get checked() {
    return this.hasAttribute('checked');
  }
  set checked(value: boolean) {
    if (value) {
      this.setAttribute('checked', '');
      this.inputElement.checked = true;
    } else {
      this.removeAttribute('checked');
      this.inputElement.checked = false;
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log('attributeChangedCallback:', name, '; value:', newValue);
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'checked') {
      if (newValue !== null) this.inputElement.checked = true;
      else this.inputElement.checked = false;
    }
  }
}