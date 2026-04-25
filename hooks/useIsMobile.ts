'use client';

import { useBreakpoint } from './useBreakpoint';

/**
 * Hook that returns true when viewport width < 768px.
 * Used to disable video, spotlight, and pin on mobile.
 */
export function useIsMobile(): boolean {
  return useBreakpoint().isMobile;
}
