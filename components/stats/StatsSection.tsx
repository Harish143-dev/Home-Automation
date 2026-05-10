'use client';

import React, { useRef } from 'react';
import { DURATION, EASE } from '../../lib/animation.config';
import { gsap, useGSAP } from '../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../lib/scrollRefresh';

const STATS = [
  { value: '20+', label: 'Years of Experience' },
  { value: '1000+', label: 'Projects Delivered' },
  { value: '50+', label: 'Cities Covered' },
  { value: '5', label: 'Experience Centers' },
  { value: '200+', label: 'Premium Clients' }
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {

    // 1. Initial fade-in for the left sticky column
    gsap.fromTo(leftColRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    );

    // 2. Individual reveal triggers for each vertical stat
    statsRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el, {
        opacity: 0,
        y: 60
      }, {
        opacity: 1,
        y: 0,
        duration: DURATION.slow,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: el,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        }
      });
    });

    scheduleScrollRefresh();

  }, { scope: sectionRef, dependencies: [] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-background py-20 sm:py-28 md:py-32 lg:py-48 px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20 lg:gap-32 items-start">

        {/* Left Intro Panel (Sticky on desktop) */}
        <div ref={leftColRef} className="w-full md:w-5/12 md:sticky md:top-48 pb-6 md:pb-0 opacity-0">
          <h2 className="text-[2rem] sm:text-[2.5rem] md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-foreground mb-4 sm:mb-6">
            Proven <br />Global Excellence
          </h2>
          <p className="text-muted text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-sm">
            We don&apos;t just build smart spaces. We define the benchmark for automation, designing infrastructures that adapt seamlessly to your lifestyle.
          </p>
        </div>

        {/* Right Stats Vertical Stack (Native Scrolling) */}
        <div className="w-full md:w-7/12 flex flex-col gap-12 sm:gap-16 md:gap-24 lg:gap-40 border-l border-black/8 pl-6 sm:pl-8 md:pl-16">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={el => { statsRefs.current[i] = el; }}
              className="flex flex-col border-b border-black/5 pb-6 sm:pb-8 last:border-b-0 last:pb-0 group cursor-default opacity-0"
            >
              <div className="font-semibold tracking-tighter leading-none text-foreground mb-2 sm:mb-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                {stat.value}
              </div>
              <div className="text-muted font-light tracking-wide text-base sm:text-lg md:text-xl transition-colors duration-500 group-hover:text-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
