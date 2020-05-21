import { customElement } from '@lib';
import template from './Overlay.html?template';

@customElement('md-ripple')
export default class Overlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);
  };
}