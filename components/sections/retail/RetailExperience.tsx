'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { DoorOpen, Sparkles, Users, Megaphone, Moon } from 'lucide-react';

const EXPERIENCES = [
  {
    title: "Entrance Experience",
    description: "Welcome customers with the right environment. Coordinate lighting, background audio, and digital displays to create a consistent first impression.",
    applications: "Entrance lighting • Background audio • Digital displays",
    icon: DoorOpen
  },
  {
    title: "Product Discovery",
    description: "Direct attention where it matters. Use lighting and digital displays to highlight products, collections, and promotional areas.",
    applications: "Product displays • Feature walls • Promotional zones",
    icon: Sparkles
  },
  {
    title: "Peak Hours",
    description: "Adapt to changing store activity. Schedule lighting, audio, and climate settings around operating hours and peak customer periods.",
    applications: "Sales floor • Customer areas • Climate control",
    icon: Users
  },
  {
    title: "Promotional Events",
    description: "Create dedicated environments for launches and campaigns. Coordinate lighting, audio, and digital displays for special events and promotional activities.",
    applications: "Product launches • Brand activations • Promotional events",
    icon: Megaphone
  },
  {
    title: "Closing Time",
    description: "Automate the end-of-day routine. Schedule lighting, HVAC, displays, and other connected systems to switch off or adjust after business hours.",
    applications: "Lighting shutdown • HVAC scheduling • Display management",
    icon: Moon
  }
];

export function RetailExperience() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.experience-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-16 lg:mb-20">
          <h5 className="text-accent mb-4 block">
            Customer Journey
          </h5>
          <h2 className=" text-foreground text-balance mb-6">
            Designed Around the Customer Experience
          </h2>
          <p className="text-muted-foreground font-light text-lg md:text-xl text-balance">
            Every element of a retail environment influences how customers interact with your brand. Automation helps coordinate lighting, audio, visual systems, and climate to create the right environment throughout the customer journey.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="experience-card w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-accent/5 flex items-center justify-center mb-6 shrink-0">
                <exp.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>

              <h4 className=" text-foreground mb-3 text-balance">
                {exp.title}
              </h4>

              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed mb-6 flex-grow">
                {exp.description}
              </p>

              <div className="pt-4 border-t border-black/5 mt-auto">
                <span className="text-xs uppercase tracking-wider text-foreground font-medium block mb-2">Applications:</span>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {exp.applications}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
