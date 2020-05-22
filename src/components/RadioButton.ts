import { customElement, options } from '@lib';
import { FormGroup, RadioGroup, joinFormGroup, joinRadioGroup } from '@lib/RadioGroup';
import SelectionControl from '@components/base/SelectionControl';
import template from './RadioButton.html?template';

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
    if (options.autoUncheck) {
      this.formGroup = joinFormGroup(this.inputEl);
      this.radioGroup = joinRadioGroup(this);
    }
  }

  disconnectedCallback() {
    if (options.autoUncheck) this.radioGroup.leave();
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