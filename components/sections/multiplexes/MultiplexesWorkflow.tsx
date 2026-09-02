'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { Settings2, Zap, RotateCcw, LayoutTemplate, Maximize, Target } from 'lucide-react';

const WORKFLOW_ITEMS = [
  {
    icon: Settings2,
    title: "Centralized Management",
    desc: "Manage lighting, AV, shades, and other connected systems through a unified control interface."
  },
  {
    icon: Zap,
    title: "Energy Optimization",
    desc: "Use scheduling, occupancy sensing, daylight management, and automated control to optimize energy consumption."
  },
  {
    icon: RotateCcw,
    title: "Simplified Operations",
    desc: "Reduce manual intervention with predefined scenes, schedules, and automated system responses."
  },
  {
    icon: LayoutTemplate,
    title: "Consistent Experiences",
    desc: "Maintain consistent lighting, AV, and environmental settings across different areas of the multiplex."
  },
  {
    icon: Maximize,
    title: "Scalable Systems",
    desc: "Deploy solutions that can scale across individual spaces, multiple areas, and future expansion requirements."
  },
  {
    icon: Target,
    title: "Reduced Complexity",
    desc: "Integrate multiple technologies through a single system integration partner, simplifying project coordination and ongoing support."
  }
];

export function MultiplexesWorkflow() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Animate Header
    gsap.fromTo(".wf-header",
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
    const cards = gsap.utils.toArray('.wf-card');

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.wf-grid',
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
          <h5 className="wf-header text-accent mb-4 block">
            Operational Efficiency
          </h5>
          <h2 className=" wf-header text-foreground mb-6 text-balance">
            Built for Operational Efficiency
          </h2>
          <p className="wf-header text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed text-balance">
            Intelligent automation helps multiplex operators simplify everyday operations while improving visibility, efficiency, and control.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="wf-grid flex flex-wrap gap-6 md:gap-8 w-full justify-center">
          {WORKFLOW_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="wf-card w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group flex flex-col hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-panel border border-black/5 flex items-center justify-center mb-8 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className=" text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

