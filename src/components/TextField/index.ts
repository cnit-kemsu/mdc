import InteractiveElement from '@components/InteractiveElement';
import templateHTML from './template.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

export default class TextField extends InteractiveElement {

  constructor() {
    super(template.content.cloneNode(true));

    this.onInputElementChange = this.onInputElementChange.bind(this);
    
    this.inputElement.addEventListener('change', this.onInputElementChange);
  }

  connectedCallback() {
  }

  onInputElementChange() {
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
  }
}