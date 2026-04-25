'use client';

import { useSyncExternalStore } from 'react';

interface BreakpointState {
  /** true when viewport width < 768px */
  isMobile: boolean;
  /** true when viewport width is between 768px and 1023px */
  isTablet: boolean;
  /** true when viewport width >= 1024px */
  isDesktop: boolean;
  /** false during SSR / before first client-side measurement */
  isReady: boolean;
}

function getSnapshot(): number {
  return window.innerWidth;
}

function getServerSnapshot(): number {
  return 0;
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener('resize', onStoreChange);
  return () => window.removeEventListener('resize', onStoreChange);
}

/**
 * Unified responsive hook that replaces useIsMobile + useIsTablet.
 *
 * Returns `isReady: false` during SSR and until the first client-side
 * measurement completes. Components should render a skeleton or nothing
 * while `isReady` is false to avoid hydration mismatches (audit C3).
 *
 * Uses a single shared resize listener instead of one per hook (audit m4).
 */
export function useBreakpoint(): BreakpointState {
  const width = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    isMobile: width > 0 && width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    isReady: width > 0,
  };
}
