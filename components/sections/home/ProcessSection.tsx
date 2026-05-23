'use client';

import React, { useRef } from 'react';

import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: '01',
    title: 'Consultation',
    desc: 'Understanding your lifestyle, space, and automation goals through an in-depth evaluation.'
  },
  {
    id: '02',
    title: 'Design & Planning',
    desc: 'Crafting tailored Bill of Quantities, architectural drawings, and detailed wiring schematics.'
  },
  {
    id: '03',
    title: 'Installation',
    desc: 'Precision on-site installation of all premium automation hardware by our expert technicians.'
  },
  {
    id: '04',
    title: 'Integration',
    desc: 'Custom programming of scenes, schedules, and rigorous testing of every system for flawless operation.'
  },
  {
    id: '05',
    title: 'Support',
    desc: 'A complete walkthrough of your intelligent space, followed by ongoing post-handover support.'
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray('.process-card') as HTMLElement[];

      // Initial states: move subsequent cards to the right and make them transparent
      gsap.set(cards.slice(1), {
        xPercent: 120,
        yPercent: 0,
        scale: 0.95,
        opacity: 0,
        filter: 'blur(10px)'
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      cards.forEach((card, i) => {
        if (i === 0) return; // First card is already visible

        const previousCards = cards.slice(0, i);

        // 1. Bring current card in from the right with strong easing
        tl.to(card, {
          xPercent: 0,
          yPercent: 0,
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          ease: "power3.inOut"
        }, i);

        // 2. Push previous cards to the left smoothly
        tl.to(previousCards, {
          scale: (index) => 1 - ((i - index) * 0.05),
          xPercent: (index) => -((i - index) * 6),
          yPercent: 0,
          opacity: (index) => 1 - ((i - index) * 0.2),
          filter: (index) => `blur(${(i - index) * 1.5}px)`,
          ease: "power3.inOut"
        }, i);
      });

      scheduleScrollRefresh();
    });

    // Mobile specific: simple fade up
    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray('.process-card-mobile') as HTMLElement[];
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          x: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative z-30 bg-[#fcfcfc] border-t border-black/[0.03] overflow-hidden"
      id="process"
    >
      {/* Desktop Layout: Minimal Stacking Cards */}
      <div className="hidden lg:flex flex-col items-center justify-center h-screen relative px-8 py-12">

        <div className="absolute top-12 left-16 z-50 pointer-events-none">
          <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-black/40">The Journey</h2>
        </div>

        <div ref={containerRef} className="relative w-full max-w-4xl h-[45vh] min-h-[400px] mx-auto perspective-1000 mt-8">
          {steps.map((step, index) => (
            <div
              key={`desk-${step.id}`}
              className="process-card absolute top-0 left-0 w-full h-full rounded-[40px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.06)] bg-white border border-black/[0.04] flex transform-origin-top will-change-transform"
              style={{ zIndex: index }}
            >
              {/* Full Width Text Content */}
              <div className="w-full h-full p-16 md:p-24 flex flex-col justify-center items-center text-center relative bg-white">

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-black leading-[1.2] mb-6">
                  {step.title}
                </h3>

                <p className="text-xl text-black/50 leading-relaxed max-w-2xl mx-auto">
                  {step.desc}
                </p>

                {/* Subtle giant background number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                  <span className="text-[300px] md:text-[400px] font-medium text-accent/5 tracking-tighter leading-none">
                    {step.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Layout: Clean Vertical Flow */}
      <div className="lg:hidden px-6 py-24 flex flex-col gap-8 relative">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-black/20" />
            <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-black/40">The Journey</h2>
          </div>
          <p className="text-black/50 text-lg">A guided intelligent process from consultation to completion.</p>
        </div>

        <div className="flex flex-col gap-12">
          {steps.map((step) => (
            <div
              key={`mob-${step.id}`}
              className="process-card-mobile flex flex-col gap-6 p-8 rounded-3xl bg-white shadow-lg border border-black/[0.04] relative overflow-hidden"
            >
              {/* Subtle giant background number */}
              <div className="absolute -right-4 -bottom-4 pointer-events-none select-none z-0">
                <span className="text-[120px] font-medium text-accent/5 tracking-tighter leading-none">
                  {step.id}
                </span>
              </div>

              {/* Text Container */}
              <div className="flex flex-col relative z-10">


                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-black mb-4 leading-[1.2]">
                  {step.title}
                </h3>

                <p className="text-lg text-black/50 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
