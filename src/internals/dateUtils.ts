const language = navigator?.language || 'en-US';
//const language = 'ru';

export const months = [];
for (let i = 1; i <= 12; i++) {
  let monthName = new Date(0, i, 0).toLocaleDateString(language, { month: 'long' });
  monthName = monthName[0].toUpperCase() + monthName.slice(1);
  months.push(monthName);
}
//console.log(months);

export const daysOfWeek = [];
for (let i = 0; i <= 6; i++) daysOfWeek.push(
  new Date(null, null, i).toLocaleDateString(language, { weekday: "long" })[0].toUpperCase()
);

const mondayFirst = language.includes('ru');
if (mondayFirst) daysOfWeek.push(daysOfWeek.shift());

//console.log(daysOfWeek);

export function getTotalDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

const dayShift = mondayFirst ? 0 : 1;
export function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay() + dayShift;
}