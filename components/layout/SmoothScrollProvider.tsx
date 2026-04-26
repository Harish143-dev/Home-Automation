'use client';

import React, { useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsapSetup';
import { refreshAfterLayoutSettles } from '../../lib/scrollRefresh';

/**
 * Lenis smooth scroll provider.
 * Connects Lenis to GSAP's ticker for seamless integration
 * with ScrollTrigger animations.
 *
 * Fixed (audit M7): Added ScrollTrigger.refresh() after Lenis initialization
 * to ensure pin spacer height calculations are correct.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
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
    };
  }, { dependencies: [prefersReducedMotion] });

  return <>{children}</>;
}
