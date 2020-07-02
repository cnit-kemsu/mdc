import customElement from '@internals/customElement';
import IconStore from '../IconStore';
import Icon from './Icon'; Icon;
import Dropdown from './Dropdown';
import template from './DatePicker.html';
import ChevronLeftIcon from '../icons/chevron_left.svg';
import ChevronRightIcon from '../icons/chevron_right.svg';

IconStore.set('chevron_left', ChevronLeftIcon);
IconStore.set('chevron_right', ChevronRightIcon);

const language = navigator?.language || 'en-US';
//const language = 'ru';

const months = [];
for (let i = 1; i <= 12; i++) months.push(
  new Date(0, i, 0).toLocaleDateString(language, { month: 'long' })
);
//console.log(months);

const daysOfWeek = [];
for (let i = 0; i <= 6; i++) daysOfWeek.push(
  new Date(null, null, i).toLocaleDateString(language, { weekday: "long" })[0]
);
//console.log(daysOfWeek);

function getTotalDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

@customElement('md-date-picker')
export default class DatePicker extends Dropdown {

  private year: number = 0;
  private month: number = 0;
  private day: number = 0;
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

    const calendar = document.createElement('div') as HTMLDivElement;
    this.calendar = calendar;

    const year = document.createElement('div') as HTMLDivElement;
    year.innerHTML = this.year.toString();

    const month = document.createElement('div') as HTMLDivElement;
    month.innerHTML = months[this.month];

    const days = document.createElement('div') as HTMLDivElement;
    days.classList.add('days');
    for (const day of daysOfWeek) {
      const dayEl = document.createElement('div') as HTMLDivElement;
      dayEl.classList.add('day');
      dayEl.innerHTML = day;
      days.appendChild(dayEl);
    }

    const dates = document.createElement('div') as HTMLDivElement;
    dates.classList.add('grid');
    const totalDays = getTotalDaysInMonth(this.year, this.month);
    const firstDay = new Date(this.year, this.month, 1).getDay() + 1;
    for (let date = 1; date <= totalDays; date++) {
      const dateEl = document.createElement('div') as HTMLDivElement;
      dateEl.classList.add('date');
      if (date === 1) dateEl.style.setProperty('grid-column-start', firstDay.toString());
      dateEl.innerHTML = date.toString();
      dates.appendChild(dateEl);
    }

    //calendar.appendChild(year);
    //calendar.appendChild(month);
    calendar.appendChild(days);
    calendar.appendChild(dates);

    this.shadowRoot.appendChild(calendar);
  }
}