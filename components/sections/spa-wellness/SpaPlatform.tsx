'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { Lightbulb, Music, Blinds, TabletSmartphone, Thermometer } from 'lucide-react';

const SOLUTIONS = [
  {
    icon: Lightbulb,
    title: "Lighting Controls",
    desc: "Create customized lighting scenes for Relaxation Mode, Therapy Mode, Evening Ambience, and Night Mode with smooth dimming for a calming spa environment.",
    benefits: ["Preset wellness scenes", "Smooth dimming control", "Consistent guest ambience"]
  },
  {
    icon: Music,
    title: "Audio & Video Controls",
    desc: "Integrate soothing background music across treatment rooms and common areas to enhance the wellness experience.",
    benefits: ["Continuous music playback", "Multi-zone audio control", "Relaxing guest experience"]
  },
  {
    icon: Thermometer,
    title: "HVAC Integration",
    desc: "Maintain comfortable room temperatures with automated climate control for treatment rooms and wellness spaces.",
    benefits: ["Automated temperature control", "Centralized HVAC management", "Improved guest comfort"]
  },
  {
    icon: Blinds,
    title: "Shade Controls",
    desc: "Automate curtains and shades to provide privacy and manage natural daylight throughout the spa.",
    benefits: ["Enhanced privacy", "Daylight management", "Improved comfort"]
  },
  {
    icon: TabletSmartphone,
    title: "iPad Integration",
    desc: "Control lighting, music, HVAC, and shades from an iPad or touchscreen for simple day-to-day operation.",
    benefits: ["One-touch control", "Easy operation for spa staff", "Faster and efficient management"]
  }
];

export function SpaPlatform() {
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
            Integrated Solutions
          </h5>
          <h2 className="solution-header text-foreground mb-6 text-balance">
            One-Touch Control for the Entire Spa
          </h2>
          <p className="solution-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
            Manage lighting, HVAC, audio, shades, and privacy settings from a single intuitive interface—delivering a consistent wellness experience while simplifying day-to-day operations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="solutions-grid flex flex-wrap justify-center gap-6 md:gap-8 w-full">
          {SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <div
                key={idx}
                className="solution-card w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group flex flex-col hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-panel border border-black/5 flex items-center justify-center mb-8 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="text-foreground mb-4">
                  {solution.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed mb-6">
                  {solution.desc}
                </p>

                {solution.benefits && solution.benefits.length > 0 && (
                  <ul className="mt-auto space-y-2 border-t border-black/5 pt-4">
                    {solution.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start text-sm md:text-base text-foreground/80 font-light leading-relaxed">
                        <span className="text-accent mr-2 flex-shrink-0">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
