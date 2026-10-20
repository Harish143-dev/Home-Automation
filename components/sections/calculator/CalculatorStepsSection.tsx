'use client';

import React, { useRef } from 'react';
import { Home, Sliders, TrendingDown } from 'lucide-react';
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
    icon: Home,
  },
  {
    stepNumber: '02',
    title: 'Select Your Automation Requirements',
    description:
      'Choose the systems you are considering, such as lighting, HVAC, shades or energy management.',
    icon: Sliders,
  },
  {
    stepNumber: '03',
    title: 'See Your Potential Savings',
    description:
      'Get an indicative estimate of your potential energy and cost savings.',
    icon: TrendingDown,
  },
];

export function CalculatorStepsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      },
    });

    tl.fromTo(
      '.steps-header-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.reveal,
      }
    ).fromTo(
      '.step-card-item',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.tight,
        ease: EASE.reveal,
      },
      '-=0.3'
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-16 md:py-24 relative w-full bg-[#EAE3CE] text-foreground"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="steps-header-item text-foreground">
            Get Your Estimate in 3 Simple Steps
          </h2>
        </div>

        {/* 3 Step Cards */}
        <div
          ref={stepsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="step-card-item relative bg-white rounded-2xl p-8 border border-border shadow-sm flex flex-col justify-start transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
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
                <h3 className="text-foreground mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-light text-sm sm:text-base leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
