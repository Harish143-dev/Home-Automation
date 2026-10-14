"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { ArrowUpRight, MapPin, Phone, Navigation } from "lucide-react";

const LOCATIONS = [
  {
    id: "delhi",
    index: "01",
    city: "New Delhi",
    title: "Delhi Experience Centre",
    address: "Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi 110014",
    phones: ["+91-11-24324113", "+91-11-45643992", "+91-11-24324115"],
    mapUrl: "https://www.google.com/maps?daddr=Lower+Ground+Floor,+D20,+Block+D,+Jangpura,+New+Delhi,+Delhi+110014"
  },
  {
    id: "mumbai",
    index: "02",
    city: "Mumbai",
    title: "Mumbai Experience Centre",
    address: "10/76, Apte Properties, Ground Floor Parijat House, LR Papan Marg, off Doctor Elijah Moses Road, Worli, Mumbai, Maharashtra 400018",
    phones: ["+91-22-49675653", "+91-82912-39139"],
    mapUrl: "https://www.google.com/maps?daddr=10/76,+Apte+properties,+Ground+floor+Parijat+house,+LR+Papan+Marg,+off+Doctor+Elijah+Moses+Road,+Worli,+Mumbai,+Maharashtra+400018"
  },
  {
    id: "bangalore",
    index: "03",
    city: "Bengaluru",
    title: "Bengaluru Experience Centre",
    address: "13, 100 Feet Ring Road, Anjaneya Nagar, Bangalore South Banashankari 3 Rd Stage, Bangalore 560085, Karnataka",
    phones: ["+91-80-4113-0438", "+91-80-25270460"],
    mapUrl: "https://www.google.com/maps/place/12%C2%B055'43.2%22N+77%C2%B032'41.9%22E/@12.928667,77.5424001,17z"
  }
];

export function ExperienceCentersMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  // Sequential automatic focus indicator (cycles gently every 4s, or user can click/hover)
  useEffect(() => {
    const timer = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % LOCATIONS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || prefersReducedMotion) return;

      const items = listRef.current?.querySelectorAll(".location-card");
      if (items && items.length > 0) {
        // Staggered sequential reveal — showing the addresses one by one
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 50,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.3, // One by one cascade
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-16">

        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-xs sm:text-sm tracking-[0.3em] text-accent font-medium">
              Visit In Person
            </span>
            <div className="h-[1px] w-12 bg-border" />
          </div>
          <h2 className="text-foreground text-3xl sm:text-4xl lg:text-5xl font-light">
            Our Experience Centres
          </h2>
          <p className="text-muted text-base md:text-lg font-light max-w-2xl">
            Step into our architectural automation spaces across India. Experience lighting scenes, motorized drapery, high-end audio, and smart controls live.
          </p>
        </div>

        {/* Location Cards — Always fully visible with sequential entrance animation */}
        <div ref={listRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {LOCATIONS.map((loc, idx) => {
            const isHighlighted = highlightedIndex === idx;

            return (
              <div
                key={loc.id}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`location-card group flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-panel border transition-all duration-500 relative overflow-hidden shadow-sm ${isHighlighted
                  ? "border-accent/40 shadow-lg shadow-black/5 ring-1 ring-accent/20"
                  : "border-border hover:border-black/20"
                  }`}
              >
                {/* Subtle top indicator bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-all duration-500 ${isHighlighted ? "bg-accent opacity-100" : "bg-transparent opacity-0"
                    }`}
                />

                {/* Top: Index & City Header */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-[0.25em] text-muted ">
                      {loc.index}
                    </span>
                    <span
                      className={`text-xs  tracking-[0.2em] font-medium transition-colors ${isHighlighted ? "text-accent" : "text-muted"
                        }`}
                    >
                      {loc.title}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-3">
                      {loc.city}
                    </h3>

                    {/* Always-visible Address */}
                    <div className="flex items-start gap-3 mt-4">
                      <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" strokeWidth={1.8} />
                      <p className="text-sm sm:text-base font-light text-foreground/85 leading-relaxed">
                        {loc.address}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom: Contact Numbers & Directions */}
                <div className="flex flex-col gap-5 pt-8 mt-8 border-t border-border">
                  {/* Phone numbers — always visible */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" strokeWidth={1.8} />
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm font-light text-foreground/80">
                      {loc.phones.map((phone, pIdx) => (
                        <React.Fragment key={pIdx}>
                          <a
                            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                            className="hover:text-accent transition-colors underline-offset-2 hover:underline"
                          >
                            {phone}
                          </a>
                          {pIdx < loc.phones.length - 1 && <span className="text-muted/50">•</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Directions CTA Button */}
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full pt-2 text-xs sm:text-sm tracking-[0.15em] text-accent font-medium hover:text-accent/80 transition-colors group/link"
                  >
                    <span className="flex items-center gap-2">
                      <Navigation className="w-3.5 h-3.5" />
                      Get Directions
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

