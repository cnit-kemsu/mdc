import { customElement } from '@lib';
import template from './Icon.html?template';

const observedAttributes = ['icon'];

const icons = new Map();
const getIcon = icons.get.bind(icons);
export const setIcon = icons.set.bind(icons);

@customElement('md-icon')
export default class Icon extends HTMLElement {

  container: HTMLSpanElement;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    this.container = this.shadowRoot.querySelector('span');
  }

  get icon(): string {
    return this.getAttribute('icon');
  }
  set icon(value: string) {
    this.setAttribute('icon', value);
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'icon') this.container.innerHTML = getIcon(newValue) || '';
  }
}

