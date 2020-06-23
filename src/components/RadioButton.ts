import customElement from '@internals/customElement';
import { _RadioNodeList, joinRadioNodeList } from '@internals/RadioNodeList';
import SelectionControl from './base/SelectionControl';
import template from './RadioButton.html';

const __IMLICIT_UNCHECK__ = window.webmd.implicitUncheck;

@customElement('md-radio')
export default class RadioButton extends SelectionControl {

  private radioNodeList: _RadioNodeList = null;

  constructor() {
    super('radio');
    this.shadowRoot.appendChild(template.fragment);
  }

  connectedCallback() {
    super.connectedCallback();
    if (__IMLICIT_UNCHECK__) {
      this.radioNodeList = joinRadioNodeList(this);
    }
  }

  disconnectedCallback() {
    if (__IMLICIT_UNCHECK__) this.radioNodeList.leave(this);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    
    switch (name) {
      case 'checked':
        if (newValue === 'false') {
          break;
        }
        if (__IMLICIT_UNCHECK__) if (this.radioNodeList !== null && (oldValue !== null) !== (newValue !== null)) {
          const { checked, radioNodeList } = this;
          if (checked) radioNodeList.current = this;
          else if (radioNodeList.current === this) radioNodeList.current = null;
        }
        break;
      case 'name':
        if (__IMLICIT_UNCHECK__) if (this.radioNodeList !== null) {
          this.radioNodeList.leave(this);
          this.radioNodeList = joinRadioNodeList(this);
        }
        break;
    }
  }

  handleClick() {
    if (this.checked) return;
    this.checked = true;
    super.handleClick();
  }
}

declare global {
  module MDC {
    interface RadioButtonProps extends SelectionControlProps<RadioButton> {
    }
  }
  module JSX {
    interface IntrinsicElements {
      'md-radio': MDC.RadioButtonProps;
    }
  }
}