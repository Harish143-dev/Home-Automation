"use client";

import React, { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FEATURES = [
  {
    title: "Preventive Maintenance",
    description: "Regular checks to identify potential issues.",
  },
  {
    title: "System Health Checks",
    description: "Monitor the performance of installed systems.",
  },
  {
    title: "Technical Support",
    description: "Assistance from experienced technical professionals.",
  },
  {
    title: "On-Site Service",
    description: "Professional support at your site when required.",
  },
  {
    title: "Remote Assistance",
    description: "Quick support for eligible issues remotely.",
  },
  {
    title: "Performance Optimization",
    description: "Configuration support and recommendations for better performance.",
  }
];

export default function AMCFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.feature-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.feature-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.feature-grid',
          start: 'top 75%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="feature-header max-w-3xl mx-auto text-center mb-16">
          <h5 className="text-accent mb-4 block">
            Beyond Repairs
          </h5>
          <h2 className="text-foreground mb-6 text-balance">
            Proactive Technology Support
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance">
            Our AMC approach helps maintain system performance and identify potential issues before they affect your experience.
          </p>
        </div>

        {/* Grid */}
        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((item, idx) => (
            <div key={idx} className="feature-card flex flex-col items-start bg-panel p-8 sm:p-10 rounded-2xl border border-black/5 opacity-0">
              <CheckCircle2 className="w-8 h-8 text-accent mb-6" strokeWidth={1.5} />
              <h3 className="text-lg md:text-xl font-medium mb-3 text-foreground">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
