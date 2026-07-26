'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Smartphone, Sun, Shield, Leaf, SunDim, Network } from 'lucide-react';

const BENEFITS = [
  {
    title: 'Convenient Control',
    description: 'Open or close individual curtains or multiple rooms using a keypad, mobile app, remote, or voice command.',
    icon: Smartphone,
  },
  {
    title: 'Daylight Management',
    description: 'Adjust shades automatically throughout the day based on sunlight or scheduled timings.',
    icon: Sun,
  },
  {
    title: 'Privacy Control',
    description: 'Schedule curtains to close in the evening or activate them as part of "Good Night" or "Away" scenes.',
    icon: Shield,
  },
  {
    title: 'Energy Management',
    description: 'Reduce direct sunlight during warmer hours and help retain indoor warmth during cooler months.',
    icon: Leaf,
  },
  {
    title: 'UV Protection',
    description: 'Limit direct UV exposure to help protect flooring, furniture, artwork, and fabrics from fading.',
    icon: SunDim,
  },
  {
    title: 'Smart Home Integration',
    description: 'Integrate curtains with lighting, HVAC, voice assistants, and other home automation systems to create coordinated scenes.',
    icon: Network,
  },
];

export function CurtainBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Header animation
    gsap.fromTo('.benefit-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards animation
    gsap.fromTo('.benefit-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.benefits-grid',
          start: 'top 85%',
        }
      }
    );
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto">

        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base benefit-header text-accent mb-4 block">
            The Advantage
          </span>
          <h2 className="benefit-header text-foreground text-balance">
            Why Homeowners Choose Motorized Curtains
          </h2>
        </div>

        <div className="benefits-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="benefit-card bg-background p-8 md:p-10 rounded-2xl md:rounded-[2rem] border border-border shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center mb-2">
                <benefit.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              <h4 className="text-foreground">
                {benefit.title}
              </h4>
              <p className="text-sm sm:text-base md:text-lg font-light text-muted leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
