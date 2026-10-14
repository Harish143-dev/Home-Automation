'use client';

import React, { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

export interface BrandItem {
  name: string;
  src: string;
}

const DEFAULT_BRANDS: BrandItem[] = [
  { name: 'Lutron', src: '/client-logos/Lutron.png' },
  { name: 'Crestron', src: '/client-logos/Crestron.png' },
  { name: 'Savant', src: '/client-logos/Savant.png' },
  { name: 'Control4', src: '/client-logos/Control%204.png' },
  { name: 'Bose', src: '/client-logos/Bose.png' },
  { name: 'Bowers & Wilkins', src: '/client-logos/Bowers%20%26%20Wilkins.png' },
  { name: 'Bang & Olufsen', src: '/client-logos/b%20%26%20O.png' },
  { name: 'Sony', src: '/client-logos/Sony.png' },
  { name: 'Samsung', src: '/client-logos/Samsung.png' },
  { name: 'LG', src: '/client-logos/LG.png' },
  { name: 'Sonance', src: '/client-logos/Sonance.png' },
  { name: 'Waterfall Audio', src: '/client-logos/waterfal%20Audio.png' },
  { name: 'Architettura Sonora', src: '/client-logos/Architettura%20Sonora.png' },
  { name: 'Dali', src: '/client-logos/Dali.png' },
  { name: 'LOEWE', src: '/client-logos/LOEWE.png' },
  { name: 'Screen Excellence', src: '/client-logos/Screen%20excellence.png' },
  { name: 'Optoma', src: '/client-logos/Optoma.png' },
  { name: 'Absen', src: '/client-logos/Absen.png' },
  { name: 'Moorgen', src: '/client-logos/Moorgen.png' },
  { name: 'Jung', src: '/client-logos/Jung.png' },
  { name: 'Ekinex', src: '/client-logos/Ekinex%20-%20White.png' },
  { name: 'Future KNX', src: '/client-logos/Future%20KNX.png' },
  { name: 'EAE Elektrik', src: '/client-logos/EAE%20ELektrik.png' },
  { name: 'T&J Electric', src: '/client-logos/T%26J%20Electric.png' },
  { name: 'Casadigi', src: '/client-logos/Casadigi.png' },
  { name: 'Elan', src: '/client-logos/Elan.png' },
  { name: 'Cisco', src: '/client-logos/Cisco.png' },
  { name: 'Aruba', src: '/client-logos/Aruba.png' },
  { name: 'Ruckus', src: '/client-logos/Ruckus.png' },
  { name: 'Grandstream', src: '/client-logos/Grandstream.png' },
  { name: 'Honeywell', src: '/client-logos/Honeywell.png' },
  { name: 'CP Plus', src: '/client-logos/CP%20Plus.png' },
  { name: 'Vivotech', src: '/client-logos/Vivotech.png' },
  { name: 'Ekey', src: '/client-logos/Ekey.png' },
];

interface BrandTickerProps {
  brands?: BrandItem[];
}

export function BrandTicker({ brands = DEFAULT_BRANDS }: BrandTickerProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    // 1. Initial Intro Fade-In
    gsap.from(trackRef.current, {
      opacity: 0,
      y: 10,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      }
    });

    if (prefersReducedMotion) {
      return;
    }

    // 2. Seamless Infinite Loop Tracker
    tlRef.current = gsap.timeline({ repeat: -1 });
    tlRef.current.to(trackRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 75,
    });

    // 3. Scroll Velocity Boost
    let timeout: ReturnType<typeof setTimeout>;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      end: 'bottom top',
      onUpdate: (self) => {
        if (!tlRef.current) return;

        const velocity = Math.abs(self.getVelocity());
        if (velocity > 0) {
          const maxClampSpeed = 3.5;
          const timeScale = 1 + (velocity / 350);

          gsap.to(tlRef.current, {
            timeScale: Math.min(timeScale, maxClampSpeed),
            duration: 0.2,
            ease: 'power2.out'
          });

          clearTimeout(timeout);
          timeout = setTimeout(() => {
            gsap.to(tlRef.current, {
              timeScale: 1,
              duration: 0.8,
              ease: 'power2.out'
            });
          }, 100);
        }
      }
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const pauseLoop = () => gsap.to(tlRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
  const playLoop = () => gsap.to(tlRef.current, { timeScale: 1, duration: 0.6, ease: 'power2.out' });

  // Array duplicated specifically to allow standard -50% complete track transformation.
  const LOOPED_BRANDS = [...brands, ...brands];

  return (
    <section
      ref={sectionRef}
      className="py-10 md:py-14 relative w-full overflow-hidden border-y border-white/10 bg-secondary text-white px-5 sm:px-8 md:px-16 lg:px-24"
    >
      {/* Edge Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-secondary/80 backdrop-blur-[4px] [mask-image:linear-gradient(to_right,black_20%,transparent_100%)] md:w-48 lg:w-64" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-secondary/80 backdrop-blur-[4px] [mask-image:linear-gradient(to_left,black_20%,transparent_100%)] md:w-48 lg:w-64" />

      {/* Interactive Main Ticker Row */}
      <div
        className="group/ticker flex w-max pointer-events-auto items-center"
        onMouseEnter={pauseLoop}
        onMouseLeave={playLoop}
        ref={trackRef}
      >
        {LOOPED_BRANDS.map((brand, i) => (
          <div
            key={i}
            className="brand-item flex-shrink-0 px-6 sm:px-10 md:px-14 flex items-center justify-center cursor-default opacity-65 transition-all duration-300 ease-out group-hover/ticker:opacity-35 hover:!opacity-100 hover:scale-105"
          >
            <img
              src={brand.src}
              alt={brand.name}
              title={brand.name}
              className="h-7 sm:h-9 md:h-11 max-w-[130px] sm:max-w-[160px] w-auto object-contain brightness-0 invert pointer-events-none select-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
