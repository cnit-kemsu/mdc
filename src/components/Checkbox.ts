import customElement from '../internals/customElement';
import SelectionControl from './base/SelectionControl';
import template from './Checkbox.html';

@customElement('m-checkbox')
export default class Checkbox extends SelectionControl {

  private pathEl: SVGPathElement;

  constructor() {
    super('checkbox');
    this.shadowRoot.appendChild(template.fragment);
    this.pathEl = this.shadowRoot.querySelector('path');
  }

  handleClick() {
    this.checked = !this.checked;
    if (this.checked) this.pathEl.style.setProperty('--m-path-animation', 'var(--m-path-check)');
    else this.pathEl.style.setProperty('--m-path-animation', 'var(--m-path-uncheck)');
    super.handleClick();
  }
}

declare global {
  module Material {
    interface CheckboxProps extends SelectionControlProps<Checkbox> {
    }
  }
  module JSX {
    interface IntrinsicElements {
      'm-checkbox': Material.CheckboxProps;
    }
  }
}