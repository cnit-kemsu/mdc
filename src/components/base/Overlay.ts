import customElement from '@internals/customElement';
import template from './Overlay.html';

@customElement('m-overlay')
export default class Overlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);
  };
}