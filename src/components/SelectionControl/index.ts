import InteractiveElement from '@components/InteractiveElement';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['checked', 'name', 'value', ...InteractiveElement.observedAttributes];

export default class SelectionControl extends InteractiveElement {

  constructor(templateNode: Node) {
    super(template.clonedContent, templateNode);

    this.onChange = this.onChange.bind(this);
    
    this.inputElement.addEventListener('input', this.onChange);
  }

  static get observedAttributes() {
    return observedAttributes;
  }

  onChange() {
    if (this.checked) this.setAttribute('checked', '');
    else this.removeAttribute('checked');

    this.dispatchEvent(new Event('change'));
  }

  get checked(): boolean {
    return this.inputElement.checked;
  }
  set checked(value: boolean) {
    if (value) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }

  get name(): string {
    return this.inputElement.name;
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }

  // private _value: string;
  get value(): string {
    // return this.getAttribute('value');
    // return this._value;
    return this.inputElement.value;
  }
  set value(value: string) {
    this.setAttribute('value', value);
    // this._value = value;
    // this.inputElement.value = value;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'checked':
        // if (oldValue === null || newValue === null)
          this.inputElement.checked = newValue !== null;
        break;
      case 'name':
        this.inputElement.name = newValue;
        break;
      case 'value':
        this.inputElement.value = newValue;
        break;
    }
  }
}