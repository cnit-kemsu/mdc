import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import InputField from '../InputField';

const template = new HTMLTemplate(html);

export default class Select extends InputField {

  private $value: HTMLDivElement;
  private $menu: HTMLLabelElement;

  constructor() {
    super(template.clonedContent);

    this.$value = this.shadowRoot.querySelector('.value');
    this.$menu = this.shadowRoot.querySelector('.menu');
    
    // const textInput = this.$textField.shadowRoot.querySelector('input');
    // //textInput.disabled = true;
    // textInput.style.setProperty('pointer-events', 'none');
    // textInput.setAttribute('tabindex', '-1');

    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('keyup', this.handleKeyup);
    this.addEventListener('click', this.handleClick);
  }

  connectedCallback() {
    this.tabIndex = 0;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    switch (name) {
      case 'value':
        this.value = newValue; break;
    }
  }

  private currentOption = null;
  private handleKeydown(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {

      event.preventDefault();

      if (event.key === 'ArrowDown') {
        if (this.currentOption === null) {
          this.currentOption = this.$menu.getElementsByClassName('list-item')[0];
          this.currentOption.tabIndex = 0;
          this.currentOption.focus();
        } else {
          this.currentOption.tabIndex = -1;
          const next = this.currentOption.nextElementSibling;
          if (next === null) this.currentOption = this.$menu.getElementsByClassName('list-item')[0];
          else this.currentOption = next;
          this.currentOption.tabIndex = 0;
          this.currentOption.focus();
        }
      }

      if (event.key === 'ArrowUp') {
        if (this.currentOption === null) {
          const all = this.$menu.getElementsByClassName('list-item');
          this.currentOption = all[all.length - 1];
          this.currentOption.tabIndex = 0;
          this.currentOption.focus();
        } else {
          this.currentOption.tabIndex = -1;
          const next = this.currentOption.previousElementSibling;
          const all = this.$menu.getElementsByClassName('list-item');
          if (next === null) this.currentOption = all[all.length - 1];
          else this.currentOption = next;
          this.currentOption.tabIndex = 0;
          this.currentOption.focus();
        }
      }
      
      return;
    }
    if (event.key !== ' ') return;
    event.preventDefault();
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ') return;
    this.value = this.currentOption?.innerText;
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
    this.focus();
  }

  private isEmpty: boolean = true;
  private onChange() {
    const isEmpty = !this.value;
    if (this.isEmpty === isEmpty) return;
    this.isEmpty = isEmpty;
    if (isEmpty) this.$label.style.removeProperty('--md-label-transform');
    else this.$label.style.setProperty('--md-label-transform', 'var(--md-label-elevated)');
  }

  private _value: string;
  get value(): string {
    return this._value;
    //return this.$textField.value;
  }
  set value(value: string) {
    this._value = value;
    this.$value.innerText = value;
    //this.$textField.value = value;
    this.onChange();
  }
}