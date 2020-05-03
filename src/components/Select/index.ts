import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import InputField from '../InputField';
import SelectOption from '../SelectOption';

const template = new HTMLTemplate(html);

export default class Select extends InputField {

  private $value: HTMLDivElement;
  private $dropdown: HTMLLabelElement;
  private $currentOption: SelectOption = null;

  constructor() {
    super(template.clonedContent);

    this.$value = this.shadowRoot.querySelector('.value');
    this.$dropdown = this.shadowRoot.querySelector('.dropdown');

    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('keyup', this.handleKeyup);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('select', this.handleSelect);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'disabled') this.$value.tabIndex = newValue === null ? 0 : -1;
  }

  private handleSelect(event: CustomEvent) {
    if (this.$currentOption !== null) {
      this.$currentOption.tabIndex = -1;
      this.$currentOption.removeAttribute('selected');
    }
    const option = event.target as SelectOption;
    this.$currentOption = option;
    this.$currentOption.tabIndex = 0;
    this.$currentOption.setAttribute('selected', '');
    this.$value.innerHTML = this.$currentOption?.innerHTML;
    super.onChange();
  }

  private $_currentOption: SelectOption = null;
  private handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();

      if (event.key === 'ArrowDown') {
        if (this.$_currentOption === null) {
          console.log(this.getElementsByTagName('md-option'));
          this.$_currentOption = this.getElementsByTagName('md-option')[0] as SelectOption;
          this.$_currentOption.tabIndex = 0;
          this.$_currentOption.focus();
        } else {
          this.$_currentOption.tabIndex = -1;
          const nextOption = this.$_currentOption.nextElementSibling as SelectOption;
          if (nextOption === null) this.$_currentOption = this.getElementsByTagName('md-option')[0] as SelectOption;
          else this.$_currentOption = nextOption;
          this.$_currentOption.tabIndex = 0;
          this.$_currentOption.focus();
        }
      }

      if (event.key === 'ArrowUp') {
        if (this.$_currentOption === null) {
          const allOptions = this.getElementsByTagName('md-option');
          this.$_currentOption = allOptions[allOptions.length - 1] as SelectOption;
          this.$_currentOption.tabIndex = 0;
          this.$_currentOption.focus();
        } else {
          this.$_currentOption.tabIndex = -1;
          const nextOption = this.$_currentOption.previousElementSibling as SelectOption;
          const allOptions = this.getElementsByTagName('md-option');
          if (nextOption === null) this.$_currentOption = allOptions[allOptions.length - 1] as SelectOption;
          else this.$_currentOption = nextOption;
          this.$_currentOption.tabIndex = 0;
          this.$_currentOption.focus();
        }
      }
      
      return;
    }
    if (event.key === ' ') event.preventDefault();;
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ' || event.target !== this) return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }

  private handleClick(event: MouseEvent) {
    console.log(event);
    this.toggleMenu();
  }

  private open = false;
  toggleMenu() {
    this.open = !this.open;
    this.$dropdown.style.setProperty('display', this.open ? 'block' : 'none');
    this.$value.focus();
  }

  private getOptions(): SelectOption[] {
    // @ts-ignore
    return [...this.getElementsByTagName('md-option')];
  }

  get value(): string {
    return this.$currentOption?.value;
  }
  set value(value: string) {
    const options = this.getOptions();
    const option = options.find(opt => opt.value === value);
    this.$currentOption = option || null;
    this.$value.innerHTML = this.$currentOption?.innerHTML || '';
    super.onChange();
  }
}