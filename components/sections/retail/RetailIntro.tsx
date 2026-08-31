'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { Lightbulb, Store, Zap, Settings2, Network } from 'lucide-react';
import { EASE, DURATION, STAGGER } from '../../../lib/animation.config';

const HIGHLIGHTS = [
  {
    title: "Create the Right Ambience",
    description: "Set lighting levels and background audio according to your brand, store layout, customer flow, and time of day.",
    icon: Lightbulb
  },
  {
    title: "Deliver Consistent Brand Experiences",
    description: "Maintain consistent lighting, audio, and environmental settings across different stores and locations.",
    icon: Store
  },
  {
    title: "Improve Energy Efficiency",
    description: "Automate lighting and other connected systems based on schedules, occupancy, and operating hours to reduce unnecessary energy consumption.",
    icon: Zap
  },
  {
    title: "Simplify Store Operations",
    description: "Centralize the control of essential systems through intuitive interfaces, giving your team an easier way to manage the store.",
    icon: Settings2
  },
  {
    title: "Support a Connected Retail Environment",
    description: "Integrate lighting control, background audio, Wi-Fi & LAN systems, and CCTV security into a coordinated technology infrastructure.",
    icon: Network
  }
];

export function RetailIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate image sliding in from left
    tl.fromTo(imageRef.current,
      { x: -50, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
      {
        x: 0,
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        duration: DURATION.slow,
        ease: EASE.reveal
      }
    );

    // Animate content sliding up
    if (contentRef.current) {
      const heading = contentRef.current.querySelector('h2');
      const paragraph = contentRef.current.querySelector('p');

      tl.fromTo([heading, paragraph],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.normal, stagger: 0.1, ease: EASE.reveal },
        "-=0.8"
      );
    }

    // Animate list items
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(el,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: DURATION.normal, ease: EASE.reveal },
        "-=0.6" // overlapping for fluid staggered feel
      );
    });

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Left Side: Image */}
        <div ref={imageRef} className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden opacity-0">
          <NextImage
            src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=2070&auto=format&fit=crop"
            alt="Retail Store Automation Environment"
            fill
            className="object-cover transition-transform duration-[2s] hover:scale-105"
          />
        </div>

        {/* Right Side: Content */}
        <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-foreground text-balance">
              Turn Your Store Into an Experience
            </h2>
            <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed text-balance">
              Today&apos;s retail environment is about more than displaying products. Lighting, sound, temperature, visual experiences, and seamless technology all contribute to how customers perceive your brand.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                ref={el => { itemsRef.current[i] = el; }}
                className="flex gap-4 md:gap-6 items-start opacity-0"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/5 flex items-center justify-center shrink-0 border border-black/5">
                  <item.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="text-lg md:text-xl text-foreground font-medium">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                    {item.description}
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
