'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function subscribe(onStoreChange: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', onStoreChange);
  return () => mql.removeEventListener('change', onStoreChange);
}

/**
 * Hook that detects the user's prefers-reduced-motion setting.
 * Returns true if the user prefers reduced motion.
 *
 * Fixed (audit C4): Moved window.matchMedia out of useState initializer
 * to avoid SSR hydration warnings in React 19 strict mode.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
