'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { DURATION, EASE } from '../../../lib/animation.config';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';

const STATS = [
  { prefix: 'Over', value: '24', label: 'Years of Industry Experience' },
  { prefix: 'Over', value: '1000+', label: 'Projects Completed' },
  { prefix: 'Over', value: '15', label: 'Cities with Sales & Service Presence' },
  { prefix: '', value: '3', label: 'Experience Centres\nDelhi • Mumbai • Bengaluru' },
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
      className="relative w-full bg-background py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20 lg:gap-32 items-start">

        <div ref={leftColRef} className="w-full md:w-1/2 md:sticky md:top-[20vh] pb-6 md:pb-0 opacity-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground mb-6 sm:mb-8">
            The Architecture of Intelligence
          </h2>
          <p className="text-muted text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg mb-8 sm:mb-10">
            We integrate advanced lighting, climate, and media systems into India’s finest private residences, hotels and offices, preserving architectural integrity while perfecting daily living. In the last 25 years, we have helped 700 architects, 200 hoteliers and 100 MEPs, across 23 cities PAN India. We’ve completed over 1,023 projects worth 7,217cr. We’ve saved over 15.5 million kWh of energy. We distribute products from over 30 global manufacturers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/ecosystem">
              <Button variant="accent" size="lg" shape="full" className="w-full sm:w-auto">
                Explore Our Ecosystem
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" shape="full" className="w-full sm:w-auto">
                View Projects
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Stats Vertical Stack (Native Scrolling) */}
        <div className="w-full md:w-1/2 flex flex-col gap-16 sm:gap-20 md:gap-32 lg:gap-40 border-l border-black/5 pl-6 sm:pl-8 md:pl-16 pb-20 md:pb-40 lg:pb-[30vh]">
          {STATS.map((stat, i) => (
            <div
              key={i}
              ref={el => { statsRefs.current[i] = el; }}
              className="flex flex-col border-b border-black/5 pb-6 sm:pb-8 last:border-b-0 last:pb-0 group cursor-default opacity-0"
            >
              {stat.prefix && <span className="text-sm md:text-base tracking-widest text-accent font-normal mt-5 mb-1 sm:mb-2 block">{stat.prefix}</span>}
              <div className="font-light tracking-wide leading-none text-foreground mb-3 sm:mb-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 text-4xl sm:text-5xl md:text-6xl">
                <span>{stat.value}</span>
              </div>
              <div className="text-muted font-light tracking-wide text-sm sm:text-base md:text-lg transition-colors duration-500 group-hover:text-foreground whitespace-pre-line">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
