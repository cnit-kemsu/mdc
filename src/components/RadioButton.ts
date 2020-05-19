import { customElement } from '@lib';
import SelectionControl from '@components/base/SelectionControl';
import template from './RadioButton.html?template';

const checkedMap: Map<string, RadioButton> = new Map();

@customElement('md-radio')
export default class RadioButton extends SelectionControl {

  constructor() {
    super();

    this.shadowRoot.appendChild(template.fragment);
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