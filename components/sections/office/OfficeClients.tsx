'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { scheduleScrollRefresh } from '@/lib/scrollRefresh';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { DURATION, EASE, STAGGER } from '@/lib/animation.config';

const CLIENTS = [
  { name: 'EY', location: 'Gurgaon' },
  { name: 'Barclays Bank', location: 'Chennai' },
  { name: 'Rio Tinto', location: 'Gurgaon' },
  { name: 'Lupin Corporate Office', location: 'Mumbai' },
  { name: 'HSBC Office', location: 'Gurugram & Mumbai' },
  { name: 'J. M. Baxi & Co.', location: 'Noida' },
  { name: 'ANZ', location: 'Bangalore' },
  { name: "Prime Minister's Office", location: 'New Delhi' },
  { name: 'Serum Institute Corp. Office', location: 'Pune' }
];

export function OfficeClients() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo('.oc-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.normal, ease: EASE.reveal }
    )
    .fromTo('.oc-client',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.fast, ease: EASE.reveal },
      "-=0.4"
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">

        <div className="text-center max-w-4xl mx-auto z-10 py-6 px-4 mb-12 lg:mb-16">
          <span className="oc-header tracking-[0.1em] text-accent mb-4 block uppercase text-sm font-medium">
            Our Portfolio
          </span>
          <h2 className="oc-header font-light leading-[1.2] tracking-wide text-3xl sm:text-4xl text-foreground text-balance">
            Trusted by Corporate Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="oc-client bg-panel border border-black/5 rounded-[1.5rem] p-8 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-center min-h-[160px]"
            >
              <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl text-foreground mb-2">
                {client.name}
              </h3>
              <p className="text-sm font-medium tracking-[0.1em] text-muted-foreground uppercase">
                {client.location}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
