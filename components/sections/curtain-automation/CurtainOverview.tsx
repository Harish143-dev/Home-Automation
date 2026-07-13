'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Check } from 'lucide-react';

const BULLETS = [
  'Open and close individual or multiple shades with a single touch',
  'Create schedules for morning, evening, and bedtime routines',
  'Operate shades using a keypad, mobile app, or voice assistant',
  'Integrate with lighting, HVAC, and other smart home systems'
];

export function CurtainOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    
    // Header animation
    gsap.fromTo('.overview-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Content animation
    gsap.fromTo('.overview-content',
      { opacity: 0, x: 30 },
      {
        opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.overview-grid',
          start: 'top 75%',
        }
      }
    );
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="relative w-full bg-background pt-12 md:pt-16 pb-16 sm:pb-24 md:pb-32 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-16 lg:gap-24">
        
        {/* Top Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <span className="overview-header tracking-widest text-sm md:text-base text-accent mb-4 block">
            The AT Smart Living Standard
          </span>
          <h2 className="overview-header text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground text-balance mb-6">
            Why Homeowners Choose Motorized Shades & Curtain Automation
          </h2>
          <p className="overview-header text-sm md:text-base font-light tracking-wide text-muted leading-relaxed text-balance max-w-3xl">
            Manage natural light, privacy, and daily routines with motorized shades that integrate with your smart home. Control every window treatment using a keypad, mobile app, voice assistant, or automated schedules.
          </p>
        </div>

        {/* Bottom Split Content */}
        <div className="overview-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <div className="overview-content relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm border border-black/5 bg-black/5">
            <NextImage 
              src="/images/curtain_overview.png" 
              alt="Motorized shades overview"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Side */}
          <div className="flex flex-col items-start">
            <h3 className="overview-content text-2xl md:text-3xl font-light tracking-wide leading-[1.2] text-foreground mb-6">
              Convenient Control for Everyday Living
            </h3>
            <p className="overview-content text-sm md:text-base font-light tracking-wide text-muted leading-relaxed mb-8">
              Motorized shades simplify everyday living by eliminating manual operation. Open or close individual or multiple shades using a smart keypad, mobile app, voice assistant, or scheduled scenes. They can also adjust automatically throughout the day based on your preferred routines or sunlight conditions.
            </p>
            
            <ul className="flex flex-col gap-4 w-full">
              {BULLETS.map((bullet, idx) => (
                <li key={idx} className="overview-content flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
                  </div>
                  <span className="text-sm md:text-base font-light text-foreground/80 leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

      </div>
    </section>
  );
}
