'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Network, Building, Rocket, Users, Briefcase, Sparkles, Landmark } from 'lucide-react';

export function ExhibitionsEcosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(".eco-content",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    tl.fromTo(".eco-icon",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.4"
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5">
      
      {/* Background visual flair */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <Network className="w-[120%] h-[120%] text-foreground rotate-12" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <h5 className="eco-content text-accent mb-6 block font-medium">
          Format Flexibility
        </h5>
        
        <h2 className="eco-content text-foreground mb-8 text-balance">
          Built for Every Exhibition Experience
        </h2>
        
        <p className="eco-content text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance max-w-3xl mx-auto mb-16">
          Our integrated technology solutions can be tailored to different exhibition formats, spaces, and visitor experiences—from immersive displays and interactive AV to lighting, audio, networking, and centralized control.
        </p>

        {/* Icons Grid to visually represent the ecosystem */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {[
            { Icon: Building, label: "Brand Exhibitions" },
            { Icon: Rocket, label: "Product Launches" },
            { Icon: Users, label: "Trade Shows" },
            { Icon: Briefcase, label: "Corporate Exhibitions" },
            { Icon: Sparkles, label: "Experience Centers" },
            { Icon: Landmark, label: "Museums & Institutional Exhibitions" },
          ].map((item, idx) => (
            <div key={idx} className="eco-icon flex flex-col items-center gap-4 w-32 md:w-40">
              <div className="w-16 h-16 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center">
                <item.Icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
              </div>
              <span className="text-xs md:text-sm font-light tracking-wide text-muted-foreground leading-snug">
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
