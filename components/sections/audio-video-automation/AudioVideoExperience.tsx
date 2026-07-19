'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { 
  Projector, 
  Music, 
  Gamepad2, 
  MonitorSmartphone, 
  TreePine, 
  SlidersHorizontal 
} from 'lucide-react';

const EXPERIENCES = [
  {
    title: "Movie Time",
    description: "One touch starts your projector or TV, adjusts lighting, and gets your entertainment ready.",
    icon: Projector,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Music in Every Room",
    description: "Play the same music throughout your home or choose different playlists for different rooms.",
    icon: Music,
    span: "col-span-1 md:col-span-1",
  },
  {
    title: "Gaming Experience",
    description: "Instantly access your gaming console and display with simple control.",
    icon: Gamepad2,
    span: "col-span-1 md:col-span-1",
  },
  {
    title: "Watch Anywhere",
    description: "Access your TV channels, streaming services, and media from any compatible display.",
    icon: MonitorSmartphone,
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Outdoor Entertainment",
    description: "Extend music to your garden, patio, or terrace with weather-resistant speakers.",
    icon: TreePine,
    span: "col-span-1 md:col-span-1",
  },
  {
    title: "Easy Control",
    description: "Manage TVs, music, projectors, and streaming devices from one app, remote, or touch panel.",
    icon: SlidersHorizontal,
    span: "col-span-1 md:col-span-2",
  }
];

export function AudioVideoExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    
    // Header animation
    gsap.fromTo('.experience-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Bento cards animation with stagger
    gsap.fromTo('.experience-card',
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.experience-grid',
          start: 'top 75%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="relative w-full bg-[#f8f8f8] py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <span className="experience-header tracking-widest text-sm md:text-base text-accent mb-4 block">
            Everyday Living
          </span>
          <h2 className="experience-header text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground text-balance mb-6">
            Entertainment Designed for Everyday Living
          </h2>
          <p className="experience-header text-sm md:text-base lg:text-lg font-light tracking-wide text-muted leading-relaxed text-balance">
            Create the right entertainment experience for every moment with integrated audio and video solutions.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="experience-grid grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {EXPERIENCES.map((exp, idx) => {
            const Icon = exp.icon;
            // Differentiate layout slightly based on span size
            const isLarge = exp.span.includes("col-span-2");
            
            return (
              <div 
                key={idx}
                className={`experience-card ${exp.span} bg-white border border-black/5 p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between gap-8 hover:shadow-xl hover:shadow-black/[0.02] hover:-translate-y-1 transition-all duration-500 group overflow-hidden relative`}
              >
                {/* Subtle decorative background glow */}
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors duration-500 pointer-events-none" />

                <div className="w-14 h-14 rounded-2xl bg-accent/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent/10 transition-all duration-500 shrink-0">
                  <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                </div>
                
                <div className={`flex flex-col gap-3 ${isLarge ? 'md:pr-12 lg:pr-24' : ''}`}>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-wide text-foreground group-hover:text-accent transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="text-sm sm:text-base font-light text-foreground/70 leading-relaxed transition-colors duration-300">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
