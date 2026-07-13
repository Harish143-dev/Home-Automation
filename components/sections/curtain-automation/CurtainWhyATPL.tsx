'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const STATS = [
  { target: 24, label: 'Years of automation expertise', prefix: 'Over' },
  { target: 1000, label: 'Projects successfully delivered', prefix: 'Over' },
  { target: 650, label: 'Residences automated', prefix: 'Over' },
  { target: 250, label: 'Hospitality projects completed', prefix: 'Over' },
  { target: 100, label: 'Commercial projects delivered', prefix: 'Over' },
  { target: 3, label: 'Experience Centres in Delhi, Mumbai & Bangalore', prefix: '' }
];

export function CurtainWhyATPL() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    
    // Header Reveal
    gsap.fromTo('.why-header-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards Reveal
    gsap.fromTo('.why-stat-card',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 80%',
        }
      }
    );

    // Number Counting Effect
    gsap.utils.toArray('.why-stat-card').forEach((card: any) => {
      const numEl = card.querySelector('.why-stat-number');
      if (numEl) {
        const target = parseInt(numEl.getAttribute('data-target') || '0', 10);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2.5,
          ease: "power3.out",
          onUpdate: () => {
            numEl.innerText = Math.floor(counter.val).toLocaleString();
          },
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        });
      }
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="relative w-full bg-background py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* Left Side: Sticky Header & Context */}
        <div ref={leftColRef} className="w-full lg:w-1/3 flex flex-col items-start lg:sticky lg:top-[30vh] self-start">
          <span className="why-header-anim tracking-widest text-sm md:text-base text-accent mb-4 block">
            The ATPL Legacy
          </span>
          <h2 className="why-header-anim text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground text-balance mb-6">
            Why Homeowners Choose ATPL
          </h2>
          <p className="why-header-anim text-sm md:text-base font-light tracking-wide text-muted leading-relaxed text-balance">
            For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by luxury homeowners across India, we create smart homes that are reliable and built for the future.
          </p>
        </div>

        {/* Right Side: Compact Stats Grid */}
        <div ref={rightColRef} className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className="why-stat-card bg-[#fcfcfc] rounded-2xl p-8 border border-black/5 flex flex-col items-start hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {stat.prefix && (
                <span className="text-xs md:text-sm tracking-widest text-muted mb-2 block">
                  {stat.prefix}
                </span>
              )}
              {!stat.prefix && (
                <span className="text-xs md:text-sm tracking-widest text-transparent mb-2 block select-none">
                  Spacer
                </span>
              )}
              
              <div className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-4 leading-none tabular-nums flex items-baseline">
                <span className="why-stat-number" data-target={stat.target}>0</span>
              </div>
              
              <span className="text-sm md:text-base font-light tracking-wide text-muted leading-relaxed text-balance">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
