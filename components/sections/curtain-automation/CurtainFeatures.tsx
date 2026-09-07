'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';

import imgLifestyle from '@/assets/curtain-automation/features/lifestyle.png';
import imgBedroom from '@/assets/curtain-automation/features/bedroom.png';
import imgOpen from '@/assets/curtain-automation/features/open.png';

export function CurtainFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // The sticky-scroll layout carries the section natively.
    // Removed text and image fade-ups to prevent motion fatigue.

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">

        {/* Left Side: Sticky Text */}
        <div ref={textRef} className="w-full lg:w-1/2 lg:sticky lg:top-[30vh] flex flex-col gap-6">
          <h2 className=" text-foreground text-balance">
            Bring Comfort, Privacy & Natural Light Under Intelligent Control
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-foreground/70 leading-relaxed text-balance max-w-lg">
            Motorized shades do more than open and close curtains. They automatically adjust to changing daylight, helping reduce glare, manage indoor heat, provide privacy when needed, and become part of your daily routines through schedules, scenes, or smart home controls.
          </p>
        </div>

        {/* Right Side: Scrolling Images */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-16 lg:gap-24">

          <div className="feature-img-container relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm border border-black/5 bg-black/5">
            <NextImage
              src={imgLifestyle}
              alt="Luxury lifestyle with smart curtains"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
          </div>

          <div className="feature-img-container relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm border border-black/5 bg-black/5">
            <NextImage
              src={imgBedroom}
              alt="Luxury bedroom with motorized blackout curtains"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
          </div>

          <div className="feature-img-container relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-sm border border-black/5 bg-black/5">
            <NextImage
              src={imgOpen}
              alt="Curtains opening automatically to scenic view"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] hover:scale-105"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
