import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import icons from '../../icons';

const template = new HTMLTemplate(html);

const observedAttributes = ['name'];

export default class Icon extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);
  }

  get iconName() {
    return this.getAttribute('name');
  }
  set iconName(value) {
    this.setAttribute('name', value)
  }

  // connectedCallback() {
  //   const name = this.getAttribute('name');
  //   if (!name) return;
  //   this.shadowRoot.innerHTML += icons.get(name);
  // }
  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'name') {
      if (newValue) this.shadowRoot.innerHTML += icons.get(newValue);
    }
  }
}