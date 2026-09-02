'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { Server, Maximize2, GitMerge, FastForward } from 'lucide-react';

const ENV_FEATURES = [
  {
    icon: Server,
    title: "Reliable Infrastructure",
    desc: "Commercial-grade hardware built for 24/7 operation, backed by 24x7 in-house support and 4-hour on-site response in Delhi, Mumbai, and Bangalore."
  },
  {
    icon: Maximize2,
    title: "Scalable Architecture",
    desc: "From a single cabin to an entire building or campus, the system expands without reworking existing infrastructure."
  },
  {
    icon: GitMerge,
    title: "Integrated Technology",
    desc: "Lighting, shades, HVAC, AV, and security run on one unified platform instead of siloed, single-purpose systems."
  },
  {
    icon: FastForward,
    title: "Future-Ready",
    desc: "Open protocols like BACnet and API integration let the system adopt new technology and requirements as they emerge, without a rip-and-replace."
  }
];

export function AirportLoungesEnvironments() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Animate Header
    gsap.fromTo(".env-header",
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
    const cards = gsap.utils.toArray('.env-card');

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.env-grid',
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
          <h5 className="env-header text-accent mb-4 block">
            Commercial Grade
          </h5>
          <h2 className="env-header text-foreground mb-6 text-balance">
            Built for Demanding Commercial Environments
          </h2>
          <p className="env-header text-muted-foreground text-sm sm:text-base md:text-lg font-light leading-relaxed text-balance">
            Our automation solutions are engineered for environments where reliability, scalability, and seamless operation are essential.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="env-grid flex flex-wrap gap-6 md:gap-8 w-full justify-center">
          {ENV_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="env-card w-full md:w-[calc(50%-1rem)] bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group flex flex-col hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-panel border border-black/5 flex items-center justify-center mb-8 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className=" text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
