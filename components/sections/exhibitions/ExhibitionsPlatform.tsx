'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { MonitorPlay, Lightbulb, Music, MonitorSmartphone, Wifi, Sliders } from 'lucide-react';

const SOLUTIONS = [
  {
    icon: MonitorPlay,
    title: "LED Video Walls",
    desc: "Create impactful visual environments with large-format video walls for branding, digital content, presentations, and immersive displays."
  },
  {
    icon: Lightbulb,
    title: "Lighting Management",
    desc: "Intelligent lighting control with dimming, occupancy sensing, scheduling, and daylight-responsive solutions to create the right ambience while improving energy efficiency."
  },
  {
    icon: Music,
    title: "Audio Distribution",
    desc: "Deliver clear, high-quality audio across exhibition spaces with distributed audio systems designed for consistent sound coverage."
  },
  {
    icon: MonitorSmartphone,
    title: "Interactive AV",
    desc: "Engage visitors through interactive displays, wireless presentation systems, video conferencing, and integrated AV solutions."
  },
  {
    icon: Wifi,
    title: "Networking Infrastructure",
    desc: "Build a reliable technology backbone with robust Wi-Fi and LAN infrastructure to support connected AV, control, and digital experiences."
  },
  {
    icon: Sliders,
    title: "Integrated Control",
    desc: "Bring lighting, AV, displays, shades, and other connected systems together through centralized control for simple and efficient operation."
  }
];

export function ExhibitionsPlatform() {
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
            Exhibition Solutions
          </h5>
          <h2 className=" solution-header text-foreground mb-6 text-balance">
            Technology That Turns Exhibitions Into Experiences
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="solutions-grid flex flex-wrap gap-6 md:gap-8 w-full justify-center">
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
