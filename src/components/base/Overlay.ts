import HTMLTemplate from '../../lib/HTMLTemplate';
import customElement from '../../lib/customElement';
import template from './Overlay.html';

@customElement('md-ripple')
export default class Overlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);
  };
}