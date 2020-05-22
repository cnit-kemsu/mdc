import { customElement } from '@lib';
import SelectionControl from '@components/base/SelectionControl';
import template from './Checkbox.html?template';

@customElement('md-checkbox')
export default class Checkbox extends SelectionControl {

  private pathEl: SVGPathElement;

  constructor() {
    super('checkbox');
    this.shadowRoot.appendChild(template.fragment);
    this.pathEl = this.shadowRoot.querySelector('path');
  }

  onChange() {
    this.checked = !this.checked;
    if (this.checked) this.pathEl.style.setProperty('--md-path-animation', 'var(--md-path-check)');
    else this.pathEl.style.setProperty('--md-path-animation', 'var(--md-path-uncheck)');
    super.onChange();
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