'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Zap, ShieldCheck, Sliders, GraduationCap, Cpu, Wrench } from 'lucide-react';

const REASONS = [
  {
    title: "Lower Energy Costs",
    description: "Optimize lighting, HVAC, and other systems to reduce unnecessary energy consumption.",
    icon: Zap,
  },
  {
    title: "Improved Student Safety",
    description: "Integrated security and access control help protect students, faculty, and visitors.",
    icon: ShieldCheck,
  },
  {
    title: "Simplified Campus Operations",
    description: "Monitor and manage multiple campus systems through centralized controls.",
    icon: Sliders,
  },
  {
    title: "Enhanced Teaching Experience",
    description: "Reliable AV, interactive displays, and room controls support effective teaching and collaboration.",
    icon: GraduationCap,
  },
  {
    title: "Future-Ready Infrastructure",
    description: "Scalable automation solutions can adapt as campus needs and technology evolve.",
    icon: Cpu,
  },
  {
    title: "Reduced Maintenance Effort",
    description: "Centralized monitoring, scheduling, and system management simplify maintenance and operations.",
    icon: Wrench,
  }
];

export function InstitutesWhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.iw-why-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(itemsRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 lg:gap-20 relative">

        {/* Header */}
        <div className="iw-why-header text-center max-w-4xl mx-auto">
          <h2 className="text-foreground text-balance">
            Why Educational Institutions Choose Automation
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {REASONS.map((reason, idx) => (
            <div
              key={idx}
              ref={el => { itemsRef.current[idx] = el; }}
              className="group flex flex-col items-start gap-4 p-8 rounded-3xl bg-panel border border-black/5 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-500">
                <reason.icon className="w-5 h-5 text-accent group-hover:text-primary transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-foreground mb-3 leading-snug text-balance">
                  {reason.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed text-balance">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
