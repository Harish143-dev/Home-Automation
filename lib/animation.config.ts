/**
 * Centralized animation configuration.
 * All GSAP easing, durations, and stagger values should reference
 * these tokens to maintain visual consistency across the site.
 */

export const EASE = {
  reveal: 'power3.out',
  smooth: 'power2.inOut',
  snap: 'expo.out',
  none: 'none',
} as const;

export const DURATION = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  scrub: 1,
} as const;

export const STAGGER = {
  tight: 0.05,
  normal: 0.1,
  wide: 0.15,
} as const;
