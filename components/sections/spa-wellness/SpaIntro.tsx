'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function SpaIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Animate Left Column Text
    gsap.fromTo(splitRef.current,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: splitRef.current,
          start: "top 80%",
        }
      }
    );

    // Animate Right Column Image
    gsap.fromTo(imageRef.current,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: splitRef.current,
          start: "top 80%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">

        {/* 2-Column Split */}
        <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-20 items-center">

          {/* Left Column: Story-driven copy */}
          <div ref={splitRef} className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-foreground text-balance">
              Intelligent Spa & Wellness Automation for Elevated Guest Experiences
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
              Create a calming and personalized wellness environment with automated lighting, soothing audio, temperature control, and privacy management. Deliver consistent comfort and relaxation across treatment rooms, wellness suites, and spa facilities.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
              Every detail shapes the guest's wellness journey. From calming lighting scenes and soothing background music to automated temperature and privacy controls, intelligent spa automation creates a peaceful environment where guests can fully relax. Staff can effortlessly manage every setting through a single interface, ensuring a consistent and personalized experience in every treatment room.
            </p>
          </div>

          {/* Right Column: Lifestyle image */}
          <div ref={imageRef} className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/5 border border-black/5 shadow-lg">
              <NextImage
                src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000&auto=format&fit=crop"
                alt="Smart Spa Automation Control Panel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
