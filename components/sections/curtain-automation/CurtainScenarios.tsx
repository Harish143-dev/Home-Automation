'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Check } from 'lucide-react';

const SCENARIOS = [
  {
    title: 'Morning',
    image: '/images/scenario_morning.png',
    items: [
      'Shades open automatically',
      'Natural daylight enters the room',
      'Indoor temperature adjusts'
    ]
  },
  {
    title: 'Dinner',
    image: '/images/scenario_dinner.png',
    items: [
      'Shades adjust for added privacy',
      'Lighting changes to dining levels'
    ]
  },
  {
    title: 'TV Mode',
    image: '/images/scenario_tv.png',
    items: [
      'Shades close',
      'Lights dim',
      'Entertainment system starts'
    ]
  },
  {
    title: 'Goodbye',
    image: '/images/scenario_goodbye.png',
    items: [
      'Shades close',
      'Lights turn off',
      'HVAC switches to energy-saving mode'
    ]
  }
];

export function CurtainScenarios() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    
    // Header Animation
    gsap.fromTo('.scenario-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Modern Stacking Animation
    const cards = gsap.utils.toArray('.scenario-stack-card') as HTMLElement[];
    
    cards.forEach((card: HTMLElement, index: number) => {
      // We animate the scaling of the card as the NEXT card scrolls up over it
      if (index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          y: -20, // push it slightly up
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          }
        });
      }
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#fcfcfc] py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <span className="scenario-header tracking-widest text-sm md:text-base text-accent mb-4 block">
            Seamless Integration
          </span>
          <h2 className="scenario-header text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground text-balance mb-6">
            Experience Smart Living Scenarios
          </h2>
          <p className="scenario-header text-sm sm:text-base md:text-lg font-light tracking-wide text-muted leading-relaxed text-balance">
            Watch your home effortlessly adapt to your lifestyle with single-touch scenes that coordinate your shades, lighting, and climate.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="scenario-stack-container relative flex flex-col gap-12 lg:gap-24 pb-24">
          {SCENARIOS.map((scenario, idx) => (
            <div 
              key={idx}
              className="scenario-stack-card sticky top-[15vh] lg:top-[20vh] w-full max-w-5xl mx-auto min-h-[500px] lg:h-[60vh] bg-background rounded-[2rem] shadow-xl border border-black/10 flex flex-col lg:flex-row overflow-hidden will-change-transform"
              style={{ zIndex: idx }}
            >
              {/* Image Side (Left) */}
              <div className="relative w-full lg:w-1/2 h-64 lg:h-full bg-black/5 shrink-0 overflow-hidden">
                <NextImage 
                  src={scenario.image}
                  alt={scenario.title}
                  fill
                  className="object-cover"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/5" />
              </div>
              
              {/* Content Side (Right) */}
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-16 w-full lg:w-1/2 h-full bg-background">
                <div className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center mb-8 shrink-0">
                  <span className="text-accent font-medium text-lg">{idx + 1}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-light tracking-wide leading-[1.2] text-foreground mb-8">
                  {scenario.title}
                </h3>
                
                <ul className="flex flex-col gap-5 w-full">
                  {scenario.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2} />
                      </div>
                      <span className="text-base md:text-lg font-light text-foreground/80 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
