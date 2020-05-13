import template from './Overlay.html?template';

export default class Overlay extends HTMLElement {

  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);
  };
}