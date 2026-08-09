'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function GuestRoomIntro() {
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

          {/* Left Column: Copy */}
          <div ref={splitRef} className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-foreground text-balance">
              Every Stay Begins with an Exceptional Guest Room Experience
            </h2>
            <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
              Today's guests expect comfort, convenience, and personalized control. Intelligent guest room automation enables effortless management of lighting, temperature, shades, and room settings while improving operational efficiency and reducing energy consumption.
            </p>
            <p className="text-base md:text-lg font-light text-muted-foreground leading-relaxed text-balance">
              Guest room automation allows guests to create the right ambience with a single touch. Lighting scenes can be adjusted for reading, relaxing, or sleeping, while motorized shades provide convenient daylight and privacy control. Integrated temperature control maintains a comfortable environment throughout the stay, and intuitive engraved keypads make room controls simple and easy to use. The system enhances guest comfort while helping hotels optimize energy usage and streamline room operations.
            </p>
          </div>

          {/* Right Column: Image */}
          <div ref={imageRef} className="w-full md:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-black/5 border border-black/5 shadow-lg">
              <NextImage
                src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2000&auto=format&fit=crop"
                alt="Intelligent Guest Room Experience"
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
