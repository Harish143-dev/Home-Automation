'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP, SplitText } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE, DURATION, STAGGER } from '@/lib/animation.config';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';

export function CalculatorHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !headlineRef.current) return;

    const split = new SplitText(headlineRef.current, {
      type: 'lines,words',
      linesClass: 'overflow-hidden',
    });

    const tl = gsap.timeline({
      defaults: { ease: EASE.reveal },
    });

    tl.from(split.words, {
      yPercent: 120,
      opacity: 0,
      duration: DURATION.slow,
      stagger: STAGGER.tight,
      ease: EASE.premium,
      delay: 0.1,
    })
      .from(
        subheadRef.current,
        {
          y: 30,
          opacity: 0,
          duration: DURATION.normal,
          ease: EASE.reveal,
        },
        '-=0.8'
      )
      .from(
        supportRef.current,
        {
          y: 20,
          opacity: 0,
          duration: DURATION.normal,
          ease: EASE.reveal,
        },
        '-=0.6'
      );

    scheduleScrollRefresh();

    return () => split.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-background overflow-hidden border-b border-border"
    >
      {/* Subtle organic ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1100px] h-[450px] bg-accent/[0.035] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#3B4434]/[0.03] rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* H1 Heading */}
          <h1
            ref={headlineRef}
            className="text-foreground mb-6"
          >
            Smart Automation Calculators
          </h1>

          {/* Subheading from spec */}
          <p
            ref={subheadRef}
            className="font-light text-base sm:text-lg md:text-xl leading-relaxed text-muted max-w-3xl mb-4"
          >
            Explore our interactive calculators to estimate the potential energy savings, cost savings and efficiency benefits of intelligent automation for your home, office or hospitality project.
          </p>

          {/* Supporting Text from spec */}
          <p
            ref={supportRef}
            className="font-light text-sm sm:text-base leading-relaxed text-muted/80 max-w-2xl"
          >
            Choose a calculator based on your project type and get an indicative estimate in just a few minutes.
          </p>
        </div>
      </div>
    </section>
  );
}
