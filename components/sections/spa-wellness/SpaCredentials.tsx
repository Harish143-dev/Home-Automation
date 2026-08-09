"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CREDENTIALS = [
  {
    title: "Lutron Electronics (USA) Authorized Distributor",
    description: "Proud to be an authorized distributor for Lutron Electronics (USA), delivering world-class lighting, and shading solutions for wellness spaces.",
  },
  {
    title: "Founding India Member of CEDIA",
    description: "Serving as a founding India member of the Custom Electronic Design & Installation Association (CEDIA), upholding international engineering benchmarks.",
  },
  {
    title: "2026 Lutron Hall of Fame",
    description: "First company in Asia to receive this recognition for our outstanding contribution to the automation industry.",
  },
  {
    title: "Multiple Residential & Hospitality Business Awards",
    description: "Recipient of multiple awards, demonstrating our commitment to unparalleled quality and execution in hospitality and wellness projects.",
  },
  {
    title: "Nationally recognized",
    description: "Nationally recognized for excellence in home and hospitality automation, delivering bespoke integrations for India's most prestigious projects.",
  }
];

export function SpaCredentials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray('.credential-card');

    cards.forEach((card: any) => {
      const line = card.querySelector('.credential-line');
      const title = card.querySelector('.credential-title');
      const desc = card.querySelector('.credential-desc');
      const num = card.querySelector('.credential-num');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(num,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, 0
      )
        .fromTo(line,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: 'left', duration: 1, ease: 'power3.inOut' }, 0.2
        )
        .fromTo(title,
          { y: 30, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
          { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1, ease: 'power3.out' }, 0.4
        )
        .fromTo(desc,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 0.6
        );
    });
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section className="py-12 md:py-16 relative bg-background text-foreground overflow-hidden border-t border-black/5" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">

          {/* Sticky Left Column */}
          <div className="w-full lg:w-[40%] xl:w-1/3 lg:sticky lg:top-40 flex flex-col gap-4 z-10">
            <h5 className="text-accent block mb-2">
              Industry Accolades
            </h5>
            <h2 className="text-foreground text-balance">
              Certifications &<br />Awards
            </h2>
          </div>

          {/* Scrolling Right Column */}
          <div className="w-full lg:w-[60%] xl:w-2/3 flex flex-col gap-20 lg:gap-32 mt-8 lg:mt-0">
            {CREDENTIALS.map((cred, i) => (
              <div key={i} className="credential-card flex flex-col relative z-10">
                <span className="credential-num text-8xl md:text-[10rem] lg:text-[12rem] leading-none font-light text-foreground/5 absolute -top-12 md:-top-16 -left-4 md:-left-8 lg:-left-12 -z-10 pointer-events-none select-none">
                  0{i + 1}
                </span>

                <div className="w-16 h-[1px] bg-foreground/20 mb-6 credential-line" />

                <h3 className="text-foreground mb-4 credential-title">
                  {cred.title}
                </h3>

                <p className="text-muted-foreground font-light leading-relaxed max-w-lg credential-desc text-base sm:text-lg">
                  {cred.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
