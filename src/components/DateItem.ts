import customElement from '@internals/customElement';
import InteractiveElement from './base/InteractiveElement';
import template from './DateItem.html';

@customElement('m-dateitem')
export default class DateItem extends InteractiveElement {
  
  constructor() {
    super();
    this.shadowRoot.appendChild(template.fragment);

    // this.handleClick = this.handleClick.bind(this);
    // const rootEl = this.shadowRoot.querySelector('#root');
    this.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.setAttribute('selected', '');
    this.dispatchEvent(new CustomEvent('select', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        target: this
      }
    }));
  }
}