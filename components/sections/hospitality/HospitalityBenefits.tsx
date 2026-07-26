"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "../../../lib/gsapSetup";
import { EASE, DURATION } from "../../../lib/animation.config";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

const BUSINESS_CASE_DATA = {
  eyebrow: "The Business Case",
  title: "The Strategic Significance of Adaptive Hospitality",
  intro: "Static properties are operational liabilities. Automation is an investment evaluated on institutional metrics: resource resilience, staff optimization, and long term asset future proofing. By transforming raw system telemetry into a unified command layer, we unlock hidden margins while safeguarding the guest experience.",
  items: [
    {
      id: "bc-1",
      title: "Centralized Operational Command & Staff Efficiency",
      description: "Fragmented, slow-moving manual operations are replaced with an enterprise-grade command framework. By consolidating guest rooms, public volumes, and back-of-house subsystems into a single, high-availability monitoring interface, operators achieve total property oversight. Routine, repetitive tasks, including localized climate scheduling, lighting path modifications, and real-time room status updates, are fully automated, freeing service teams to focus entirely on premium guest interaction."
    },
    {
      id: "bc-2",
      title: "Modular Scalability & Uniform Brand Governance",
      description: "To safeguard expanding real estate portfolios against fragmented technology standards, our systems protect properties from the constant drain of reactive retrofitting. The flexible network architecture scales modularly from isolated boutique footprints to fully networked international campuses as operational requirements evolve. This ensures hotel groups can deliver a standardized, elite experience across every room and global property through synchronized system performance."
    },
    {
      id: "bc-3",
      title: "Restorative Health Infrastructure & Cognitive Yield",
      description: "Guest loyalty and emotional comfort directly dictate an asset's premium valuation. By decoupling rest from the solar cycle, our systems execute precise twilight lighting scenes to restore sleep consistency for global travelers. This framework turns your interior footprint into everyday health infrastructure, utilizing intuitive interfaces to offer neurodiverse guests absolute sensory control over lighting, air quality, and acoustics."
    },
    {
      id: "bc-4",
      title: "Automated Resource Resilience",
      description: "Insulating hospitality assets from volatile energy grids and rising utility overheads cannot come at the cost of luxury expectations. Our platform deploys invisible magnetic door contacts and presence tracking to trigger instant environmental drift setbacks the moment a guest suite is vacated. Additionally, solar-adaptive window treatments compute outdoor sun tracks to lower peak cooling loads, protecting primary mechanical lifecycles while capturing an invisible 5% to 15% reduction in total property energy consumption."
    }
  ]
};

export function HospitalityBenefits() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeItem, setActiveItem] = useState<string>(BUSINESS_CASE_DATA.items[0].id);
  const { isReady, isMobile } = useBreakpoint();
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // GSAP Accordion Animation
  useEffect(() => {
    if (!isReady) return;

    BUSINESS_CASE_DATA.items.forEach((item) => {
      const contentEl = contentRefs.current[item.id];
      const isActive = activeItem === item.id;

      if (contentEl) {
        if (isActive) {
          gsap.to(contentEl, {
            height: "auto",
            opacity: 1,
            duration: 0.6,
            ease: EASE.premium,
            overwrite: "auto",
          });
        } else {
          gsap.to(contentEl, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: EASE.premium,
            overwrite: "auto",
          });
        }
      }
    });
    
    // Refresh scroll triggers because heights have changed
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 650);
  }, [activeItem, isReady]);

  // Scroll entrance animation & Pinned Accordion sequence
  useGSAP(() => {
    if (!isReady) return;

    // Entrance animation
    gsap.from(".bc-left-content > *", {
      y: 30, opacity: 0, duration: DURATION.normal, stagger: 0.1, ease: EASE.reveal,
      scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
    });
    
    gsap.from(".bc-accordion-item", {
      y: 30, opacity: 0, duration: DURATION.normal, stagger: 0.1, ease: EASE.reveal,
      scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
    });

  }, { dependencies: [isReady, isMobile], scope: containerRef });

  return (
    <section
      ref={containerRef}
      className={`py-16 md:py-24 w-full px-6 md:px-12 lg:px-24 bg-background transition-opacity duration-500 ${!isReady ? "opacity-0" : "opacity-100"}`}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Static Header (Sticky) */}
        <div className="w-full lg:w-5/12 relative">
          <div className="bc-left-content flex flex-col gap-6 lg:sticky lg:top-[15vh]">
            <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent">
              {BUSINESS_CASE_DATA.eyebrow}
            </span>
            <h2 className="text-foreground">
              {BUSINESS_CASE_DATA.title}
            </h2>
            <p className="text-muted text-base md:text-lg font-light leading-relaxed">
              {BUSINESS_CASE_DATA.intro}
            </p>
          </div>
        </div>

        {/* Right Column: GSAP Accordion */}
        <div className="w-full lg:w-7/12 flex flex-col border-t border-border mt-4 lg:mt-0">
          {BUSINESS_CASE_DATA.items.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <div 
                key={item.id} 
                ref={(el) => { itemRefs.current[item.id] = el; }}
                className="bc-accordion-item group border-b border-border py-6 md:py-8 cursor-pointer"
                onClick={() => setActiveItem(isActive ? "" : item.id)}
              >
                {/* Accordion Header */}
                <div className="flex items-start justify-between gap-6">
                  <h3 className={`text-xl md:text-2xl font-light tracking-wide transition-colors duration-500 leading-snug ${isActive ? "text-accent" : "text-foreground group-hover:text-foreground/70"}`}>
                    {item.title}
                  </h3>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 mt-1 ${isActive ? "border-accent bg-accent text-white rotate-45" : "border-border text-muted"}`}>
                    <Plus className="text-xl sm:text-2xl lg:text-3xl w-4 h-4" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Accordion Content (Animated by GSAP) */}
                <div 
                  ref={(el) => { contentRefs.current[item.id] = el; }}
                  className="overflow-hidden h-0 opacity-0"
                >
                  <p className="pt-6 text-muted text-base md:text-lg font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
