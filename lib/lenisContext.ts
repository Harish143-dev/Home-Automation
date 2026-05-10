'use client';

import { createContext, useContext } from 'react';
import type Lenis from 'lenis';

/**
 * Context to share the Lenis smooth scroll instance across the app.
 * Components (like NavBar) can consume this to trigger programmatic
 * scrollTo() calls that work with Lenis instead of fighting it.
 */
export const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}
