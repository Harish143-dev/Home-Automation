'use client';

import React, { useRef } from 'react';
import { Smartphone, Mic, LayoutPanelLeft, Clock } from 'lucide-react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const CONTROLS = [
  {
    title: "Mobile App Control",
    description: "Monitor live camera feeds, lock or unlock doors, view activity logs, receive instant alerts, and manage your home's security from your smartphone.",
    icon: Smartphone,
  },
  {
    title: "Voice Assistants",
    description: "Control locks, lighting, security scenes, and other connected devices using simple voice commands through Alexa, Google Assistant, or Siri.",
    icon: Mic,
  },
  {
    title: "Smart Touch Panels",
    description: "Access security controls, cameras, door locks, and automation scenes instantly through elegant wall-mounted touch panels.",
    icon: LayoutPanelLeft,
  },
  {
    title: "Automation Schedules",
    description: "Schedule doors to lock, security systems to arm, cameras to activate, and outdoor lighting to operate automatically based on time, occupancy, or custom routines.",
    icon: Clock,
  }
];

export function SecurityControls() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.sc-header',
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

    gsap.fromTo(cardsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
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
    <section ref={sectionRef} className="py-16 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-[#fafafa] text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24 relative">
        
        {/* Header */}
        <div className="sc-header text-center max-w-3xl mx-auto">
          <h5 className="text-accent mb-4 block">
            Seamless Control
          </h5>
          <h2 className="text-foreground text-balance mb-6">
            Control Your Home Security Anytime, Anywhere
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Stay connected to your home with intuitive controls that let you monitor, manage, and automate your security from anywhere.
          </p>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {CONTROLS.map((control, idx) => (
            <div 
              key={idx}
              ref={el => { cardsRef.current[idx] = el; }}
              className="group flex flex-col md:flex-row gap-6 md:gap-8 p-8 md:p-10 rounded-3xl bg-white border border-black/5 hover:border-black/10 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#fafafa] border border-black/5 flex items-center justify-center text-accent transition-transform duration-500 group-hover:scale-110">
                <control.icon className="w-7 h-7" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl md:text-2xl font-medium tracking-tight text-foreground transition-colors duration-300">
                  {control.title}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                  {control.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
