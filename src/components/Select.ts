import customElement from '@internals/customElement';
import InputField from './base/InputField';
import './Dropdown';
import Dropdown from './Dropdown';
import SelectOption from './SelectOption';
import template from './Select.html';
import '../icons/arrow_drop_down.svg';

@customElement('md-select')
export default class Select extends InputField {

  private valueEl: HTMLDivElement;
  private dropdownEl: Dropdown;
  private slotEl: HTMLSlotElement;
  private _open = false;

  private focusIndex: number = -1;
  private _selectedOption: SelectOption = null;
  private options: SelectOption[] = [];

  constructor() {
    super();

    this.containerEl.prepend(template.fragment);
    this.valueEl = this.shadowRoot.querySelector('.value');
    this.dropdownEl = this.shadowRoot.querySelector('md-dropdown');
    this.dropdownEl.anchor = this.containerEl;

    this.handleSlotChange = this.handleSlotChange.bind(this);

    this.addEventListener('keydown', this.handleKeydown);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('select', this.handleSelect);

    const slot: HTMLSlotElement = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', this.handleSlotChange);
    this.slotEl = slot;

    //this.addEventListener('focusin', (event) => console.log('focusin', event));
    //this.addEventListener('focusout', (event) => console.log('focusout', event));
    this.addEventListener('focusout', (event: FocusEvent) => {
      if (!this.contains(<Node>event.relatedTarget)) {
        if (this.open) this.open = false;
        console.log('should close');
      }
    });
  }

  private handleSlotChange() {
    const nodes = this.slotEl.assignedNodes().filter(node => node.nodeName === 'MD-OPTION') as SelectOption[];
    this.options = nodes;

    const option = nodes.find(opt => opt.value === this.value);
    if (option !== undefined) {

      if (this._selectedOption !== option) {
        if (option.selected) this.setSelectedOption(option);
        else option.selected = true;
        super.value = option.value;
      }
      const other = nodes.filter(opt => opt !== option && opt.selected);
      for (const opt of other) opt.selected = false;

    } else {

      const options = nodes.filter(opt => opt.selected);
      if (options.length > 0) {

        const option = options.pop();
        this.setSelectedOption(option);
        super.value = option.value;
        for (const opt of options) opt.selected = false;

      } else {

        this.setSelectedOption(null);
        super.value = null;

      }

    }
  }

  private incrementFocusIndex(value: number) {
    const { options, focusIndex } = this;
    const totalCount = options.length;
    if (totalCount === 0) return;

    const maxIndex = totalCount - 1;
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
      if (!this._open) return;
      event.preventDefault();
      this.incrementFocusIndex(increment);
      return;
    }

    if (key === ' ') event.preventDefault();
  }

  private setSelectedOption(option: SelectOption) {
    const { _selectedOption, options, valueEl } = this;

    if (option == null) {
      valueEl.innerHTML = '';
      this._selectedOption = null;
      this.focusIndex = -1;
      return;
    }

    valueEl.innerHTML = option.label;
    this._selectedOption = option;
    this.focusIndex = options.indexOf(option);

    if (_selectedOption !== null) _selectedOption.selected = false;
  }

  private handleSelect(event: Event) {
    event.stopPropagation();
    const option = event.target as SelectOption;
    const { _selectedOption } = this;

    if (option.selected) {
      this.setSelectedOption(option);
      super.value = option.value;
    } else if (option === _selectedOption) {
      this.setSelectedOption(null);
      super.value = null;
    }
  }

  protected handleKeyup(event: KeyboardEvent) {
    if (event.target !== this) return;
    super.handleKeyup(event);
  }

  private handleClick() {
    this.open = !this.open;
    if (this.open) this._selectedOption?.focus();
    else this.valueEl.focus();
  }

  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    this._open = value;
    this.dropdownEl.open = value;

    if (value) this.setAttribute('open', '');
    else this.removeAttribute('open');

    if (value) this.containerEl.style.setProperty('--md-background-color', '#f5f5f5');
    else this.containerEl.style.removeProperty('--md-background-color');
  }

  get value(): string {
    return super.value;
  }
  set value(value: string) {
    const option = this.options.find(option => option.value === value);
    this.setSelectedOption(option);
    super.value = value;
  }
}