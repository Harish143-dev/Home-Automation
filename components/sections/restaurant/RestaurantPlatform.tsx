'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { Lightbulb, Mic, MonitorPlay, Blinds, TabletSmartphone, Thermometer } from 'lucide-react';

const SOLUTIONS = [
  {
    icon: Lightbulb,
    title: "Lighting Automation",
    desc: "Create the perfect ambience with scene-based lighting, smooth dimming, scheduling, and one-touch control for every dining occasion."
  },
  {
    icon: Mic,
    title: "Audio & Video Integration",
    desc: "Manage background music, entertainment displays, and AV systems through a centralized control platform."
  },
  {
    icon: MonitorPlay,
    title: "Video Wall Integration",
    desc: "Display digital menus, live sports, promotions, and branded content with synchronized video wall control."
  },
  {
    icon: Blinds,
    title: "Motorized Shade Control",
    desc: "Automatically adjust shades based on sunlight and time of day to improve comfort, reduce glare, and enhance the dining atmosphere."
  },
  {
    icon: TabletSmartphone,
    title: "iPad Integration",
    desc: "Control lighting, music, video walls, shades, and HVAC from a single iPad or touchscreen, making daily operations simple for restaurant staff."
  },
  {
    icon: Thermometer,
    title: "HVAC Integration",
    desc: "Maintain a comfortable dining environment with automated temperature control while improving energy efficiency throughout operating hours."
  }
];

export function RestaurantPlatform() {
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
          <span className="tracking-[0.1em] text-accent mb-4 block">
            Integrated Solutions
          </span>
          <h2 className=" solution-header text-foreground mb-6 text-balance">
            Everything Connected Through One Smart Platform
          </h2>
          <p className="solution-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
            Manage lighting, audio, video, shades, and climate from a single intuitive control system, ensuring effortless operation and a consistent guest experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <div
                key={idx}
                className="solution-card bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group flex flex-col hover:-translate-y-1"
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
