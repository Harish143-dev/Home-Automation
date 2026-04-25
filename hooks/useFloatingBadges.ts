'use client';

import { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EASE } from '../lib/animation.config';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Custom hook that encapsulates all GSAP animation logic for the
 * Awards & Recognition floating 3D badge system.
 *
 * Handles:
 *  1. Header reveal on scroll
 *  2. Staggered badge entrance
 *  3. Looping float animation (yoyo)
 *  4. Scroll-driven parallax per depth layer
 *  5. Mouse-driven perspective tilt + per-layer shift
 */
export function useFloatingBadges(
  containerRef: RefObject<HTMLDivElement | null>,
  isReady: boolean,
  isMobile: boolean,
  prefersReducedMotion: boolean,
) {
  useGSAP(() => {
    if (!isReady || isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    /* ── Scoped queries ── */
    const scene = container.querySelector('.aw-scene') as HTMLElement | null;
    const badges = gsap.utils.toArray('.aw-badge', container) as HTMLElement[];
    const floats = gsap.utils.toArray('.aw-badge-float', container) as HTMLElement[];
    const headerEls = gsap.utils.toArray('.aw-header-el', container) as HTMLElement[];
    const front = gsap.utils.toArray('.aw-layer-front', container) as HTMLElement[];
    const mid = gsap.utils.toArray('.aw-layer-mid', container) as HTMLElement[];
    const back = gsap.utils.toArray('.aw-layer-back', container) as HTMLElement[];

    if (badges.length === 0) return;

    /* ───────────────────────────────────────────────
     * 1. Header reveal
     * ─────────────────────────────────────────────── */
    if (headerEls.length > 0) {
      gsap.fromTo(
        headerEls,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: EASE.reveal,
          scrollTrigger: { trigger: container, start: 'top 70%' },
        },
      );
    }

    /* ───────────────────────────────────────────────
     * 2. Staggered badge entrance
     * ─────────────────────────────────────────────── */
    gsap.fromTo(
      badges,
      { opacity: 0, scale: 0.55, y: 80 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.4,
        ease: EASE.reveal,
        scrollTrigger: { trigger: container, start: 'top 60%' },
      },
    );

    /* Skip motion-heavy effects when user prefers reduced motion */
    if (prefersReducedMotion) return;

    /* ───────────────────────────────────────────────
     * 3. Looping float (applied to inner wrapper so
     *    it doesn't conflict with scroll y offsets)
     * ─────────────────────────────────────────────── */
    floats.forEach((el, i) => {
      gsap.to(el, {
        y: `+=${8 + (i % 3) * 6}`,
        duration: 3 + (i % 4) * 0.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.35,
      });
    });

    /* ───────────────────────────────────────────────
     * 4. Scroll-driven parallax per depth layer
     * ─────────────────────────────────────────────── */
    const parallaxCfg = { trigger: container, start: 'top bottom', end: 'bottom top', scrub: 1.2 };

    if (front.length) {
      gsap.to(front, { yPercent: -20, rotateZ: 1.5, scrollTrigger: parallaxCfg });
    }
    if (mid.length) {
      gsap.to(mid, { yPercent: -10, rotateZ: -1, scrollTrigger: { ...parallaxCfg } });
    }
    if (back.length) {
      gsap.to(back, { yPercent: -4, scrollTrigger: { ...parallaxCfg } });
    }

    /* ───────────────────────────────────────────────
     * 5. Mouse-driven perspective tilt + parallax
     * ─────────────────────────────────────────────── */
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 → 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      if (scene) {
        gsap.to(scene, { rotateX: -ny * 5, rotateY: nx * 5, duration: 0.9, ease: 'power2.out' });
      }
      gsap.to(front, { x: nx * 24, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(mid,   { x: nx * 11, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(back,  { x: nx * 4,  duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
    };

    const handleMouseLeave = () => {
      if (scene) gsap.to(scene, { rotateX: 0, rotateY: 0, duration: 1, ease: 'power2.out' });
      gsap.to([...front, ...mid, ...back], { x: 0, duration: 1, ease: 'power2.out' });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef, dependencies: [isReady, isMobile, prefersReducedMotion] });
}
