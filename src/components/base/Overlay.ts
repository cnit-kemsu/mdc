import HTMLTemplate from '@lib/HTMLTemplate1';
import html from './Overlay.template.html';

const template = new HTMLTemplate(html);

export default class Overlay extends HTMLElement {

  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);
  };
}