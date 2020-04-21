import InteractiveElement from '@components/InteractiveElement';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const observedAttributes = ['checked', ...InteractiveElement.observedAttributes];

export default class Checkbox extends InteractiveElement {

  private setPathStyleProp: (propertyName: string, value: string) => void;

  constructor() {
    super(template.clonedContent);

    this.onInputElementChange = this.onInputElementChange.bind(this);
    
    this.inputElement.addEventListener('change', this.onInputElementChange);

    const pathStyle = (this.shadowRoot.querySelector('#path') as HTMLElement).style;
    this.setPathStyleProp = pathStyle.setProperty.bind(pathStyle);
  }

  static get observedAttributes() {
    return observedAttributes;
  }

  onInputElementChange() {
    const checked = this.inputElement.checked;

    if (checked) this.setAttribute('checked', '');
    else this.removeAttribute('checked');

    this.dispatchEvent(new Event('change'));
    
    if (checked) this.setPathStyleProp('--md-path-animation', 'var(--md-path-check)');
    else this.setPathStyleProp('--md-path-animation', 'var(--md-path-uncheck)');
  }

  get checked(): boolean {
    return this.hasAttribute('checked');
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

  // private _value: string;
  get value(): string {
    return this.getAttribute('value');
    // return this._value;
    // return this.inputElement.value;
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
      case 'name': this.inputElement.name = newValue;
      case 'value': this.inputElement.value = newValue;
    }
  }
}