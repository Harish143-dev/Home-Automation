'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Tag, LayoutTemplate, Users } from 'lucide-react';
import { EASE, DURATION } from '../../../lib/animation.config';

const APPROACH_ITEMS = [
  {
    title: "Your Brand",
    description: "Technology that supports your brand communication and content. From video walls and interactive displays to lighting and audio, each solution is selected to support how your brand is presented.",
    icon: Tag
  },
  {
    title: "Your Space",
    description: "Solutions planned around your multiplex layout and infrastructure. Technology is integrated according to available space, connectivity, display requirements, and visitor movement.",
    icon: LayoutTemplate
  },
  {
    title: "Your Audience",
    description: "Experiences designed around how visitors interact with your space. Interactive AV, digital displays, presentations, audio, and lighting can work together to engage and inform visitors.",
    icon: Users
  }
];

export function MultiplexesApproach() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    // Header reveal
    tl.fromTo(".approach-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.15, ease: EASE.reveal }
    );

    // Cards reveal
    tl.fromTo(".approach-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.15, ease: EASE.reveal },
      "-=0.4"
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <h5 className="approach-header text-accent mb-4 block font-medium">
            Tailored Solutions
          </h5>
          <h2 className="approach-header text-foreground mb-6 text-balance">
            Designed Around Your Brand, Space & Audience
          </h2>
          <p className="approach-header text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance">
            No two multiplexes are the same. Our technology solutions are planned around your multiplex layout, content requirements, visitor movement, and operational needs.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {APPROACH_ITEMS.map((item, idx) => (
            <div 
              key={idx}
              className="approach-card bg-panel border border-black/5 rounded-[2rem] p-10 flex flex-col items-center text-center hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full bg-accent/5 flex items-center justify-center mb-8 shrink-0">
                <item.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl md:text-2xl text-foreground font-medium mb-4">
                {item.title}
              </h3>
              
              <p className="text-base font-light text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

