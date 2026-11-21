/**
 * Dashboard charts (Chart.js)
 */

let statusChartInstance = null;
let workrateChartInstance = null;

function createCharts() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  const statusEl = document.getElementById('statusChart');
  const workrateEl = document.getElementById('workrateChart');
  if (!statusEl || !workrateEl || typeof Chart === 'undefined') return;

  statusChartInstance = new Chart(statusEl, {
    type: 'doughnut',
    data: {
      labels: ['Normal', 'Rest Day', 'On Leave', 'Tardiness', 'No Clocking', 'Absent'],
      datasets: [{
        data: [31, 6, 4, 5, 1, 1],
        backgroundColor: ['#0d9f6e', '#6366f1', '#8b5cf6', '#f59e0b', '#f97316', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { boxWidth: 12, font: { size: 12 }, color: textColor }
        }
      },
      cutout: '58%'
    }
  });

  workrateChartInstance = new Chart(workrateEl, {
    type: 'line',
    data: {
      labels: ['11 Nov', '12 Nov', '13 Nov', '14 Nov', '15 Nov', '16 Nov', '17 Nov'],
      datasets: [{
        label: 'Work Rate %',
        data: [94, 91, 89, 96, 93, 90, 92.4],
        borderColor: '#1a73e8',
        backgroundColor: 'rgba(26,115,232,0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: '#1a73e8'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: textColor }, grid: { color: gridColor } },
        y: {
          min: 80,
          max: 100,
          ticks: { callback: (v) => v + '%', color: textColor },
          grid: { color: gridColor }
        }
      },
      plugins: { legend: { display: false } }
    }
  });

  window.statusChartInstance = statusChartInstance;
}

function updateChartsTheme(theme) {
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  if (statusChartInstance) {
    statusChartInstance.options.plugins.legend.labels.color = textColor;
    statusChartInstance.update();
  }
  if (workrateChartInstance) {
    workrateChartInstance.options.scales.x.ticks.color = textColor;
    workrateChartInstance.options.scales.x.grid.color = gridColor;
    workrateChartInstance.options.scales.y.ticks.color = textColor;
    workrateChartInstance.options.scales.y.grid.color = gridColor;
    workrateChartInstance.update();
  }
}

// Expose for theme.js
window.updateChartsTheme = updateChartsTheme;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createCharts);
} else {
  createCharts();
}
