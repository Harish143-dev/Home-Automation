"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { EASE, DURATION } from "../../../lib/animation.config";

const CASE_STUDIES = [
  {
    id: "cs-1",
    title: "Four Seasons, Mumbai",
    asset: "Four Seasons Hotel, Mumbai (Including AER Lounge, Modernist Members Club, and Opus)",
    strain: "Managing volatile utility footprints and varied crowd loads across distinct luxury zones, from exposed rooftop lounges to high-privacy member clubs, while resolving inefficient legacy BMS coordination.",
    yield: "Deployed a property-wide integrated network architecture unifying guest rooms and signature public venues under a singular command backbone. The network synchronizes dynamic lighting paths, solar shading, and occupancy-based environmental setbacks to deliver a frictionless hospitality experience.",
    roi: "Achieved complete PMS/BMS integration, eliminating manual operational lag while locking in a consistent luxury environment that naturally maximizes guest dwell times across all touchpoints.",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d14eba48?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "cs-2",
    title: "The Oberoi, New Delhi",
    asset: "The Oberoi, New Delhi",
    strain: "Overcoming the operational friction of manual environmental setups across high-occupancy culinary spaces, public galleries, and guest suites that previously ran independent of central hotel operations.",
    yield: "Engineered a property-wide automation infrastructure linking guest rooms, destination restaurants, and public volumes into a unified hotel system layer. The network utilizes invisible presence telemetry to scale HVAC tracking and ambient light curves based on real-time room occupancy.",
    roi: "Erased system fragmentation through flawless BMS/PMS cross-talk, driving massive, measurable reductions in baseline energy waste while preserving uncompromised indoor climate comfort.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1600"
  },
  {
    id: "cs-3",
    title: "Six Senses Fort Barwara, Rajasthan",
    asset: "Six Senses Fort Barwara, Rajasthan",
    strain: "Delivering modern guest technology and responsive energy conservation within a sensitive 14th-century heritage citadel without compromising or disrupting the historic architectural fabric.",
    yield: "Deployed a specialized guestroom management system (GRMS) featuring low-impact guest presence detection matrices and bespoke, custom-engraved backlit architectural keypads. The system naturally controls lighting curves, climate parameters, and window treatments based on real-time occupancy.",
    roi: "Preserved the design integrity and historic character of the asset while executing aggressive, automated utility conservation that perfectly aligns with Six Senses' global wellness and sustainability standards.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1600"
  }
];

export function HospitalityCaseStudies() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Entrance animation for the header
    gsap.from(".cs-header > *", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: DURATION.normal,
      stagger: 0.1,
      ease: EASE.reveal
    });

    // Animate the cards floating up slightly as they become sticky
    const cards = gsap.utils.toArray(".cs-card");
    cards.forEach((card: any) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: DURATION.normal,
        ease: EASE.reveal
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-background py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-20">

        {/* Header */}
        <div className="cs-header text-center flex flex-col items-center">
          <span className="tracking-widest uppercase text-accent text-sm md:text-base">
            Proven Implementations
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-[1.2] text-foreground mt-4">
            Signature Case Studies
          </h2>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="flex flex-col gap-6 lg:gap-8 relative pb-12">
          {CASE_STUDIES.map((cs, i) => (
            <div
              key={cs.id}
              className="cs-card sticky rounded-[40px] overflow-hidden shadow-2xl bg-secondary text-white border border-white/5"
              style={{
                top: `calc(10vh + ${i * 40}px)`,
                zIndex: i + 1
              }}
            >
              <div className="flex flex-col lg:flex-row h-auto">

                {/* Left Side: Image */}
                <div className="w-full lg:w-5/12 relative min-h-[250px] lg:min-h-[400px]">
                  <img src={cs.image} alt={cs.title} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 to-transparent" />
                </div>

                {/* Right Side: Content */}
                <div className="w-full lg:w-7/12 p-6 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-light tracking-wide">{cs.title}</h3>
                  <p className="text-accent-soft text-xs tracking-widest uppercase mt-3 mb-8">
                    {cs.asset}
                  </p>

                  <div className="flex flex-col gap-6">
                    <div>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-1.5">The Structural Strain</h4>
                      <p className="text-sm font-light leading-relaxed text-white/80">{cs.strain}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-white/50 mb-1.5">The Strategic Yield</h4>
                      <p className="text-sm font-light leading-relaxed text-white/80">{cs.yield}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] md:text-xs uppercase tracking-widest text-accent-soft mb-1.5">The ROI Signal</h4>
                      <p className="text-sm font-light leading-relaxed text-white">{cs.roi}</p>
                    </div>
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
