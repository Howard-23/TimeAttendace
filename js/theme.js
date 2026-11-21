/**
 * Theme (light / dark) management
 * Safe for sandboxed environments where localStorage is blocked
 */

function getStorage() {
  try {
    return window.localStorage;
  } catch (e) {
    return null;
  }
}

function safeGetTheme() {
  const store = getStorage();
  if (!store) return null;
  try {
    return store.getItem('timetec-theme');
  } catch (e) {
    return null;
  }
}

function safeSetTheme(theme) {
  const store = getStorage();
  if (!store) return;
  try {
    store.setItem('timetec-theme', theme);
  } catch (e) {
    // ignore
  }
}

function applyTheme(theme) {
  const html = document.documentElement;
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');

  html.setAttribute('data-theme', theme);
  safeSetTheme(theme);

  if (iconSun) iconSun.classList.toggle('active', theme === 'light');
  if (iconMoon) iconMoon.classList.toggle('active', theme === 'dark');

  // Notify charts to restyle if available
  if (typeof window.updateChartsTheme === 'function') {
    window.updateChartsTheme(theme);
  }
}

function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const saved = safeGetTheme();
  let prefersDark = false;
  try {
    prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (e) {}

  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
