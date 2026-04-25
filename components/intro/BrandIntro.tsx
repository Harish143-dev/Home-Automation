'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(useGSAP);

export function BrandIntro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const mark = markRef.current;
    const title = titleRef.current;
    const divider = dividerRef.current;
    const subline = sublineRef.current;

    if (!overlay || !panel || !mark || !title || !divider || !subline) {
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

    gsap.set([mark, title, subline], { opacity: 0, y: 18 });
    gsap.set(divider, { scaleX: 0, transformOrigin: 'center center' });

    const timeline = gsap.timeline();

    timeline
      .to(mark, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: 'power2.out',
      })
      .to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.15'
      )
      .to(
        divider,
        {
          scaleX: 1,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        '-=0.18'
      )
      .to(
        subline,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
        },
        '-=0.18'
      )
      .to(panel, {
        opacity: 0,
        duration: 0.35,
        delay: 0.3,
        ease: 'power2.inOut',
      })
      .set(overlay, { display: 'none', pointerEvents: 'none' })
      .call(() => {
        clearTimeout(safetyTimer);
        document.body.style.overflow = '';
      });

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = '';
    };
  }, { scope: overlayRef, dependencies: [prefersReducedMotion] });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        className="flex h-full w-full flex-col items-center justify-center bg-white px-6 text-center text-foreground"
      >
        <div
          ref={markRef}
          className="mb-4 text-[12px] font-semibold uppercase tracking-[0.32em] sm:tracking-[0.42em] text-accent"
        >
          AT
        </div>
        <h1
          ref={titleRef}
          className="max-w-[12ch] text-center font-[var(--font-display)] text-[clamp(2rem,4.6vw,4.4rem)] font-semibold tracking-tight text-foreground"
        >
          Intelligent Automation
        </h1>
        <div
          ref={dividerRef}
          className="my-5 h-px w-24 bg-accent/30"
        />
        <p
          ref={sublineRef}
          className="max-w-[calc(100vw-3rem)] sm:max-w-[28rem] text-[11px] sm:text-[12px] font-medium uppercase tracking-[0.14em] sm:tracking-[0.28em] text-muted"
        >
          Quiet systems. Clear living.
        </p>
      </div>
    </div>
  );
}
