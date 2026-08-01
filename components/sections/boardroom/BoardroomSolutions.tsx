'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { Video, Mic, Settings, MonitorPlay, Wifi, CalendarClock } from 'lucide-react';

const SOLUTIONS = [
  {
    icon: Video,
    title: "Video Conferencing Systems",
    desc: "Host high-quality virtual meetings with intelligent cameras and support for Microsoft Teams, Zoom, and Google Meet."
  },
  {
    icon: Mic,
    title: "Professional Audio Systems",
    desc: "Deliver clear speech with premium microphones, speakers, and digital audio processing."
  },
  {
    icon: Settings,
    title: "Integrated Room Control",
    desc: "Manage lighting, displays, blinds, HVAC, conferencing, and AV devices from a single touch panel."
  },
  {
    icon: MonitorPlay,
    title: "LED Video Walls & Displays",
    desc: "Present with high-resolution LED walls and interactive displays built for collaboration."
  },
  {
    icon: Wifi,
    title: "Wireless Presentation",
    desc: "Share content instantly from laptops and mobile devices without HDMI cables."
  },
  {
    icon: CalendarClock,
    title: "Room Scheduling Systems",
    desc: "Display room availability, enable quick bookings, and improve meeting room utilization."
  }
];

export function BoardroomSolutions() {
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
    <section ref={containerRef} className="py-20 md:py-32 relative w-full bg-panel px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <span className="tracking-[0.1em] text-accent mb-4 block">
            Comprehensive Integration
          </span>
          <h2 className="solution-header text-foreground mb-6 text-balance">
            Complete Boardroom & Meeting Room Solutions
          </h2>
          <p className="solution-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto">
            Everything you need to create smarter, more efficient, and connected meeting spaces.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <div 
                key={idx} 
                className="solution-card bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group flex flex-col hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-panel border border-black/5 flex items-center justify-center mb-8 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground mb-4">
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
