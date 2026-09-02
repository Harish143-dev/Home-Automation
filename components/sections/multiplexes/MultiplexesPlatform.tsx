'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { MonitorPlay, Lightbulb, Music, MonitorSmartphone, Wifi, Sliders } from 'lucide-react';

const SOLUTIONS = [
  {
    icon: MonitorPlay,
    title: "Immersive Guest Experience",
    desc: "Create the right ambience across lobbies, lounges, corridors, and entertainment areas with integrated lighting, audio, video, and display solutions."
  },
  {
    icon: Sliders,
    title: "Integrated Control",
    desc: "Centralize the management of multiple systems for simpler operation, greater consistency, and easier facility management."
  },
  {
    icon: Wifi,
    title: "Connected Infrastructure",
    desc: "Support high-traffic environments with reliable Wi-Fi, networking, AV, security, and control infrastructure designed for continuous operation."
  },
  {
    icon: Lightbulb,
    title: "Future-Ready & Scalable",
    desc: "Build flexible technology infrastructure that can adapt to new screens, additional spaces, changing requirements, and future technology upgrades."
  }
];

export function MultiplexesPlatform() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Animate Header
    gsap.fromTo(".solution-header",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Animate Cards Staggered
    const cards = gsap.utils.toArray('.solution-card');

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.solutions-grid',
          start: "top 85%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-12 md:py-16 relative w-full bg-panel px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <h5 className="text-accent mb-4 block">
            Multiplex Solutions
          </h5>
          <h2 className=" solution-header text-foreground mb-6 text-balance">
            Technology for a Smarter, More Connected Multiplex
          </h2>
          <p className="solution-header text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed text-balance">
            A multiplex is more than just a screening room. It is a connected environment where lighting, audio, video, networking, security, and automation need to work together seamlessly.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="solutions-grid flex flex-wrap gap-6 md:gap-8 w-full justify-center">
          {SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <div
                key={idx}
                className="solution-card w-full md:w-[calc(50%-1rem)] bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group flex flex-col hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-panel border border-black/5 flex items-center justify-center mb-8 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className=" text-foreground mb-4">
                  {solution.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  {solution.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

