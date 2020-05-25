import HTMLTemplate from '../lib/HTMLtemplate';
import customElement from '../lib/customElement';
import { _RadioNodeList, joinRadioNodeList } from '../lib/RadioNodeList';
import SelectionControl from './base/SelectionControl';
import html from './RadioButton.html';

const template = new HTMLTemplate(html);

@customElement('md-radio')
export default class RadioButton extends SelectionControl {

  private radioNodeList: _RadioNodeList = null;

  constructor() {
    super('radio');
    this.shadowRoot.appendChild(template.fragment);
  }

  connectedCallback() {
    super.connectedCallback();
    if (__IMPLICIT_UNCHECK__) {
      this.radioNodeList = joinRadioNodeList(this);
    }
  }

  disconnectedCallback() {
    if (__IMPLICIT_UNCHECK__) this.radioNodeList.leave(this);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    
    switch (name) {
      case 'checked':
        if (newValue === 'false') {
          break;
        }
        if (__IMPLICIT_UNCHECK__) if (this.radioNodeList !== null && (oldValue !== null) !== (newValue !== null)) {
          const { checked, radioNodeList: radioGroup } = this;
          if (checked) radioGroup.current = this;
          else if (radioGroup.current === this) radioGroup.current = null;
        }
        break;
      case 'name':
        if (__IMPLICIT_UNCHECK__) if (this.radioNodeList !== null) {
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

/** Determines whether to set the 'checked' value of md-radio element to false if another md-radio element with the same name of the same form element is selected. */
declare const __IMPLICIT_UNCHECK__: boolean;

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