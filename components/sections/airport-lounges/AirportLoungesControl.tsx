'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Activity, Sliders, CalendarClock, Zap, Maximize } from 'lucide-react';
import { EASE, DURATION } from '../../../lib/animation.config';

const CONTROL_FEATURES = [
  {
    title: "Monitor",
    description: "Real-time dashboard visibility into lighting, shades, HVAC, and AV across the lounge, down to the fixture level.",
    icon: Activity
  },
  {
    title: "Control",
    description: "One interface to adjust lighting, temperature, shades, and audio zones — no juggling separate systems.",
    icon: Sliders
  },
  {
    title: "Schedule",
    description: "Automate lighting/HVAC/shade schedules around operating hours and events, with holiday exceptions.",
    icon: CalendarClock
  },
  {
    title: "Optimize",
    description: "Occupancy sensing and daylight harvesting cut energy waste automatically, with usage reports to track savings.",
    icon: Zap
  },
  {
    title: "Scale",
    description: "Open BACnet/API architecture grows from one lounge to a full terminal or campus without ripping out existing gear.",
    icon: Maximize
  }
];

export function AirportLoungesControl() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate content sliding up
    if (contentRef.current) {
      const eyebrow = contentRef.current.querySelector('h5');
      const heading = contentRef.current.querySelector('h2');
      const paragraph = contentRef.current.querySelector('p');

      tl.fromTo([eyebrow, heading, paragraph],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.1, ease: EASE.reveal }
      );
    }

    // Animate list items
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: DURATION.normal, ease: EASE.reveal },
        "-=0.6" // overlapping for fluid staggered feel
      );
    });

    // Animate image sliding in from right
    tl.fromTo(imageRef.current,
      { x: 50, opacity: 0, clipPath: 'inset(0 0 0 100%)' },
      {
        x: 0,
        opacity: 1,
        clipPath: 'inset(0 0 0 0%)',
        duration: DURATION.slow,
        ease: EASE.reveal
      },
      "-=1.2"
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Left Side: Content */}
        <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h5 className="text-accent block">
              Centralized Management
            </h5>
            <h2 className="text-foreground text-balance">
              Complete Control From a Centralized Interface
            </h2>
            <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance">
              Give facility and operations teams greater visibility and control over the lounge environment through centralized automation.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            {CONTROL_FEATURES.map((item, i) => (
              <div
                key={i}
                ref={el => { itemsRef.current[i] = el; }}
                className="flex gap-4 md:gap-6 items-start opacity-0"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center shrink-0 border border-black/5">
                  <item.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-lg md:text-xl text-foreground font-medium">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Image */}
        <div ref={imageRef} className="w-full lg:w-1/2 relative h-[600px] lg:h-[800px] rounded-[2rem] overflow-hidden opacity-0 shadow-xl shadow-black/5">
          <NextImage
            src="https://images.unsplash.com/photo-1576089172869-4f5f6f315620?q=80&w=2000&auto=format&fit=crop"
            alt="Centralized Control Interface"
            fill
            className="object-cover transition-transform duration-[2s] hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
}
