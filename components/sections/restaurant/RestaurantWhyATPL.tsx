"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { MapPin, CheckCircle2 } from "lucide-react";

const STATS = [
  "Over 24 Years of automation expertise",
  "Over 1,000 projects successfully delivered",
  "Over 650 premium residences automated",
  "Over 250 hospitality projects completed",
  "Over 100 commercial projects delivered",
  "Experience Centres in Delhi, Mumbai & Bangalore",
  "Sales & Service across over 23 cities"
];

const CENTERS = [
  {
    city: "Delhi",
    title: "Delhi Experience Centre",
    description: "Experience thoughtfully designed smart home technologies, intelligent lighting control, and integrated automation solutions crafted for modern, high-end residences.",
    address: "Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi – 110014",
    phones: ["011 24324113", "011 45643992", "011 24324115"]
  },
  {
    city: "Mumbai",
    title: "Mumbai Experience Centre",
    description: "ATPL has been delivering intelligent smart home technologies, refined lighting control, and integrated automation solutions for discerning homeowners across India.",
    address: "10/76, Apte Properties, Ground Floor, Parijat House, L.R. Papan Marg, Off Dr. Elijah Moses Road, Worli, Mumbai, Maharashtra – 400018",
    phones: ["022 49675653", "082912 39139"]
  },
  {
    city: "Bengaluru",
    title: "Bengaluru Experience Centre",
    description: "Discover intelligent home automation with interactive demonstrations of lighting, shading, HVAC, and integrated smart home control systems.",
    address: "13, 100 Feet Ring Road, Anjaneya Nagar, Banashankari 3rd Stage, Bangalore, Karnataka – 560085",
    phones: ["080 4113 0438", "080 25270460"]
  }
];

export function RestaurantWhyATPL() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".lwhy-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".lwhy-stat",
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" },
      "-=0.4"
    );

    tl.fromTo(".lwhy-center",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.2"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col">

        {/* Header & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 mb-20 md:mb-28">

          {/* Left: Text */}
          <div className="lwhy-header flex flex-col items-start justify-center text-left max-w-2xl">
            <span className="inline-block text-sm md:text-base tracking-[0.1em] text-accent mb-4 font-light">
              The ATPL Advantage
            </span>
            <h2 className=" text-foreground mb-6">
              Why Choose Anusha Technovision
            </h2>
            <p className="text-muted-foreground font-light text-sm sm:text-base md:text-lg leading-relaxed mb-8">
              For over 24 years, ATPL has been delivering intelligent lighting control and home automation solutions that combine world-class technology, expert execution, and dependable after-sales support. Trusted by luxury homeowners across India, we create smart homes that are reliable, and built for the future.
            </p>
          </div>

          {/* Right: Stats List */}
          <div className="flex flex-col justify-center">
            <div className="bg-panel rounded-2xl p-8 sm:p-10 border border-black/5 shadow-sm">
              <ul className="flex flex-col gap-4 sm:gap-5">
                {STATS.map((stat, idx) => (
                  <li key={idx} className="lwhy-stat flex items-start gap-4 group">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm sm:text-base font-light text-foreground">{stat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Centers */}
        <div className="w-full">
          <div className="lwhy-header mb-12 flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 sm:w-16 bg-accent/20" />
            <h3 className=" text-foreground text-center">
              Visit Our Experience Centres
            </h3>
            <div className="h-[1px] w-8 sm:w-16 bg-accent/20" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
            {CENTERS.map((center, idx) => (
              <div
                key={idx}
                className="lwhy-center flex flex-col h-full bg-panel rounded-[2rem] border border-black/5 p-8 sm:p-10 hover:shadow-xl hover:-translate-y-1 hover:border-accent/30 transition-all duration-500 group"
              >
                <h4 className=" text-foreground mb-4 group-hover:text-accent transition-colors">
                  {center.title}
                </h4>

                <p className="text-sm font-light leading-relaxed text-muted-foreground mb-8">
                  {center.description}
                </p>

                <div className="mt-auto flex flex-col gap-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-light text-foreground leading-relaxed">
                      {center.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
