'use client';

import React, { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { CheckCircle2, Home, Building2, Hotel, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE, DURATION, STAGGER } from '@/lib/animation.config';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';

import residentialImage from '@/assets/home/services/Residence.webp';
import commercialImage from '@/assets/home/services/EY Gurgaon.webp';
import hospitalityImage from '@/assets/home/services/Oberoi Rajvilas.webp';

export type CalculatorType = 'home' | 'office' | 'hotel';

interface CalculatorCardData {
  id: CalculatorType;
  category: string;
  image: StaticImageData;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  pointers: string[];
  ctaText: string;
  tag: string;
}

const CALCULATOR_CARDS: CalculatorCardData[] = [
  {
    id: 'home',
    category: 'Smart Home / Villa',
    image: residentialImage,
    icon: Home,
    title: 'Smart Home Energy Savings Calculator',
    description:
      'Discover the potential energy and electricity-cost savings from intelligent lighting, HVAC, shades and energy management in your home.',
    pointers: [
      'Potential annual energy savings',
      'Estimated electricity-cost savings',
      'Monthly savings',
      'Potential savings by automation system',
    ],
    ctaText: 'Calculate My Home Savings',
    tag: 'Private Estates & Luxury Residences',
  },
  {
    id: 'office',
    category: 'Office / Commercial Building',
    image: commercialImage,
    icon: Building2,
    title: 'Office Automation Cost Savings Calculator',
    description:
      'Estimate the potential operating-cost savings from intelligent lighting, HVAC, occupancy management and building automation.',
    pointers: [
      'Potential annual cost savings',
      'Energy savings',
      'Monthly savings',
      'Potential automation payback',
    ],
    ctaText: 'Calculate Office Savings',
    tag: 'Workspaces & Enterprise Real Estate',
  },
  {
    id: 'hotel',
    category: 'Hotel / Resort',
    image: hospitalityImage,
    icon: Hotel,
    title: 'Hotel Energy & Cost Savings Calculator',
    description:
      'Estimate the potential energy and operating-cost savings across guest rooms, public areas and other hotel facilities.',
    pointers: [
      'Annual energy savings',
      'Annual cost savings',
      'Savings per room',
      'Potential automation payback',
    ],
    ctaText: 'Calculate Hotel Savings',
    tag: 'Hotels, Resorts & Guest Properties',
  },
];

interface ChooseCalculatorSectionProps {
  activeCalculator: CalculatorType;
  onSelectCalculator: (type: CalculatorType) => void;
}

export function ChooseCalculatorSection({
  activeCalculator,
  onSelectCalculator,
}: ChooseCalculatorSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(
      '.calc-header-item',
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
      '.calc-card-item',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.slow,
        stagger: STAGGER.wide,
        ease: EASE.reveal,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const handleCardClick = (id: CalculatorType) => {
    onSelectCalculator(id);
    const target = document.getElementById('calculator-tool');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="choose-calculator"
      className="py-16 md:py-24 relative w-full bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="calc-header-item flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-black/20" />
            <span className="tracking-[0.3em] text-xs sm:text-sm uppercase text-accent font-light">
              Tailored Models
            </span>
            <div className="h-[1px] w-8 bg-black/20" />
          </div>

          <h2 className="calc-header-item text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-4">
            Choose Your Calculator
          </h2>

          <p className="calc-header-item font-light text-base sm:text-lg leading-relaxed text-muted">
            Select the calculator that best matches your property or project.
          </p>
        </div>

        {/* 3-Column Calculator Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {CALCULATOR_CARDS.map((card) => {
            const Icon = card.icon;
            const isSelected = activeCalculator === card.id;

            return (
              <div
                key={card.id}
                className={`calc-card-item group relative flex flex-col justify-between bg-white rounded-2xl border transition-all duration-300 shadow-lg shadow-black/5 overflow-hidden ${
                  isSelected
                    ? 'border-accent ring-2 ring-accent/20'
                    : 'border-border hover:border-black/20 hover:shadow-xl'
                }`}
              >
                {/* Image Header with Badge */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  />
                  {/* Subtle Dark Gradient Overlay for Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-normal text-white bg-black/40 backdrop-blur-md border border-white/20">
                      <Icon className="w-3.5 h-3.5 text-accent-soft" />
                      {card.category}
                    </span>
                  </div>

                  {/* Active Selection Badge */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-white bg-accent shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Selected
                      </span>
                    </div>
                  )}

                  {/* Tag on bottom of image */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="text-white/80 text-xs tracking-wider uppercase font-light">
                      {card.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    {/* H3 Heading */}
                    <h3 className="font-light leading-[1.25] tracking-wide text-xl sm:text-2xl text-foreground mb-3">
                      {card.title}
                    </h3>

                    {/* Short Description */}
                    <p className="font-light text-sm sm:text-base leading-relaxed text-muted mb-6">
                      {card.description}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-border mb-6" />

                    {/* Pointers: What you can estimate */}
                    <div className="mb-8">
                      <span className="block text-xs uppercase tracking-[0.2em] text-foreground/80 font-medium mb-3">
                        What you can estimate:
                      </span>
                      <ul className="space-y-2.5">
                        {card.pointers.map((pointer, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-sm font-light text-muted"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{pointer}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleCardClick(card.id)}
                      className="w-full"
                    >
                      <Button
                        variant={isSelected ? 'interactive' : 'outline'}
                        size="lg"
                        className="w-full justify-between"
                      >
                        <span>{card.ctaText}</span>
                      </Button>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
