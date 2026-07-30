'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Lightbulb, Blinds, Speaker, Network, ShieldCheck, Thermometer } from 'lucide-react';

const SOLUTIONS = [
  {
    title:"Lighting Control",
    description:"Create the perfect ambience with centralized lighting, scene control, dimming, and automated scheduling for different times of the day.",
    icon: Lightbulb,
    benefits: ["Scene-based lighting control","Improved ambience","Reduced energy consumption"
    ]
  },
  {
    title:"Motorized Shades",
    description:"Automate natural daylight and privacy with intelligent shade control for lobbies and public spaces.",
    icon: Blinds,
    benefits: ["Daylight management","Enhanced guest comfort","Improved energy efficiency"
    ]
  },
  {
    title:"Audio & Video Integration",
    description:"Manage background music, digital displays, and entertainment systems from a centralized platform.",
    icon: Speaker,
    benefits: ["Consistent guest experience","Centralized AV control","Flexible content management"
    ]
  },
  {
    title:"Networking Infrastructure",
    description:"Enterprise-grade networking that supports automation systems, guest connectivity, and hotel operations.",
    icon: Network,
    benefits: ["Reliable connectivity","Scalable infrastructure","Simplified management"
    ]
  },
  {
    title:"Security Integration",
    description:"Integrate CCTV, access control, and monitoring systems to improve safety across public areas.",
    icon: ShieldCheck,
    benefits: ["Enhanced security","Centralized monitoring","Controlled access"
    ]
  },
  {
    title:"HVAC Control",
    description:"Maintain comfortable indoor temperatures with intelligent climate control and centralized HVAC management.",
    icon: Thermometer,
    benefits: ["Consistent guest comfort","Optimized energy usage","Centralized temperature control"
    ]
  }
];

export function PublicAreasSolutions() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.solution-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease:"power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start:"top 80%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-12 lg:mb-20">
          <h2 className="text-foreground text-balance mb-6">
            Intelligent Solutions for Modern Public Spaces
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Integrated automation technologies designed to enhance guest experience, improve operational efficiency, and simplify management across hospitality public spaces.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full">
          {SOLUTIONS.map((solution, idx) => (
            <div 
              key={idx} 
              className="solution-card bg-panel border border-black/5 rounded-[2rem] p-8 sm:p-10 hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-8 shrink-0">
                <solution.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-foreground mb-4">
                {solution.title}
              </h3>
              
              <p className="text-muted-foreground font-light leading-relaxed mb-8 grow">
                {solution.description}
              </p>

              <div className="space-y-3 mt-auto pt-6 border-t border-black/5">
                <span className="text-xs  tracking-widest text-accent font-medium block mb-4">
                  Benefits
                </span>
                {solution.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 shrink-0" />
                    <span className="text-sm font-light text-foreground/80 leading-relaxed">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
