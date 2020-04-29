import SelectionControl from '@components/base/SelectionControl';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);

const checkedMap: Map<string, RadioButton> = new Map();

export default class RadioButton extends SelectionControl {

  constructor() {
    super(template.clonedContent);
  }

  disconnectedCallback() {
    const { name } = this;
    if (checkedMap.get(name) === this) checkedMap.delete(name);
  }

  onChange() {
    if (this.checked) return;
    this.checked = true;

    super.onChange();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'checked') {
      const nameAttr = this.name;
      if (newValue !== null) {
        const current = checkedMap.get(nameAttr);
        if (current !== this) {
          if (current !== undefined) current.checked = false;
          checkedMap.set(nameAttr, this);
        }
      }
    }
  }
}