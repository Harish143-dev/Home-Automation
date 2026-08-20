'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { Check } from 'lucide-react';

const STEPS = [
  "Discovery & Consultation",
  "System Design",
  "Material Procurement",
  "Site Installation",
  "System Integration",
  "Testing & Commissioning",
  "Project Handover",
];

export function AudioVideoProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current || !containerRef.current || !lineRef.current) return;

    // Header animation
    gsap.fromTo('.process-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Timeline Line Fill Animation
    gsap.fromTo(lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 75%',
          scrub: true,
        }
      }
    );

    // Individual Steps Animation
    const steps = gsap.utils.toArray('.process-step') as HTMLElement[];
    steps.forEach((step, idx) => {

      const dot = step.querySelector('.process-dot');
      const text = step.querySelector('.process-text');

      // Highlight active step as we scroll past
      gsap.to(dot, {
        backgroundColor: '#8c1817', // accent color
        borderColor: '#8c1817',
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 60%',
          end: 'top 40%',
          toggleActions: 'play reverse play reverse',
        }
      });

      gsap.to(text, {
        color: 'var(--foreground)',
        opacity: 1,
        x: 10,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 60%',
          end: 'top 40%',
          toggleActions: 'play reverse play reverse',
        }
      });
    });

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-4xl w-full mx-auto flex flex-col md:flex-row gap-16 lg:gap-24">

        {/* Left Side: Header Content */}
        <div className="w-full md:w-1/3 flex flex-col items-start md:sticky md:top-32 h-fit">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base process-header text-accent mb-4 block">
            Our Process
          </span>
          <h2 className=" process-header text-foreground text-balance mb-6">
            A Seamless Journey
          </h2>
          <p className="process-header text-sm md:text-base lg:text-lg font-light tracking-wide text-muted leading-relaxed text-balance">
            From initial concept to final handover, we ensure every step of your project is handled with precision and care.
          </p>
        </div>

        {/* Right Side: Vertical Timeline */}
        <div className="w-full md:w-2/3 relative py-10" ref={containerRef}>

          {/* Background Timeline Line */}
          <div className="absolute top-0 bottom-0 left-[23px] sm:left-[27px] w-[2px] bg-black/5 rounded-full" />

          {/* Active Timeline Line */}
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-[23px] sm:left-[27px] w-[2px] bg-accent rounded-full origin-top"
          />

          <div className="flex flex-col gap-12 sm:gap-16 relative z-10">
            {STEPS.map((step, idx) => {
              const stepNumber = String(idx + 1).padStart(2, '0');

              return (
                <div key={idx} className="process-step relative flex items-center group">

                  {/* Timeline Dot */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background border-4 border-black/10 flex items-center justify-center shrink-0 z-10 process-dot transition-colors duration-300">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-background" strokeWidth={3} />
                  </div>

                  {/* Step Content */}
                  <div className="ml-8 sm:ml-12 relative flex-grow">
                    {/* Step Title */}
                    <h3 className=" process-text text-foreground/40 opacity-70 transition-all duration-300 relative z-10">
                      {step}
                    </h3>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
