'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

import imgMadhuri from '@/assets/curtain-automation/clients/madhuri.png';
import imgMittal from '@/assets/curtain-automation/clients/mittal.png';
import imgBkt from '@/assets/curtain-automation/clients/bkt.png';
import imgRaheja from '@/assets/curtain-automation/clients/raheja.png';
import imgKhazana from '@/assets/curtain-automation/clients/khazana.png';

const CLIENTS = [
  {
    name: 'Madhuri Dixit',
    type: 'Celebrity Residence',
    location: 'Mumbai',
    image: imgMadhuri,
  },
  {
    name: 'Rajan Mittal',
    type: 'Airtel, Private Estate',
    location: 'Delhi',
    image: imgMittal,
  },
  {
    name: 'BKT Farms',
    type: 'Expansive Farmhouse',
    location: 'Outskirts',
    image: imgBkt,
  },
  {
    name: 'Atul Raheja',
    type: 'Premium Residence',
    location: 'Mumbai',
    image: imgRaheja,
  },
  {
    name: 'Khazana Jewellery',
    type: 'Commercial Retail',
    location: 'Chennai',
    image: imgKhazana,
  },
];

export function CurtainClients() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    
    // Animate header text
    gsap.fromTo('.client-header-text', 
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Animate cards
    gsap.fromTo('.client-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: scrollRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="relative w-full bg-background pt-8 md:pt-12 pb-8 md:pb-12 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto mb-16 md:mb-24">
        <div className="max-w-4xl">
          <span className="client-header-text tracking-widest text-sm md:text-base text-accent mb-4 block">
            Prestigious Portfolio
          </span>
          <h2 className="client-header-text text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground mb-8 text-balance">
            Trusted by India's Leading Homeowners & Visionaries
          </h2>
          <p className="client-header-text text-sm md:text-base font-light tracking-wide text-foreground/70 leading-relaxed text-balance">
            ATPL is trusted by India's leading homeowners, business leaders, celebrities, and prestigious residences. Its portfolio includes distinguished clients such as Madhuri Dixit, Rajan Mittal (Airtel), BKT Farms, Atul Raheja, Khazana Jewellery (Chennai), along with hundreds of premium homes across the country.
          </p>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 md:gap-8 pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CLIENTS.map((client, idx) => (
            <div 
              key={idx} 
              className="client-card snap-start shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] flex flex-col group cursor-grab active:cursor-grabbing"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/5 mb-6">
                <NextImage 
                  src={client.image}
                  alt={client.name}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl md:text-2xl font-light text-foreground tracking-wide">
                  {client.name}
                </h3>
                <p className="text-sm text-accent tracking-widest">
                  {client.type} • {client.location}
                </p>
              </div>
            </div>
          ))}
          {/* Spacer for right padding on scroll */}
          <div className="shrink-0 w-1 sm:w-6" />
        </div>
      </div>
    </section>
  );
}
