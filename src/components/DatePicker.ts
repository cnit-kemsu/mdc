import customElement from '@internals/customElement';
import { months, daysOfWeek, getTotalDaysInMonth, getFirstDayOfWeek } from '@internals/dateUtils';
import Icon from './Icon'; Icon;
import Dropdown from './Dropdown';
import template from './DatePicker.html';
import '../icons/chevron_left.svg';
import '../icons/chevron_right.svg';

import DateItem from './DateItem'; DateItem;

const daysOfWeekTemplate = document.createElement('template');
for (const day of daysOfWeek) {
  const dayEl = document.createElement('div') as HTMLDivElement;
  dayEl.classList.add('day');
  dayEl.innerHTML = day;
  daysOfWeekTemplate.content.appendChild(dayEl);
}

@customElement('md-datepicker')
export default class DatePicker extends Dropdown {

  private year: number;
  private month: number;
  private day: number;
  private calendar: HTMLDivElement = null;

  private dropdownBtn: Icon;
  private prevMonthBtn: Icon;
  private nextMonthBtn: Icon;
  
  constructor() {
    super();

    const now = new Date();
    this.year = now.getFullYear();
    this.month = now.getMonth();
    this.day = now.getDate();

    // console.log(this.year);
    // console.log(this.month);
    // console.log(this.day);

    this.shadowRoot.appendChild(template.fragment);
    
    this.dropdownBtn = this.shadowRoot.querySelector('#dropdown-btn');
    this.dropdownBtn = this.shadowRoot.querySelector('#prev-page-btn');
    this.dropdownBtn = this.shadowRoot.querySelector('#next-page-btn');

    const daysOfWeekEl = this.shadowRoot.querySelector('#days-of-week');

    const daysOfWeekFragment = daysOfWeekTemplate.content.cloneNode(true);
    daysOfWeekEl.appendChild(daysOfWeekFragment);

    




    const calendar = document.createElement('div') as HTMLDivElement;
    this.calendar = calendar;

    const year = document.createElement('div') as HTMLDivElement;
    year.innerHTML = this.year.toString();

    const month = document.createElement('div') as HTMLDivElement;
    month.innerHTML = months[this.month];

    const dates = document.createElement('div') as HTMLDivElement;
    dates.classList.add('grid');
    const totalDays = getTotalDaysInMonth(this.year, this.month);
    const firstDay = getFirstDayOfWeek(this.year, this.month);
    for (let date = 1; date <= totalDays; date++) {
      const dateEl = document.createElement('md-dateitem') as HTMLDivElement;
      dateEl.classList.add('date');
      if (date === 1) dateEl.style.setProperty('grid-column-start', firstDay.toString());
      dateEl.innerHTML = date.toString();
      dates.appendChild(dateEl);
    }

    //calendar.appendChild(year);
    //calendar.appendChild(month);
    calendar.appendChild(dates);

    this.shadowRoot.appendChild(calendar);

    //this.handleSelect = this.handleSelect.bind(this);
    // dates.addEventListener('select', this.handleSelect);
    this.addEventListener('select', this.handleSelect);
  }
  
  private _selectedDateItem: DateItem = null;
  private handleSelect(event: CustomEvent) {
    event.stopPropagation();
    //const dateItem = event.target as DateItem;
    const dateItem = event.detail.target as DateItem;
    
    const { _selectedDateItem } = this;
    if (_selectedDateItem !== null) _selectedDateItem.removeAttribute('selected');
    this._selectedDateItem = dateItem;
  }
}