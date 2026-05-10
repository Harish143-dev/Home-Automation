'use client';

import React, { useRef, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsapSetup';
import { refreshAfterLayoutSettles } from '../../lib/scrollRefresh';
import { LenisContext } from '../../lib/lenisContext';

/**
 * Lenis smooth scroll provider.
 * Connects Lenis to GSAP's ticker for seamless integration
 * with ScrollTrigger animations.
 *
 * Exposes the Lenis instance via LenisContext so child components
 * (e.g. NavBar) can call lenis.scrollTo() for smooth navigation.
 *
 * Fixed (audit M7): Added ScrollTrigger.refresh() after Lenis initialization
 * to ensure pin spacer height calculations are correct.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) {
      refreshAfterLayoutSettles();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Connect Lenis scroll updates to GSAP's ticker
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);

    // Refresh ScrollTrigger after Lenis is fully initialized
    // so pin spacer calculations account for smooth scroll behavior (audit M7)
    refreshAfterLayoutSettles();

    return () => {
      gsap.ticker.remove(tickHandler);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, { dependencies: [prefersReducedMotion] });

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
