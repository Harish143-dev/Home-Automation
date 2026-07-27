'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { MapPin, Phone, Navigation } from 'lucide-react';
import { Button } from '../../ui/button';
import Link from 'next/link';

const CENTERS = [
  {
    city: "Delhi Experience Centre",
    description: "Experience thoughtfully designed smart home technologies, intelligent lighting control, and integrated automation solutions crafted for modern, high-end residences.",
    address: "Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi – 110014",
    phones: ["011 24324113", "011 45643992", "011 24324115"],
  },
  {
    city: "Mumbai Experience Centre",
    description: "ATPL has been delivering intelligent smart home technologies, refined lighting control, and integrated automation solutions for discerning homeowners across India.",
    address: "10/76, Apte Properties, Ground Floor, Parijat House, L.R. Papan Marg, Off Dr. Elijah Moses Road, Worli, Mumbai, Maharashtra – 400018",
    phones: ["022 49675653", "082912 39139"],
  },
  {
    city: "Bengaluru Experience Centre",
    description: "Discover intelligent home automation with interactive demonstrations of lighting, shading, HVAC, and integrated smart home control systems.",
    address: "13, 100 Feet Ring Road, Anjaneya Nagar, Banashankari 3rd Stage, Bangalore, Karnataka – 560085",
    phones: ["080 4113 0438", "080 25270460"],
  }
];

export function SecurityExperienceCenters() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Header animation
    gsap.fromTo('.ec-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // Cards animation with stagger
    gsap.fromTo('.ec-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '.ec-grid',
          start: 'top 75%',
        }
      }
    );

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative w-full bg-[#f8f8f8] px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden border-t border-black/5">

      {/* Decorative subtle background map/glow */}
      <div className="absolute top-0 right-0 w-full h-full bg-accent/5 rounded-full blur-[150px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-16 md:gap-24">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base ec-header text-accent mb-4 block">
            Experience Centers
          </span>
          <h2 className="ec-header text-foreground text-balance mb-6">
            Experience Motorized Shades Before You Buy
          </h2>
          <p className="ec-header text-sm md:text-base lg:text-lg font-light tracking-wide text-muted-foreground leading-relaxed text-balance max-w-3xl">
            Visit our experience centers and experience the elegance, quiet operation, and intelligent control of motorized shades in a real smart home environment.
          </p>
        </div>

        {/* Experience Centers Grid */}
        <div className="ec-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CENTERS.map((center, idx) => (
            <div
              key={idx}
              className="ec-card bg-white border border-black/5 p-8 sm:p-10 rounded-[2rem] flex flex-col justify-between hover:shadow-xl hover:shadow-black/[0.03] hover:border-black/10 hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="flex flex-col gap-6 mb-10">
                <h3 className="text-foreground group-hover:text-accent transition-colors duration-300">
                  {center.city}
                </h3>
                <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed min-h-[80px]">
                  {center.description}
                </p>

                <div className="w-full h-[1px] bg-black/5 my-2" />

                {/* Contact Info */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                    <p className="text-sm md:text-base font-light text-foreground/80 leading-relaxed">
                      {center.address}
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div className="flex flex-col gap-1">
                      {center.phones.map((phone, pIdx) => (
                        <a key={pIdx} href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-sm md:text-base font-light text-foreground/80 hover:text-accent transition-colors">
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/contact" className="w-full">
                  <Button variant="interactive" size="lg" className="w-full">
                    Book a Visit
                  </Button>
                </Link>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(center.address)}`} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" size="lg" className="w-full justify-center">
                    Get Directions
                    <Navigation className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
