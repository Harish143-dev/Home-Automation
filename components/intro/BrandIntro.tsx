'use client';

import React, { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '../../lib/gsapSetup';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function BrandIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const title = titleRef.current;

    if (!overlay || !panel || !title) {
      return;
    }

    if (prefersReducedMotion) {
      gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
      return;
    }

    document.body.style.overflow = 'hidden';

    // Safety timeout: unlock scroll even if timeline doesn't complete (audit m6)
    const safetyTimer = setTimeout(() => {
      document.body.style.overflow = '';
    }, 5000);

    const split = SplitText.create(title, {
      type: 'words,chars',
      mask: 'words',
      aria: 'auto',
      wordsClass: 'intro-word',
      charsClass: 'intro-char',
    });

    gsap.set(title, { opacity: 1 });
    gsap.set(split.chars, { opacity: 0, yPercent: 105, rotateX: -18 });

    const timeline = gsap.timeline();

    timeline
      .to(split.chars, {
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 0.85,
        stagger: 0.035,
        ease: 'expo.out',
      })
      .to(panel, {
        opacity: 0,
        scale: 1.01,
        duration: 0.55,
        delay: 0.25,
        ease: 'power2.inOut',
      })
      .set(overlay, { display: 'none', pointerEvents: 'none' })
      .call(() => {
        clearTimeout(safetyTimer);
        document.body.style.overflow = '';
      });

    return () => {
      clearTimeout(safetyTimer);
      split.revert();
      document.body.style.overflow = '';
    };
  }, { scope: overlayRef, dependencies: [prefersReducedMotion] });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        className="flex h-full w-full items-center justify-center bg-background px-6 text-center text-foreground"
      >
        <h1
          ref={titleRef}
          className="max-w-[11ch] text-center font-[var(--font-display)] text-[clamp(3.2rem,8.5vw,7.6rem)] font-semibold leading-[0.9] tracking-tight text-foreground"
        >
          ATPL Automation
        </h1>
      </div>
    </div>
  );
}
