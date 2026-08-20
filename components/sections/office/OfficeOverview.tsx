'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CheckCircle2 } from 'lucide-react';
import { DURATION, EASE, STAGGER } from '@/lib/animation.config';

const FEATURES = [
  {
    title: "Better Employee Experience",
    description: "Personalised control of lighting, temperature, shades, audio, and meeting spaces.",
  },
  {
    title: "Lower Operational Costs",
    description: "Automated systems help reduce unnecessary energy and equipment usage.",
  },
  {
    title: "Energy Optimisation",
    description: "Occupancy sensing, daylight harvesting, scheduling, and automated shades help manage energy consumption.",
  },
  {
    title: "Centralised Management",
    description: "Monitor and control connected systems across rooms, floors, or buildings from a central interface.",
  },
  {
    title: "Future-Ready Infrastructure",
    description: "Scalable solutions that integrate with building management, networking, security, HVAC, and AV systems.",
  }
];

export function OfficeOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.oo-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.normal, ease: EASE.reveal }
    )
      .fromTo('.oo-feature',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.tight, ease: EASE.reveal },
        "-=0.4"
      )
      .fromTo(imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: DURATION.slow, ease: EASE.premium },
        0
      );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* Left Content */}
        <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col">
          <span className="oo-header tracking-[0.3em] text-accent mb-4 block uppercase text-sm font-medium">
            Smart Infrastructure
          </span>
          <h2 className="oo-header text-foreground mb-6">
            Connecting Your Workspace
          </h2>
          <p className="oo-header text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-10">
            Modern office automation connects lighting, shades, audio-video, climate, security, and workspace systems to simplify daily operations, improve employee comfort, and support energy efficiency.
          </p>

          <div className="flex flex-col gap-8">
            {FEATURES.map((feature, i) => (
              <div key={i} className="oo-feature flex gap-4 items-start">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" strokeWidth={1.5} />
                <div className="flex flex-col gap-2">
                  <h4 className="text-foreground">{feature.title}</h4>
                  <p className="text-muted-foreground font-light text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div ref={imageRef} className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10">
          <NextImage
            src="/images/office-overview.png"
            alt="Modern automated office space"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
