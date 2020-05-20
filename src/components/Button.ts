import { customElement } from '@lib';
import RippleElement, { RippleElementProps } from '@components/base/RippleElement';
import Icon from './Icon';
import template from './Button.html?template';

@customElement('md-button')
export default class Button extends RippleElement {

  private labelEl: HTMLLabelElement;
  private leadingIconEl: Icon;
  private trailingIconEl: Icon;

  constructor() {
    super();
    this.shadowRoot.appendChild(template.fragment);
    this.labelEl = this.shadowRoot.querySelector('label');
    this.leadingIconEl = this.shadowRoot.querySelector('.leading-icon');
    this.trailingIconEl = this.shadowRoot.querySelector('.trailing-icon');
  }

  static get observedAttributes() {
    return ['outlined', 'raised', 'label', 'leading-icon', 'trailing-icon', ...RippleElement.observedAttributes];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log('111');
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
        if (newValue !== null && this.hasAttribute('leading-icon')) this.removeAttribute('trailing-icon');
        this.leadingIconEl.storeKey = newValue;
        break;
      case 'trailing-icon':
        if (newValue !== null && this.hasAttribute('trailing-icon')) this.removeAttribute('leading-icon');
        this.trailingIconEl.storeKey = newValue;
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

interface ButtonProps extends RippleElementProps {
  raised?: boolean;
  outlined?: boolean;
  label?: string;
  leadingIcon?: string;
  trailingIcon?: string;
}
declare global {
  module JSX {
    interface IntrinsicElements {
      'md-button': ButtonProps;
    }
  }
}