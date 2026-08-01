'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { X, Check } from 'lucide-react';

const COMPARISON_DATA = [
  {
    standard: "Multiple remotes and disconnected AV systems",
    pro: "One-touch control for the entire meeting room"
  },
  {
    standard: "Delays in starting meetings due to technical setup",
    pro: "Faster meeting start with simplified operation"
  },
  {
    standard: "Poor audio and video quality",
    pro: "Clear audio and high-quality video conferencing"
  },
  {
    standard: "Cable clutter and complex presentations",
    pro: "Wireless presentation and screen sharing"
  },
  {
    standard: "Manual lighting and display control",
    pro: "Automated lighting and display control"
  },
  {
    standard: "No visibility of room availability",
    pro: "Smart room scheduling and occupancy status"
  }
];

export function BoardroomComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Header Animation
    gsap.fromTo('.comp-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Rows Animation
    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(row,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          }
        }
      );
    });

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-3xl mb-16 md:mb-24">
          <span className="comp-header text-accent tracking-[0.1em] mb-4 block">
            The Difference
          </span>
          <h2 className="comp-header text-foreground text-balance mb-6">
            Smarter Meetings Start with Smarter Spaces
          </h2>
          <p className="comp-header text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
            Simplify every meeting with one platform for audio, video, lighting, displays, networking, and room scheduling. Designed for efficient, hassle-free collaboration.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="w-full flex flex-col border border-black/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl shadow-black/5 bg-white">
          
          {/* Table Headers */}
          <div className="flex flex-col md:flex-row bg-panel border-b border-black/10">
            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 border-b md:border-b-0 md:border-r border-black/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center shrink-0">
                <X className="w-5 h-5 text-muted-foreground" />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-muted-foreground tracking-tight">
                Standard Boardroom
              </h3>
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex items-center gap-4 bg-accent/5">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                <Check className="w-5 h-5 text-white" strokeWidth={3} />
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-accent tracking-tight">
                Intelligent Automation
              </h3>
            </div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col w-full bg-white">
            {COMPARISON_DATA.map((row, i) => (
              <div 
                key={i} 
                ref={el => { rowsRef.current[i] = el; }}
                className="flex flex-col md:flex-row border-b border-black/5 last:border-b-0 group hover:bg-panel/50 transition-colors duration-300"
              >
                {/* Standard (Left) */}
                <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 md:border-r border-black/5 flex items-center gap-4 md:gap-6">
                  <X className="w-5 h-5 text-muted-foreground/40 shrink-0 hidden md:block" />
                  <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed">
                    {row.standard}
                  </p>
                </div>
                
                {/* Pro (Right) */}
                <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex items-center gap-4 md:gap-6 bg-accent/[0.02] group-hover:bg-accent/[0.04] transition-colors duration-300">
                  <Check className="w-5 h-5 text-accent shrink-0 hidden md:block" strokeWidth={2.5} />
                  <p className="text-sm md:text-base md:text-lg font-medium text-foreground leading-relaxed">
                    {row.pro}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
