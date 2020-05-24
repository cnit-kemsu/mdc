import HTMLTemplate from '../lib/HTMLtemplate';
import customElement from '../lib/customElement';
import { FormGroup, RadioGroup, joinFormGroup, joinRadioGroup } from '../lib/RadioGroup';
import SelectionControl from './base/SelectionControl';
import html from './RadioButton.html';

const template = new HTMLTemplate(html);

@customElement('md-radio')
export default class RadioButton extends SelectionControl {

  private formGroup: FormGroup = null;
  private radioGroup: RadioGroup = null;

  constructor() {
    super('radio');
    this.shadowRoot.appendChild(template.fragment);
  }

  connectedCallback() {
    super.connectedCallback();
    if (__AUTO_UNCHECK__) {
      this.formGroup = joinFormGroup(this.inputEl);
      this.radioGroup = joinRadioGroup(this);
    }
  }

  disconnectedCallback() {
    if (__AUTO_UNCHECK__) this.radioGroup.leave();
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    
    switch (name) {
      case 'checked':
        if (newValue === 'false') {
          break;
        }
        if (this.hasRadioGroup && (oldValue !== null) !== (newValue !== null)) {
          const { checked, radioGroup } = this;
          if (checked) radioGroup.current = this;
          else if (radioGroup.current === this) radioGroup.current = null;
        }
        break;
      case 'name':
        if (this.hasRadioGroup) {
          this.radioGroup.leave();
          this.radioGroup = joinRadioGroup(this);
        }
        break;
    }
  }

  private get hasRadioGroup() {
    return this.radioGroup !== null;
  }

  onChange() {
    if (this.checked) return;
    this.checked = true;
    super.onChange();
  }
}

/** Determines whether to set the 'checked' value of md-radio element to false if another md-radio element with the same name of the same form element is selected. */
declare const __AUTO_UNCHECK__: boolean;

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