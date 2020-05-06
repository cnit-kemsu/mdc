import HTMLTemplate from '@lib/HTMLTemplate';
import html from './template.html';
import InputField from '../InputField';
import SelectOption from '../SelectOption';

const template = new HTMLTemplate(html);

export default class Select extends InputField {

  private valueEl: HTMLDivElement;
  private dropdownEl: HTMLLabelElement;

  private focusIndex: number = -1;
  private selectedOption: SelectOption = null;
  private _options: SelectOption[];
  requireToAdoptOptions: boolean = true;
  

  constructor() {
    super(template.clonedContent);

    this.valueEl = this.shadowRoot.querySelector('.value');
    this.dropdownEl = this.shadowRoot.querySelector('.dropdown');

    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('keyup', this.handleKeyup);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('select', this.handleSelect);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'disabled') this.valueEl.tabIndex = newValue === null ? 0 : -1;
  }

  private incrementFocusIndex(value: number) {
    const { options, focusIndex } = this;
    const length = options.length;
    if (length === 0) return;

    const maxIndex = length - 1;
    let index = focusIndex + value;
    index = index > maxIndex ? 0 : index < 0 ? maxIndex: index;
    this.focusIndex = index;

    let option = options[focusIndex];
    if (option !== undefined) option.tabIndex = -1;

    option = options[index];
    option.tabIndex = 0;
    option.focus();
  }

  private handleKeydown(event: KeyboardEvent) {
    const { key } = event;

    const increment = key === 'ArrowUp' ? -1 : key === 'ArrowDown' ? 1 : 0;
    if (increment !== 0) {
      if (!this.open) return;
      event.preventDefault();
      this.incrementFocusIndex(increment);
      return;
    }

    if (key === ' ') event.preventDefault();
  }

  private handleSelect(event: CustomEvent) {
    const { selectedOption, options, valueEl } = this;

    if (selectedOption !== null) {
      selectedOption.tabIndex = -1;
      selectedOption.removeAttribute('selected');
    }

    const option = event.target as SelectOption;
    option.tabIndex = 0;
    option.setAttribute('selected', '');
    valueEl.innerHTML = option.innerHTML;
    this.selectedOption = option;
    this.focusIndex = options.indexOf(option);

    super.onChange();
    this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }

  private handleKeyup(event: KeyboardEvent) {
    if (event.key !== ' ' || event.target !== this) return;
    this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  }

  private handleClick(event: MouseEvent) {
    this.toggleMenu();
  }

  private open = false;
  toggleMenu() {
    this.open = !this.open;
    this.dropdownEl.style.setProperty('display', this.open ? 'block' : 'none');
    if (this.open) this.selectedOption?.focus();
    else this.valueEl.focus();
  }

  private get options(): SelectOption[] {
    if (this.requireToAdoptOptions) {
      this._options = [...this.getElementsByTagName('md-option') as any];
      this.requireToAdoptOptions = false;
    }
    return this._options;
  }

  get value(): string {
    return this.selectedOption?.value;
  }
  set value(value: string) {
    const option = this.options.find(opt => opt.value === value);
    this.valueEl.innerHTML = option?.innerHTML || '';
    this.selectedOption = option || null;

    super.onChange();
  }
}