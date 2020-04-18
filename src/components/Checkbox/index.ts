import InteractiveElement from '@components/InteractiveElement';
import templateHTML from './template.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

export default class Checkbox extends InteractiveElement {

  constructor() {
    super(template.content.cloneNode(true));

    this.onInputElementChange = this.onInputElementChange.bind(this);
    
    this.inputElement.addEventListener('change', this.onInputElementChange);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hasAttribute('checked')) this.inputElement.checked = true;
  }

  onInputElementChange() {
    if (this.inputElement.checked) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
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
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'checked') {
      if (newValue !== null) this.inputElement.checked = true;
      else this.inputElement.checked = false;
    }
  }
}