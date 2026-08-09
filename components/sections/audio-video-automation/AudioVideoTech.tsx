'use client';

import React, { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { ChevronDown, Speaker, Tv, Film, Server, ArrowUpDown, Projector } from 'lucide-react';

const TECHNOLOGIES = [
  {
    title: "Centralized Audio Distribution",
    description: "Play music across multiple rooms from a single system.",
    icon: Speaker,
  },
  {
    title: "Video Distribution",
    description: "Access any media source on any compatible TV or display.",
    icon: Tv,
  },
  {
    title: "Home Theatre Systems",
    description: "Experience immersive sound and high-quality visuals for movies, sports, and gaming.",
    icon: Film,
  },
  {
    title: "Hidden Equipment Design",
    description: "Keep AV equipment organized in a central rack for a clean living space.",
    icon: Server,
  },
  {
    title: "Motorized TV Lift Systems",
    description: "Conceal televisions within furniture when not in use.",
    icon: ArrowUpDown,
  },
  {
    title: "Projector & Screen Integration",
    description: "Lower the screen and power on your projector with a single command.",
    icon: Projector,
  }
];

export function AudioVideoTech() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();
  const [openIndex, setOpenIndex] = useState<number>(0);

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    // Header animation
    gsap.fromTo('.tech-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Accordion items animation
    gsap.fromTo('.tech-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.tech-accordion',
          start: 'top 75%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">

        {/* Left Side: Header Content */}
        <div className="w-full lg:w-1/3 flex flex-col items-start lg:sticky lg:top-32 h-fit">
          <span className={`tracking-[0.3em] text-xs sm:text-sm md:text-base tech-header text-accent mb-4 block ${!prefersReducedMotion && 'opacity-0'}`}>
            Tech Section
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide tech-header text-foreground text-balance mb-6 ${!prefersReducedMotion && 'opacity-0'}`}>
            Audio & Video Technologies
          </h2>
          <p className={`tech-header text-sm md:text-base lg:text-lg font-light tracking-wide text-muted leading-relaxed text-balance ${!prefersReducedMotion && 'opacity-0'}`}>
            We work with trusted global technology partners to deliver reliable audio and video solutions for every home.
          </p>
        </div>

        {/* Right Side: Interactive Accordion */}
        <div className="tech-accordion w-full lg:w-2/3 flex flex-col gap-4">
          {TECHNOLOGIES.map((tech, idx) => {
            const isOpen = openIndex === idx;
            const Icon = tech.icon;

            return (
              <div
                key={idx}
                className={`tech-item rounded-[2rem] overflow-hidden transition-all duration-500 border ${!prefersReducedMotion ? 'opacity-0' : ''
                  } ${isOpen
                    ? 'bg-black/[0.03] border-black/10 shadow-lg shadow-black/[0.02]'
                    : 'bg-white border-black/5 hover:border-black/10'
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left px-6 sm:px-8 py-6 flex items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${isOpen ? 'bg-accent text-white' : 'bg-accent/5 text-accent'
                      }`}>
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3 className={`text-lg sm:text-xl font-medium tracking-wide transition-colors duration-300 ${isOpen ? 'text-foreground' : 'text-foreground/80'
                      }`}>
                      {tech.title}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180 bg-black/5' : 'bg-transparent'
                    }`}>
                    <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-foreground' : 'text-foreground/40'}`} strokeWidth={2} />
                  </div>
                </button>

                {/* Expandable Content Area */}
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-8 pt-2 pl-[5.5rem] sm:pl-[6.5rem]">
                      <p className="text-base sm:text-lg font-light text-foreground/70 leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
