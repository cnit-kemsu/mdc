import Overlay from './Overlay';
import HTMLTemplate from '@lib/HTMLTemplate1';
import html from './RippleOverlay.template.html';

const template = new HTMLTemplate(html);;

export default class RippleOverlay extends Overlay {

  constructor() {
    super();
    
    this.shadowRoot.appendChild(template.clonedContent);
  };
}