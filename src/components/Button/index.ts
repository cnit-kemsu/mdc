import InteractiveElement from '@components/InteractiveElement';
import templateHTML from './template.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

export default class Button extends InteractiveElement {

  constructor() {
    super();

    const child = template.content.cloneNode(true);
    this.shadowRoot.appendChild(child);
  }
}