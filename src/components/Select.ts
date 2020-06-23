import customElement from '@internals/customElement';
import InputField from './base/InputField';
import SelectOption from './SelectOption';
import template from './Select.html';

@customElement('md-select')
export default class Select extends InputField {

  private valueEl: HTMLDivElement;
  private dropdownEl: HTMLLabelElement;
  private open = false;

  //private _value: string = '';
  private focusIndex: number = -1;
  private _selectedOption: SelectOption = null;
  private _options: SelectOption[] = [];

  constructor() {
    super();

    this.containerEl.prepend(template.fragment);
    this.valueEl = this.shadowRoot.querySelector('.value');
    this.dropdownEl = this.shadowRoot.querySelector('.dropdown');

    this.addEventListener('keydown', this.handleKeydown);
    //this.addEventListener('keyup', this.handleKeyup);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('select', this.handleSelect);

    const slot: HTMLSlotElement = this.shadowRoot.querySelector('slot');
    // const nodes = slot.assignedNodes().filter(node => node.nodeName === 'MD-OPTION');
    // // @ts-ignore
    // this._options = nodes;

    slot.addEventListener('slotchange', function(event) {
      console.log('slotchange');
      //console.log(slot);
      const nodes = slot.assignedNodes().filter(node => node.nodeName === 'MD-OPTION');
      console.log(nodes);
      this._options = nodes;
    });
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
      if (!this.open) return;
      event.preventDefault();
      this.incrementFocusIndex(increment);
      return;
    }

    if (key === ' ') event.preventDefault();
  }

  private handleSelect(event: Event) {
    event.stopPropagation();
    const option = event.target as SelectOption;
    super.value = option.value;
    this.selectedOption = option;
    this.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  }

  private handleClick(event: MouseEvent) {
    this.open = !this.open;
    this.dropdownEl.style.setProperty('display', this.open ? 'block' : 'none');
    if (this.open) this._selectedOption?.focus();
    else this.valueEl.focus();
    if (this.open) this.containerEl.style.setProperty('--md-background-color', '#f5f5f5');
    else this.containerEl.style.removeProperty('--md-background-color');
  }

  private get options(): SelectOption[] {
    return this._options;
  }
  private set selectedOption(option: SelectOption) {
    const { _selectedOption, options, valueEl } = this;

    if (_selectedOption !== null) _selectedOption.selected = false;

    if (option === undefined) {
      valueEl.innerHTML = '';
      this._selectedOption = null;
      this.focusIndex = -1;
      return;
    }

    option.selected = true;
    valueEl.innerHTML = option.label;
    this._selectedOption = option;
    this.focusIndex = options.indexOf(option);
  }

  get value(): string {
    return super.value;
  }
  set value(value: string) {
    super.value = value;
    this.selectedOption = this.options.find(option => option.value === value);
  }
}