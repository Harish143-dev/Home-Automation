'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { ArrowDown } from 'lucide-react';

const STEPS = ["Visitor Arrives","Lighting Welcomes Visitors","Digital Signage Displays Information","Background Audio Starts","HVAC Adjusts Automatically","Security Monitors Activity","Central Dashboard Tracks Everything"
];

export function PublicAreasProcess() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.process-step');
    
    cards.forEach((card: any, i) => {
      gsap.fromTo(card,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease:"power3.out",
          scrollTrigger: {
            trigger: card,
            start:"top 85%",
          }
        }
      );
    });

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-20 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-5xl mx-auto flex flex-col items-center relative">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-16 lg:mb-24">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
            Seamless Orchestration
          </span>
          <h2 className="text-foreground text-balance">
            How Intelligent Public Area Automation Works
          </h2>
        </div>

        {/* Timeline */}
        <div className="w-full max-w-2xl relative flex flex-col items-start mx-auto">
          {/* Vertical connecting line */}
          <div className="absolute top-4 bottom-4 left-[23px] w-[1px] bg-black/10" />

          {STEPS.map((step, idx) => (
            <div key={idx} className="process-step w-full flex items-center relative mb-8 last:mb-0 group">
              
              {/* Center Node */}
              <div className="w-12 h-12 rounded-full bg-background border border-black/10 flex items-center justify-center shrink-0 z-10 group-hover:border-accent group-hover:bg-accent/5 transition-colors duration-500">
                <span className="font-display text-muted-foreground group-hover:text-accent transition-colors duration-500">
                  {idx + 1}
                </span>
              </div>

              {/* Content Box */}
              <div className="ml-8 w-full">
                <div className="bg-panel border border-black/5 rounded-2xl p-6 w-full group-hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
                  <h4 className="text-foreground text-balance">
                    {step}
                  </h4>
                </div>
              </div>

            </div>
          ))}
          
        </div>

      </div>
    </section>
  );
}
