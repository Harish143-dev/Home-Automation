"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { DURATION, EASE, STAGGER } from "@/lib/animation.config";
import { MapPin, Phone } from "lucide-react";

const LOCATIONS = [
  {
    city: "Delhi",
    address: "Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi 110014",
    phones: ["+91-11-24324113", "+91-11-45643992", "+91-11-24324115"]
  },
  {
    city: "Mumbai",
    address: "10/76, Apte Properties, Ground Floor Parijat House, LR Papan Marg, off Doctor Elijah Moses Road, Worli, Mumbai, Maharashtra 400018",
    phones: ["+91-22-49675653", "+91-82912-39139"]
  },
  {
    city: "Bengaluru",
    address: "13, 100 Feet Ring Road, Anjaneya Nagar, Bangalore South Banashankari 3 Rd Stage, Bangalore 560085, Karnataka",
    phones: ["+91-80-4113-0438", "+91-80-25270460"]
  }
];

export default function OurLocations() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => scheduleScrollRefresh(),
      }
    });

    // Header reveal
    tl.fromTo(".loc-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: DURATION.slow, ease: EASE.reveal }
    );

    // Locations reveal
    tl.fromTo(".loc-item",
      { y: 40, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: DURATION.slow, 
        ease: "power3.out", 
        stagger: STAGGER.wide 
      },
      "-=0.6"
    );

    // Divider lines reveal
    tl.fromTo(".loc-divider",
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1, ease: "power3.inOut", stagger: 0.2 },
      "-=0.8"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-locations"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-locations)" />
      </svg>

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        
        {/* Header */}
        <div className="loc-header text-center max-w-3xl mx-auto space-y-4 mb-20 md:mb-32 opacity-0">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Our Locations
          </span>
          <h2 className="">
            Experience Centers & Offices
          </h2>
        </div>

        {/* Centered Locations Layout with Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {LOCATIONS.map((loc, idx) => (
            <div 
              key={idx} 
              className="loc-item flex flex-col items-center text-center opacity-0 group py-10 md:py-0 px-4 md:px-8 lg:px-12 first:pt-0 md:first:pt-0 last:pb-0 md:last:pb-0"
            >
              <h3 className="mb-8 text-foreground transition-colors duration-300">
                {loc.city}
              </h3>
              
              <div className="flex-grow flex flex-col space-y-8 w-full items-center">
                {/* Address */}
                <div className="flex flex-col items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent opacity-80" />
                  <p className="text-muted font-light text-[15px] leading-relaxed max-w-[280px]">
                    {loc.address}
                  </p>
                </div>

                {/* Phones */}
                <div className="flex flex-col items-center gap-3">
                  <Phone className="w-5 h-5 text-accent opacity-80" />
                  <div className="flex flex-col items-center gap-1.5">
                    {loc.phones.map((phone, pIdx) => (
                      <a 
                        key={pIdx} 
                        href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                        className="text-foreground/80 hover:text-accent font-light text-[15px] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
