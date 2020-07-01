import customElement from '../internals/customElement';
import InteractiveElement from './base/InteractiveElement';
import RippleEffect from './base/RippleEffect';
import Icon from './Icon';
import template from './Button.html';

@customElement('md-button')
export default class Button extends InteractiveElement {

  private labelEl: HTMLLabelElement;
  private leadingIconEl: Icon;
  private trailingIconEl: Icon;

  constructor() {
    super();
    new RippleEffect(this);
    this.shadowRoot.appendChild(template.fragment);
    this.labelEl = this.shadowRoot.querySelector('label');
    this.leadingIconEl = this.shadowRoot.querySelector('.leading-icon');
    this.trailingIconEl = this.shadowRoot.querySelector('.trailing-icon');
  }

  static get observedAttributes() {
    return ['outlined', 'raised', 'label', 'leading-icon', 'trailing-icon', ...InteractiveElement.observedAttributes];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'outlined':
        if (newValue !== null && this.hasAttribute('outlined')) this.removeAttribute('raised');
        break;
      case 'raised':
        if (newValue !== null && this.hasAttribute('raised')) this.removeAttribute('outlined');
        break;
      case 'label':
        this.labelEl.innerText = newValue;
        break;
      case 'leading-icon':
        const { leadingIconEl } = this;
        if (newValue !== null && this.hasAttribute('leading-icon')) this.removeAttribute('trailing-icon');
        leadingIconEl.innerText = newValue;
        if (newValue !== null) leadingIconEl.style.removeProperty('display');
        else leadingIconEl.style.setProperty('display', 'none');
        break;
      case 'trailing-icon':
        const { trailingIconEl } = this;
        if (newValue !== null && this.hasAttribute('trailing-icon')) this.removeAttribute('leading-icon');
        trailingIconEl.innerText = newValue;
        if (newValue !== null) trailingIconEl.style.removeProperty('display');
        else trailingIconEl.style.setProperty('display', 'none');
        break;
    }
  }

  get label(): string {
    return this.getAttribute('label');
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }

  get leadingIcon(): string {
    return this.getAttribute('leading-icon');
  }
  set leadingIcon(value: string) {
    this.setAttribute('leading-icon', value);
  }

  get trailingIcon(): string {
    return this.getAttribute('trailing-icon');
  }
  set trailingIcon(value: string) {
    this.setAttribute('trailing-icon', value);
  }
}

declare global {
  module MDC {
    interface ButtonProps extends InteractiveElementProps<Button> {
      raised?: boolean;
      outlined?: boolean;
      label?: string;
      leadingIcon?: string;
      trailingIcon?: string;
    }
  }
  module JSX {
    interface IntrinsicElements {
      'md-button': MDC.ButtonProps;
    }
  }
}
