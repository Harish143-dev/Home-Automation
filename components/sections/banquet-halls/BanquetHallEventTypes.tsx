'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { CheckCircle2 } from 'lucide-react';

const EVENTS = [
  {
    title: "Wedding Celebrations",
    points: [
      "Scene-based lighting control",
      "Background music control",
      "Motorized shade control"
    ]
  },
  {
    title: "Corporate Conferences",
    points: [
      "Wireless presentation systems",
      "Video conferencing integration",
      "Wireless screen sharing"
    ]
  },
  {
    title: "Award Ceremonies",
    points: [
      "Dynamic lighting scenes",
      "LED wall integration",
      "Audio and microphone control"
    ]
  },
  {
    title: "Product Launches",
    points: [
      "LED wall & display control",
      "Branded content display",
      "Wireless presentation"
    ]
  },
  {
    title: "Live Entertainment",
    points: [
      "Synchronized lighting scenes",
      "Multi-zone audio control",
      "Display & video management"
    ]
  },
  {
    title: "Private Events",
    points: [
      "Customized lighting scenes",
      "Ambient lighting control",
      "Music and AV control"
    ]
  }
];

export function BanquetHallEventTypes() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.event-header',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo('.event-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.events-grid',
          start: "top 85%",
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
          <span className="tracking-[0.1em] text-accent mb-4 block event-header">
            Versatile Environments
          </span>
          <h2 className=" text-foreground text-balance event-header mb-6">
            Designed for Every Type of Event
          </h2>
          <p className="event-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
            Flexible automation solutions that adapt to different event formats, enabling quick setup, consistent operation, and simplified venue management.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {EVENTS.map((event, idx) => (
            <div
              key={idx}
              className="event-card bg-panel border border-black/5 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col"
            >
              <h3 className=" text-foreground mb-6 text-balance">
                {event.title}
              </h3>

              <ul className="flex flex-col gap-4 mt-auto">
                {event.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-sm md:text-base font-light text-muted-foreground leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
