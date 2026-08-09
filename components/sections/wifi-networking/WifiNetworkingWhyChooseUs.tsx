'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const STATS = [
  { prefix: 'Over', value: '24', label: 'Years of automation\nexpertise' },
  { prefix: 'Over', value: '1,000', label: 'Projects successfully\ndelivered' },
  { prefix: 'Over', value: '650', label: 'Residences\nautomated' },
  { prefix: 'Over', value: '250', label: 'Hospitality projects\ncompleted' },
  { prefix: 'Over', value: '100', label: 'Commercial projects\ndelivered' },
  { prefix: '', value: '3', label: 'Experience Centres\nin Delhi, Mumbai\n& Bangalore' },
];

export function WifiNetworkingWhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Fade in text
    gsap.fromTo(textRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Stagger fade in stats
    statsRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.stats-container',
            start: "top 85%",
          }
        }
      );
    });

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative gap-16 md:gap-24">

        {/* Text Section */}
        <div ref={textRef} className="flex flex-col items-center gap-8 max-w-4xl">
          <h2 className="font-light leading-[1.2] tracking-wide text-3xl sm:text-4xl lg:text-5xl text-foreground text-balance">
            Why Choose Anusha Technovision
          </h2>

          <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance">
            For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by luxury homeowners across India, we create smart homes that are reliable and built for the future.
          </p>
        </div>

        {/* Stats Bento Grid (4-column base layout) */}
        <div className="stats-container w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-4">

          {/* Card 1: 24 Years (Large, spans 1 col on desktop) */}
          <div
            ref={el => { statsRefs.current[0] = el; }}
            className="bg-panel rounded-[2rem] p-8 flex flex-col justify-center border border-black/5 group hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500"
          >
            <span className="tracking-[0.2em] text-xs md:text-sm text-accent uppercase mb-4 min-h-[20px]">
              {STATS[0].prefix}
            </span>
            <span className="text-5xl md:text-6xl font-light tracking-tighter text-foreground mb-4">
              {STATS[0].value}
            </span>
            <span className="text-sm md:text-base font-light text-muted-foreground whitespace-pre-line leading-relaxed">
              {STATS[0].label}
            </span>
          </div>

          {/* Card 2: 1,000 Projects (Large, spans 3 cols on desktop) */}
          <div
            ref={el => { statsRefs.current[1] = el; }}
            className="lg:col-span-3 bg-accent/[0.03] rounded-[2rem] p-8 md:p-12 flex flex-col justify-center border border-accent/10 group hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
          >
            {/* Subtle background element */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-150" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 h-full">
              <div className="flex flex-col justify-center">
                <span className="tracking-[0.2em] text-xs md:text-sm text-accent uppercase mb-4">
                  {STATS[1].prefix}
                </span>
                <span className="text-5xl md:text-7xl leading-none font-light tracking-tighter text-foreground mb-4">
                  {STATS[1].value}
                </span>
              </div>
              <span className="text-base md:text-xl font-light text-foreground/80 max-w-[200px] leading-relaxed">
                {STATS[1].label}
              </span>
            </div>
          </div>

          {/* Bottom 4 Cards: Spanning 1 col each */}
          {STATS.slice(2).map((stat, i) => (
            <div
              key={i + 2}
              ref={el => { statsRefs.current[i + 2] = el; }}
              className="bg-white rounded-[2rem] p-6 md:p-8 flex flex-col border border-black/5 group hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500"
            >
              <span className="tracking-[0.2em] text-xs md:text-sm text-muted-foreground uppercase mb-4 min-h-[20px]">
                {stat.prefix}
              </span>
              <span className="text-4xl md:text-5xl font-light tracking-tighter text-foreground mb-4 group-hover:text-accent transition-colors duration-500">
                {stat.value}
              </span>
              <span className="text-sm font-light text-muted-foreground whitespace-pre-line leading-relaxed mt-auto">
                {stat.label}
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
