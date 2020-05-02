import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import TextField from '../TextField';

const template = new HTMLTemplate(html);

const observedAttributes = ['label', 'error', 'name', 'value', 'disabled'];

export default class Select extends HTMLElement {

  private $textField: TextField;
  private $menu: HTMLLabelElement;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.clonedContent);

    this.$textField = this.shadowRoot.querySelector('md-textfield');
    this.$menu = this.shadowRoot.querySelector('.menu');
    
    const textInput = this.$textField.shadowRoot.querySelector('input');
    //textInput.disabled = true;
    textInput.style.setProperty('pointer-events', 'none');
    textInput.setAttribute('tabindex', '-1');

    this.addEventListener('keyup', this.handleKeyup);
    this.addEventListener('click', this.handleClick);
  }

  static get observedAttributes() {
    return observedAttributes;
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case 'label':
        this.$textField.label = newValue; break;
      case 'error':
        this.$textField.error = newValue; break;
      case 'value':
        this.value = newValue; break;
      case 'disabled':
        this.$textField.disabled = newValue !== null; break;
    }
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ') return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }

  private handleClick(event: MouseEvent) {
    console.log(event.target);
    // @ts-ignore
    const path = event.path;
    //console.log(event.path);
    for (let index = 0; index <= path.length; index++) {
      if (path[index] !== this.$menu) continue;
      this.value = path[index - 1].getAttribute('value');
    }
    this.toggleMenu();
  }

  private open = false;
  toggleMenu() {
    this.open = !this.open;
    this.$menu.style.setProperty('display', this.open ? 'block' : 'none');
  }

  private onChange() {
    
  }

  get label(): string {
    return this.getAttribute('label');
  }
  set label(value: string) {
    this.setAttribute('label', value);
  }

  get error(): string {
    return this.getAttribute('error');
  }
  set error(value: string) {
    this.setAttribute('error', value);
  }

  get name(): string {
    return this.getAttribute('name');
  }
  set name(value: string) {
    this.setAttribute('name', value);
  }

  get value(): string {
    return this.$textField.value;
  }
  set value(value: string) {
    this.$textField.value = value;
    this.onChange();
  }

  get disabled(): boolean {
    return this.getAttribute('disabled') !== null;
  }
  set disabled(value: boolean) {
    if (value) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }
}