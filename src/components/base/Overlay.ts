import { HTMLTemplate, customElement } from '../../lib';
import html from './Overlay.html';

const template = new HTMLTemplate(html);

@customElement('md-ripple')
export default class Overlay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.fragment);
  };
}