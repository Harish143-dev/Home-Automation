/**
 * Centralized animation configuration.
 * All GSAP easing, durations, and stagger values should reference
 * these tokens to maintain visual consistency across the site.
 */

export const EASE = {
  standard: 'power2.out',
  reveal: 'power3.out',
  premium: 'expo.out',
  smooth: 'power2.inOut',
  snap: 'expo.out',
  pointer: 'power2.out',
  none: 'none',
} as const;

export const DURATION = {
  instant: 0.2,
  fast: 0.4,
  medium: 0.6,
  normal: 0.8,
  reveal: 0.9,
  slow: 1.2,
  scrub: 1,
  pointer: 0.65,
} as const;

export const STAGGER = {
  tight: 0.05,
  reveal: 0.08,
  normal: 0.1,
  wide: 0.15,
} as const;

export const SCROLL = {
  scrub: 0.8,
  scrubSlow: 1.1,
  anticipatePin: 1,
  heroDistance: '+=300%',
  sectionDistance: '+=280%',
} as const;
