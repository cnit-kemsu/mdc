const months = [];
for (let i = 1; i <= 12; i++) months.push(
  new Date(0, i, 0).toLocaleDateString(navigator?.language || 'en-US', {month: "long"})
);
console.log(months);