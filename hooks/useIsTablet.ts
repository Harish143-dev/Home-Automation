'use client';

import { useBreakpoint } from './useBreakpoint';

/**
 * Hook that returns true when viewport width is between 768px and 1023px.
 * Used for tablet-specific behavior (simplified video, no spotlight).
 */
export function useIsTablet(): boolean {
  return useBreakpoint().isTablet;
}
