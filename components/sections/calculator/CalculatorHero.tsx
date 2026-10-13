'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, Calculator, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap, useGSAP, SplitText } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE, DURATION, STAGGER } from '@/lib/animation.config';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';

export function CalculatorHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !headlineRef.current) return;

    const split = new SplitText(headlineRef.current, {
      type: 'lines,words',
      linesClass: 'overflow-hidden'
    });

    const tl = gsap.timeline({
      defaults: { ease: EASE.reveal }
    });

    tl.from(split.words, {
      yPercent: 120,
      opacity: 0,
      duration: DURATION.slow,
      stagger: STAGGER.tight,
      ease: EASE.premium,
      delay: 0.1,
    })
    .from(subheadRef.current, {
      y: 30,
      opacity: 0,
      duration: DURATION.normal,
      ease: EASE.reveal,
    }, '-=0.8')
    .from(supportRef.current, {
      y: 20,
      opacity: 0,
      duration: DURATION.normal,
      ease: EASE.reveal,
    }, '-=0.6')
    .from(actionsRef.current, {
      y: 20,
      opacity: 0,
      duration: DURATION.normal,
      ease: EASE.reveal,
    }, '-=0.5')
    .from(badgesRef.current, {
      y: 20,
      opacity: 0,
      duration: DURATION.normal,
      ease: EASE.reveal,
    }, '-=0.5');

    scheduleScrollRefresh();

    return () => split.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24 bg-background overflow-hidden border-b border-border"
    >
      {/* Subtle organic ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[1100px] h-[450px] bg-accent/[0.035] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#3B4434]/[0.03] rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Eyebrow / Section Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.03] border border-border/80 mb-6 backdrop-blur-sm">
            <Calculator className="w-3.5 h-3.5 text-accent" />
            <span className="tracking-[0.3em] text-xs sm:text-sm uppercase text-accent font-light">
              Interactive Energy & Cost Benchmarks
            </span>
          </div>

          {/* H1 Heading - Strictly adhering to DESIGN_SYSTEM.md */}
          <h1
            ref={headlineRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.15] tracking-wide text-foreground mb-6"
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
            className="font-light text-sm sm:text-base leading-relaxed text-muted/80 max-w-2xl mb-10"
          >
            Choose a calculator based on your project type and get an indicative estimate in just a few minutes.
          </p>

          {/* Action CTAs */}
          <div
            ref={actionsRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14"
          >
            <button
              onClick={() => handleScrollTo('choose-calculator')}
              className="w-full sm:w-auto"
            >
              <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                Choose Your Calculator
              </Button>
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                How It Works in 3 Steps
              </Button>
            </button>
          </div>

          {/* Highlights / Badges */}
          <div
            ref={badgesRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full pt-8 border-t border-border/70"
          >
            <div className="flex flex-col items-center text-center p-3">
              <span className="text-2xl sm:text-3xl font-light text-accent mb-1 tracking-wide">Up to 40%</span>
              <span className="text-xs sm:text-sm text-muted font-light">Energy Consumption Savings</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <span className="text-2xl sm:text-3xl font-light text-accent mb-1 tracking-wide">2.0 – 3.5 Yrs</span>
              <span className="text-xs sm:text-sm text-muted font-light">Typical Capital Payback</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <span className="text-2xl sm:text-3xl font-light text-accent mb-1 tracking-wide">25+ Years</span>
              <span className="text-xs sm:text-sm text-muted font-light">Proven Engineering Data</span>
            </div>
            <div className="flex flex-col items-center text-center p-3">
              <span className="text-2xl sm:text-3xl font-light text-accent mb-1 tracking-wide">LEED / IGBC</span>
              <span className="text-xs sm:text-sm text-muted font-light">Green Building Aligned</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
