'use client';

import React, { useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

// Reusing standard client images
import imgMadhuri from '@/assets/curtain-automation/clients/madhuri.png';
import imgMittal from '@/assets/curtain-automation/clients/mittal.png';
import imgBkt from '@/assets/curtain-automation/clients/bkt.png';
import imgRaheja from '@/assets/curtain-automation/clients/raheja.png';
import imgKhazana from '@/assets/curtain-automation/clients/khazana.png';
import imgUjjawal from '@/assets/curtain-automation/clients/bkt.png';

const CLIENTS = [
  { name: 'Madhuri Dixit', type: 'Celebrity Residence', location: 'Mumbai', image: imgMadhuri },
  { name: 'Rajan Mittal', type: 'Airtel, Private Estate', location: 'Delhi', image: imgMittal },
  { name: 'BKT Farms', type: 'Expansive Farmhouse', location: 'Outskirts', image: imgBkt },
  { name: 'Atul Raheja', type: 'Premium Residence', location: 'Mumbai', image: imgRaheja },
  { name: 'Khazana Jewellery', type: 'Commercial Retail', location: 'Chennai', image: imgKhazana },
  { name: 'Ujjawal Munjal', type: 'Luxury Residence', location: 'Delhi', image: imgUjjawal }
];

const HOSPITALITY_BRANDS = [
  'ITC', 'Marriott', 'Four Seasons', 'Taj', 'Hilton', 'Hyatt', 'Oberoi', 'IHG'
];

export function RestaurantClients() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !trackRef.current || !pinContainerRef.current) return;

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

    // Animate cards initial appearance
    gsap.fromTo('.client-card',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'top 75%',
        }
      }
    );

    // Horizontal Scroll Animation
    const track = trackRef.current;

    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      let viewportWidth = track.parentElement?.clientWidth || window.innerWidth;
      return Math.max(0, trackWidth - viewportWidth);
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: 'center center',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto mb-16 md:mb-24">
        <div className="max-w-4xl">
          <span className="tracking-[0.1em] client-header-text text-accent mb-4 block">
            Prestigious Portfolio
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl client-header-text text-foreground mb-8 text-balance">
            Trusted by India's Leading Visionaries
          </h2>
          <p className="client-header-text text-muted-foreground leading-relaxed text-balance">
            ATPL is trusted by India's leading homeowners, business leaders, celebrities, and prestigious residences. Its portfolio includes distinguished clients such as Madhuri Dixit, Rajan Mittal (Airtel), BKT Farms, along with hundreds of premium homes across the country.
          </p>
        </div>
      </div>

      <div ref={pinContainerRef} className="max-w-7xl w-full mx-auto md:overflow-hidden mb-20 md:mb-32">
        <div
          ref={trackRef}
          className="flex w-full md:w-max overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory hide-scrollbar gap-6 md:gap-8 pb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="client-card snap-start md:snap-align-none shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] flex flex-col group cursor-grab active:cursor-grabbing"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden bg-black/5 mb-6">
                <NextImage
                  src={client.image}
                  alt={client.name}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">
                  {client.name}
                </h3>
                <p className="text-muted-foreground">
                  {client.type} • {client.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hospitality Marquee */}
      <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 md:px-16 lg:px-24 pb-16 md:pb-24">
        <div className="w-full bg-accent/[0.03] border border-accent/10 rounded-[2rem] py-12 md:py-16 overflow-hidden flex flex-col items-center">
          <span className="tracking-[0.1em] text-accent mb-8 md:mb-12">
            Trusted Hospitality Brands
          </span>
          <div className="w-[150%] md:w-[120%] flex overflow-hidden opacity-80 group">
            <div className="flex gap-16 md:gap-24 items-center whitespace-nowrap animate-marquee-left">
              {/* Render 4 sets to ensure infinite seamless scrolling */}
              {[...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS].map((brand, i) => (
                <span key={i} className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground hover:text-accent transition-colors duration-300">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
