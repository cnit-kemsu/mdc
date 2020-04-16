import templateHTML from './template.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

export default class Overlay extends HTMLElement {

  constructor() {
    super();
    
    this.attachShadow({ mode: 'open' });
    const child = template.content.cloneNode(true);
    this.shadowRoot.appendChild(child);
  };
}