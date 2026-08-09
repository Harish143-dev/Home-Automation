'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { MapPin, Phone } from 'lucide-react';

const CENTERS = [
  {
    city: 'Delhi Experience Centre',
    description: 'Experience thoughtfully designed smart home technologies, intelligent lighting control, and integrated automation solutions crafted for modern, high-end residences.',
    address: 'Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi – 110014',
    phones: ['11 24324113', '11 45643992', '11 24324115'],
    bookLink: '#book-visit-delhi',
    directionsLink: '#directions-delhi'
  },
  {
    city: 'Mumbai Experience Centre',
    description: 'ATPL has been delivering intelligent smart home technologies, refined lighting control, and integrated automation solutions for discerning homeowners across India.',
    address: '10/76, Apte Properties, Ground Floor, Parijat House, L.R. Papan Marg, Off Dr. Elijah Moses Road, Worli, Mumbai, Maharashtra – 400018',
    phones: ['22 49675653', '82912 39139'],
    bookLink: '#book-visit-mumbai',
    directionsLink: '#directions-mumbai'
  },
  {
    city: 'Bengaluru Experience Centre',
    description: 'Discover intelligent home automation with interactive demonstrations of lighting, shading, HVAC, and integrated smart home control systems.',
    address: '13, 100 Feet Ring Road, Anjaneya Nagar, Banashankari 3rd Stage, Bangalore, Karnataka – 560085',
    phones: ['80 4113 0438', '80 25270460'],
    bookLink: '#book-visit-bengaluru',
    directionsLink: '#directions-bengaluru'
  }
];

export function CurtainExperienceCenters() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Header Reveal
    gsap.fromTo('.exp-header-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Modern Stacking Animation
    const cards = gsap.utils.toArray('.exp-card-anim') as HTMLElement[];
    cards.forEach((card: HTMLElement, index: number) => {
      if (index < cards.length - 1) {
        gsap.to(card, {
          scale: 0.95,
          opacity: 0.4,
          y: -20,
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 85%',
            end: 'top 20%',
            scrub: true,
          }
        });
      }
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full bg-[#fcfcfc] px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5">
      <div className="max-w-7xl w-full mx-auto">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base exp-header-anim text-accent mb-4 block">
            Experience Centers
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl exp-header-anim text-foreground text-balance mb-6">
            Experience Motorized Shades Before You Buy
          </h2>
          <p className="exp-header-anim text-sm sm:text-base md:text-lg font-light tracking-wide text-muted leading-relaxed text-balance mb-8">
            Visit our experience centers and experience the elegance, quiet operation, and intelligent control of motorized shades in a real smart home environment.
          </p>
          <div className="exp-header-anim inline-block bg-background border border-black/5 rounded-full px-6 py-3 shadow-sm">
            <span className="text-sm font-medium tracking-wide text-foreground">
              <strong className="text-accent">1,000+</strong> clients have experienced our solutions before making a decision
            </span>
          </div>
        </div>

        {/* Experience Centers Stacked */}
        <div className="exp-stack-container relative flex flex-col gap-10 lg:gap-16 pb-24">
          {CENTERS.map((center, idx) => (
            <div
              key={idx}
              className="exp-card-anim sticky top-[15vh] lg:top-[20vh] bg-background rounded-3xl p-8 md:p-12 lg:p-16 border border-black/5 flex flex-col lg:flex-row gap-10 lg:gap-20 shadow-xl relative overflow-hidden group will-change-transform"
              style={{ zIndex: idx }}
            >
              {/* Subtle top/left accent border */}
              <div className="absolute top-0 left-0 right-0 lg:right-auto lg:bottom-0 h-1 lg:h-full lg:w-1 bg-accent/20 transition-colors duration-500 group-hover:bg-accent" />

              {/* Left Column: Title & Description */}
              <div className="flex flex-col lg:w-5/12 justify-center">
                <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-4">
                  {center.city.replace(' Experience Centre', '')}
                  <span className="block text-lg md:text-xl text-muted mt-2">Experience Centre</span>
                </h3>

                <p className="text-base md:text-lg font-light text-muted leading-relaxed">
                  {center.description}
                </p>
              </div>

              {/* Right Column: Contact & CTAs */}
              <div className="flex flex-col lg:w-7/12 justify-center lg:border-l lg:border-black/5 lg:pl-16">
                <div className="flex flex-col gap-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <span className="text-base md:text-lg font-light text-foreground/80 leading-relaxed">
                      {center.address}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <span className="text-base md:text-lg font-light text-foreground/80 leading-relaxed flex flex-col gap-1.5">
                      {center.phones.map((phone, i) => (
                        <span key={i}>{phone}</span>
                      ))}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={center.bookLink} className="flex-1 sm:flex-none">
                    <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                      Book a Visit
                    </Button>
                  </Link>
                  <Link href={center.directionsLink} className="flex-1 sm:flex-none">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Get Directions
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
