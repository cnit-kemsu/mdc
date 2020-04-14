import InteractiveElement from '@components/InteractiveElement';
import templateHTML from './template.html';

const template = document.createElement('template');
template.innerHTML = templateHTML;

export default class Radio extends InteractiveElement {

  constructor() {
    super();

    const child = template.content.cloneNode(true);
    this.shadowRoot.appendChild(child);

    const input = this.shadowRoot.childNodes[this.shadowRoot.childNodes.length - 1];
    input.addEventListener('change', (...args) => {
      //@ts-ignore
      //console.log(input.checked);
      this.setAttribute('checked', input.checked);
    });
  }


}