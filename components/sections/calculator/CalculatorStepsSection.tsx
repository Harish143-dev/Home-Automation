'use client';

import React, { useRef } from 'react';
import { Home, Sliders, TrendingDown, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE, DURATION, STAGGER } from '@/lib/animation.config';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';

const STEPS = [
  {
    stepNumber: '01',
    title: 'Tell Us About Your Project',
    description:
      'Enter basic information about your property, usage and current energy consumption.',
    detail: 'Property size, energy spend & occupancy profile',
    icon: Home,
  },
  {
    stepNumber: '02',
    title: 'Select Your Automation Requirements',
    description:
      'Choose the systems you are considering, such as lighting, HVAC, shades or energy management.',
    detail: 'Modular systems configured to your architectural goals',
    icon: Sliders,
  },
  {
    stepNumber: '03',
    title: 'See Your Potential Savings',
    description:
      'Get an indicative estimate of your potential energy and cost savings.',
    detail: 'Real-time payback, monthly reductions & ROI metrics',
    icon: TrendingDown,
  },
];

export function CalculatorStepsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(
      '.steps-header-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    gsap.fromTo(
      '.step-card-item',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.slow,
        stagger: STAGGER.normal,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: stepsContainerRef.current,
          start: 'top 85%',
        },
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-16 md:py-24 relative w-full bg-[#EAE3CE] border-y border-border text-foreground"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="steps-header-item flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-black/20" />
            <span className="tracking-[0.3em] text-xs sm:text-sm uppercase text-accent font-light">
              Simple 3-Step Methodology
            </span>
            <div className="h-[1px] w-8 bg-black/20" />
          </div>

          <h2 className="steps-header-item text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-4">
            Get Your Estimate in 3 Simple Steps
          </h2>

          <p className="steps-header-item font-light text-base sm:text-lg leading-relaxed text-muted">
            Our algorithmic model benchmarks your property against over 25 years of engineering data across Indian climate zones.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="step-card-item relative bg-white rounded-2xl p-8 border border-border shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/70">
                    <span className="text-3xl sm:text-4xl font-light tracking-wide text-accent">
                      {step.stepNumber}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-light leading-[1.3] tracking-wide text-xl sm:text-2xl text-foreground mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-light text-sm sm:text-base leading-relaxed text-muted mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Sub-detail tag */}
                <div className="pt-4 border-t border-border/50 flex items-center gap-2 text-xs text-muted/80 font-light">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span>{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
