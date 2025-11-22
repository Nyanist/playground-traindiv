const monthElement = document.getElementById('month');
const datesElement = document.getElementById('dates');
const previous = document.getElementById('previous');
const next = document.getElementById('next');

let currentDate = new Date();

function dayIndexMondayFirst(jsDay) {
  return (jsDay + 6) % 7;
}

function updateCalendar() {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDayOfMonth.getDate();

  const lastDayPrevMonth = new Date(currentYear, currentMonth, 0);
  const totalDaysPrev = lastDayPrevMonth.getDate();

  const firstDayIndex = dayIndexMondayFirst(firstDayOfMonth.getDay());
  const lastDayIndex = dayIndexMondayFirst(lastDayOfMonth.getDay());

  monthElement.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  let datesHTML = '';

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayNum = totalDaysPrev - i;
    datesHTML += `<div class="date inactive">${dayNum}</div>`;
  }

  for (let i = 1; i <= totalDays; i++) {
    const d = new Date(currentYear, currentMonth, i);
    const isToday = d.toDateString() === new Date().toDateString();
    const activeClass = isToday ? ' active' : '';
    datesHTML += `<div class="date${activeClass}">${i}</div>`;
  }

  const nextDaysToShow = lastDayIndex === 6 ? 0 : 6 - lastDayIndex;
  for (let i = 1; i <= nextDaysToShow; i++) {
    datesHTML += `<div class="date inactive">${i}</div>`;
  }

  datesElement.innerHTML = datesHTML;
}

previous.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});

next.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});

updateCalendar();
