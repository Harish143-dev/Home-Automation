import { ScrollTrigger } from 'gsap/ScrollTrigger';

let refreshTimer: number | undefined;

export function scheduleScrollRefresh(delay = 0) {
  if (typeof window === 'undefined') return;

  if (refreshTimer !== undefined) {
    window.clearTimeout(refreshTimer);
  }

  refreshTimer = window.setTimeout(() => {
    window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      refreshTimer = undefined;
    });
  }, delay);
}

export function refreshAfterLayoutSettles() {
  if (typeof window === 'undefined') return;

  scheduleScrollRefresh();
  window.addEventListener('load', () => scheduleScrollRefresh(), { once: true });

  const fonts = document.fonts;
  if (fonts) {
    fonts.ready.then(() => scheduleScrollRefresh()).catch(() => undefined);
  }
}
