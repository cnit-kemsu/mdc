import Overlay from '@components/Overlay';
import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';

const template = new HTMLTemplate(html);;

export default class RippleOverlay extends Overlay {

  constructor() {
    super();
    this.shadowRoot.appendChild(template.clonedContent);
  };
}