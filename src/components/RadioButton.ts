import HTMLTemplate from '../lib/HTMLTemplate';
import customElement from '../lib/customElement';
import { _RadioNodeList, joinRadioNodeList } from '../lib/RadioNodeList';
import SelectionControl from './base/SelectionControl';
import template from './RadioButton.html';

// @ts-ignore
if (window.mdcOptions === undefined) window.mdcOptions = {};
if (window.mdcOptions.implicitUncheck === undefined) window.mdcOptions = {
  ...window.mdcOptions,
  implicitUncheck: true
};

@customElement('md-radio')
export default class RadioButton extends SelectionControl {

  private radioNodeList: _RadioNodeList = null;

  constructor() {
    super('radio');
    this.shadowRoot.appendChild(template.fragment);
  }

  connectedCallback() {
    super.connectedCallback();
    if (window.mdcOptions.implicitUncheck) {
      this.radioNodeList = joinRadioNodeList(this);
    }
  }

  disconnectedCallback() {
    if (window.mdcOptions.implicitUncheck) this.radioNodeList.leave(this);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    
    switch (name) {
      case 'checked':
        if (newValue === 'false') {
          break;
        }
        if (window.mdcOptions.implicitUncheck) if (this.radioNodeList !== null && (oldValue !== null) !== (newValue !== null)) {
          const { checked, radioNodeList: radioGroup } = this;
          if (checked) radioGroup.current = this;
          else if (radioGroup.current === this) radioGroup.current = null;
        }
        break;
      case 'name':
        if (window.mdcOptions.implicitUncheck) if (this.radioNodeList !== null) {
          this.radioNodeList.leave(this);
          this.radioNodeList = joinRadioNodeList(this);
        }
        break;
    }
  }

  onClick() {
    if (this.checked) return;
    this.checked = true;
    super.onClick();
  }
}

//declare const __IMPLICIT_UNCHECK__: boolean;

// declare global {
//   interface Window {
//     mdcOptions: {
//       /** Determines whether to set the 'checked' value of md-radio element to false if another md-radio element with the same name of the same form element is selected. */
//       implicitUncheck: boolean;
//     }
//   }
// }

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