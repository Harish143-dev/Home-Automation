'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import {
  Film,
  Speaker,
  RadioTower,
  MonitorPlay,
  ArrowUpDown,
  Projector,
  TreePine,
  Smartphone
} from 'lucide-react';

const SOLUTIONS = [
  {
    title: "Home Theatre Automation",
    description: "Create the perfect movie experience with synchronized lighting, audio, video, and climate control at the touch of a button.",
    icon: Film,
  },
  {
    title: "Multi-Room Audio",
    description: "Enjoy different music in different rooms or play the same playlist throughout your home.",
    icon: Speaker,
  },
  {
    title: "Audio Distribution",
    description: "Stream music from a centralized system to any room with easy source selection and volume control.",
    icon: RadioTower,
  },
  {
    title: "Video Distribution",
    description: "Watch content from any media source on any TV or display without additional devices.",
    icon: MonitorPlay,
  },
  {
    title: "Motorized TV Lift Systems",
    description: "Conceal televisions within furniture and reveal them only when needed for a clean living space.",
    icon: ArrowUpDown,
  },
  {
    title: "Projector & Screen Integration",
    description: "Start movie mode with a single command that lowers the screen, powers the projector, and adjusts the room settings.",
    icon: Projector,
  },
  {
    title: "Outdoor Entertainment",
    description: "Extend music and entertainment to gardens, patios, terraces, and pool areas with weather-resistant speakers.",
    icon: TreePine,
  },
  {
    title: "Remote & App Control",
    description: "Control TVs, streaming devices, music, projectors, and other AV equipment from a single interface.",
    icon: Smartphone,
  }
];

export function AudioVideoSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Header animation
    gsap.fromTo('.solution-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards animation with stagger
    gsap.fromTo('.solution-card',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.solutions-grid',
          start: 'top 80%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base solution-header text-accent mb-4 block">
            Service Section
          </span>
          <h2 className="solution-header text-foreground text-balance mb-6">
            Our Audio & Video Integration Solutions
          </h2>
          <p className="solution-header text-sm md:text-base lg:text-lg font-light tracking-wide text-muted leading-relaxed text-balance">
            Customized solutions designed around your lifestyle, space, and entertainment preferences.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <div
                key={idx}
                className="solution-card bg-black/[0.03] border border-black/5 p-5 rounded-3xl flex flex-col items-start gap-6 hover:shadow-md hover:bg-black/[0.05] hover:border-black/10 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="text-foreground group-hover:text-accent transition-colors duration-300">
                    {solution.title}
                  </h4>
                  <p className="text-sm font-light text-foreground/70 leading-relaxed transition-colors duration-300">
                    {solution.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
