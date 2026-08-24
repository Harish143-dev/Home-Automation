'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CheckCircle2 } from 'lucide-react';
import { DURATION, EASE, STAGGER } from '@/lib/animation.config';

const KEY_SOLUTIONS = [
  "Lighting & Shade Control",
  "AV & Video Conferencing",
  "Security & Access Control",
  "Wi-Fi & Networking",
  "HVAC Integration"
];

export function InstitutesOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.io-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.normal, ease: EASE.reveal }
    )
      .fromTo('.io-feature',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.tight, ease: EASE.reveal },
        "-=0.4"
      )
      .fromTo(imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: DURATION.slow, ease: EASE.premium },
        0
      );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* Left Content */}
        <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col">
          <span className="io-header tracking-[0.3em] text-accent mb-4 block text-sm font-medium">
            Smart Infrastructure
          </span>
          <h2 className="io-header text-foreground mb-6">
            Connected Campuses
          </h2>
          <p className="io-header text-muted-foreground text-base md:text-lg font-light leading-relaxed mb-10">
            Educational institutions need connected environments that support learning, simplify campus operations, improve energy efficiency, and strengthen safety. ATPL integrates lighting, AV, HVAC, security, networking, and room control systems to create smarter, more efficient and connected campuses.
          </p>

          <div className="flex flex-col gap-6">
            <h4 className="io-feature text-foreground mb-2">Key Solutions</h4>
            {KEY_SOLUTIONS.map((solution, i) => (
              <div key={i} className="io-feature flex gap-4 items-center">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" strokeWidth={2} />
                <span className="text-muted-foreground font-light text-base md:text-lg">
                  {solution}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div ref={imageRef} className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative rounded-[2rem] overflow-hidden shadow-2xl shadow-black/10">
          <NextImage
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop"
            alt="Modern educational campus"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
