'use client';

import React, { useRef, useState } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Plus, Minus } from 'lucide-react';

const SHADE_TYPES = [
  {
    title: 'Roller Shades',
    description: 'A versatile solution for bedrooms, living rooms, and offices, offering smooth operation and effective daylight control.'
  },
  {
    title: 'Drapery Systems',
    description: 'Motorized curtain tracks for sheer and blackout curtains with quiet, automated operation.'
  },
  {
    title: 'Roman Shades',
    description: 'Fabric shades that fold into neat pleats when raised, suitable for residential interiors.'
  },
  {
    title: 'Venetian Blinds',
    description: 'Adjustable slats allow precise control of natural light and privacy.'
  },
  {
    title: 'Horizontal Sheer Blinds',
    description: 'Combine soft fabric with adjustable vanes to manage daylight while maintaining outdoor views.'
  },
  {
    title: 'Kirbé Vertical Drapery System',
    description: 'A curved drapery system that stacks fabric neatly while providing smooth opening and closing.'
  },
  {
    title: 'Tensioned Shades',
    description: 'Designed for skylights, angled windows, and other specialty applications where fabric must remain under tension.'
  }
];

export function CurtainTypes() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number>(0);

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo('.type-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo('.type-accordion-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.types-accordion',
          start: 'top 85%',
        }
      }
    );
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-secondary text-white px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden">

      {/* Noise Texture for Premium Dark Feel */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10">

        {/* Left Side: Sticky Text */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-[30vh] flex flex-col items-start self-start">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base type-header text-white/50 mb-4 block">
            Curtain & Shade Types
          </span>
          <h2 className="type-header text-white text-balance mb-6">
            Solutions for Every Window
          </h2>
          <p className="type-header text-sm sm:text-base md:text-lg font-light tracking-wide text-white/70 leading-relaxed text-balance">
            Explore our extensive range of motorized window treatments, from elegant drapery systems to specialized tensioned shades for complex architectures.
          </p>
        </div>

        {/* Right Side: Headless Accordion */}
        <div className="types-accordion w-full lg:w-2/3 flex flex-col">
          <div className="border-t border-white/10" />

          {SHADE_TYPES.map((type, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="type-accordion-item border-b border-white/10 flex flex-col"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between py-4 sm:py-6 text-left group"
                >
                  <h3 className={`transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {type.title}
                  </h3>
                  <div className={`ml-4 shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? (
                      <Minus className="text-xl sm:text-2xl lg:text-3xl w-5 h-5 text-white" strokeWidth={1} />
                    ) : (
                      <Plus className="w-5 h-5 text-white/50 group-hover:text-white" strokeWidth={1} />
                    )}
                  </div>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-6 text-sm sm:text-base text-white/60 font-light leading-relaxed max-w-2xl pr-8">
                    {type.description}
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
