import customElement from '../internals/customElement';
import SelectionControl from './base/SelectionControl';
import template from './Checkbox.html';

@customElement('md-checkbox')
export default class Checkbox extends SelectionControl {

  private pathEl: SVGPathElement;

  constructor() {
    super('checkbox');
    this.shadowRoot.appendChild(template.fragment);
    this.pathEl = this.shadowRoot.querySelector('path');
  }

  handleClick() {
    this.checked = !this.checked;
    if (this.checked) this.pathEl.style.setProperty('--md-path-animation', 'var(--md-path-check)');
    else this.pathEl.style.setProperty('--md-path-animation', 'var(--md-path-uncheck)');
    super.handleClick();
  }
}

declare global {
  module MDC {
    interface CheckboxProps extends SelectionControlProps<Checkbox> {
    }
  }
  module JSX {
    interface IntrinsicElements {
      'md-checkbox': MDC.CheckboxProps;
    }
  }
}