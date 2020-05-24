import HTMLTemplate from '../../lib/HTMLtemplate';
import customElement from '../../lib/customElement';
import Overlay from './Overlay';
import html from './RippleOverlay.html';

const template = new HTMLTemplate(html);

@customElement('md-ripple-overlay')
export default class RippleOverlay extends Overlay {
  constructor() {
    super();
    this.shadowRoot.appendChild(template.fragment);
  };
}