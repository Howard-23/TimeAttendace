/**
 * Main UI interactions – clock, week chips, tabs, filters
 */

function updateClock() {
  const el = document.getElementById('liveClock');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function initWeekChips() {
  const weekNav = document.getElementById('weekNav');
  if (!weekNav) return;

  const weekDays = [
    { d: 11, dow: 'Wed' },
    { d: 12, dow: 'Thu' },
    { d: 13, dow: 'Fri' },
    { d: 14, dow: 'Sat' },
    { d: 15, dow: 'Sun' },
    { d: 16, dow: 'Mon' },
    { d: 17, dow: 'Tue' }
  ];

  weekDays.forEach((day) => {
    const chip = document.createElement('div');
    chip.className = 'day-chip' + (day.d === 17 ? ' active' : '');
    chip.innerHTML = `<span class="dow">${day.dow}</span>${day.d} Nov`;
    chip.addEventListener('click', () => {
      document.querySelectorAll('.day-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
    weekNav.appendChild(chip);
  });
}

function initTabs() {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function initApp() {
  updateClock();
  setInterval(updateClock, 30000);
  initWeekChips();
  initTabs();
  initFilters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
