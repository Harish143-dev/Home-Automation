"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const CASE_STUDIES = [
  {
    id: 1,
    title: "Enterprise Headquarters Deployment",
    asset: "Fortune 500 Corporate Campus, Gurugram",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    strain: "Managing a highly volatile, hybrid workforce floorplate across 150,000 sq. ft. while facing extreme localized heatwaves and rising energy costs.",
    yield: "Integrated a centralized Lutron Athena backbone that synthesizes automated daylight harvesting with dynamic HVAC micro-climate tracking.",
    roi: "Reduced peak-load utility overheads by 22% within the first two quarters while stabilizing employee cognitive focus.",
    similar: []
  },
  {
    id: 2,
    title: "Meta",
    asset: "Meta’s Corporate Office",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop",
    strain: "xx [CLIENT PLACEHOLDER]",
    yield: "Smart lighting, AV, conferencing, and workspace automation across reception areas, workstations, and meeting rooms, featuring occupancy sensing, daylight harvesting, dimming control, motorized shades, access control, background music, and video wall integration.",
    roi: "Extended primary lamp and hardware life cycles by 35% while lowering tenant stress markers across high-density passenger zones. [CLIENT PLACEHOLDER]",
    similar: ["Microsoft", "Meta", "Rio Tinto", "EY", "VMWare"]
  },
  {
    id: 3,
    title: "Tiffany & Co.",
    asset: "Retail Space",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
    strain: "N/A",
    yield: "Lighting, audio, and centralized control systems integrated throughout the showroom, display areas, customer lounges, and common spaces.",
    roi: "Extended primary lamp and hardware life cycles by 35% while lowering tenant stress markers across high-density passenger zones. [CLIENT PLACEHOLDER]",
    similar: ["Dior", "Louis Vuitton", "Galleries Lafayette"]
  },
  {
    id: 4,
    title: "Yashobhoomi",
    asset: "Convention Centres & Public Infrastructure",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    strain: "N/A",
    yield: "Lighting control systems deployed across convention halls, exhibition spaces, meeting rooms, corridors, lobbies, and public areas, enabling centralized management, scene control, and energy-efficient operation.",
    roi: "Extended primary lamp and hardware life cycles by 35% while lowering tenant stress markers across high-density passenger zones. [CLIENT PLACEHOLDER]",
    similar: ["PM Museum", "Delhi Metro", "Secretariat Building"]
  },
  {
    id: 5,
    title: "IIM Ranchi",
    asset: "Educational Institution",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
    strain: "N/A",
    yield: "Lighting control and motorized shade systems integrated across the Seminar Hall, VIP Lounge, and Dining Areas.",
    roi: "Extended primary lamp and hardware life cycles by 35% while lowering tenant stress markers across high-density passenger zones. [CLIENT PLACEHOLDER]",
    similar: []
  },
  {
    id: 6,
    title: "Golden Dragon Restaurant",
    asset: "Hospitality & Restaurant",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop",
    strain: "N/A",
    yield: "Delivering immersive guest experiences through intelligent lighting, audio, shading, and control systems.",
    roi: "Extended primary lamp and hardware life cycles by 35% while lowering tenant stress markers across high-density passenger zones. [CLIENT PLACEHOLDER]",
    similar: ["MKT", "THAI NAAM"]
  },
  {
    id: 7,
    title: "Wave Cinema",
    asset: "Multiplexes",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop",
    strain: "N/A",
    yield: "Lighting control systems integrated across the entire cinema, including auditoriums, lobbies, corridors, and concession areas.",
    roi: "Extended primary lamp and hardware life cycles by 35% while lowering tenant stress markers across high-density passenger zones. [CLIENT PLACEHOLDER]",
    similar: []
  },
  {
    id: 8,
    title: "Airport VIP Lounge",
    asset: "Transit Hub",
    image: "https://images.unsplash.com/photo-1544015759-2475e6d8713a?q=80&w=1200&auto=format&fit=crop",
    strain: "N/A",
    yield: "Automated environmental controls to manage extreme 24-hour passenger cycles.",
    roi: "Extended primary lamp and hardware life cycles by 35% while lowering tenant stress markers across high-density passenger zones. [CLIENT PLACEHOLDER]",
    similar: []
  }
];

export function CommercialProjects() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".case-header",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".case-card",
      { x: 100, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 85%",
        }
      }
    );

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="py-12 md:py-16 bg-background text-foreground w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 case-header">

        <div className="max-w-2xl">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
            The Proof Matrix
          </span>
          <h2 className="text-foreground">
            Infrastructure in Action: Case Studies
          </h2>
          <p className="mt-6 text-foreground/70 text-lg font-light leading-relaxed">
            We prove our methodology through high availability deployments across India's most demanding corporate, transit, and entertainment infrastructures, transforming complex spatial friction into predictable asset performance.
          </p>
        </div>

        {/* Carousel Controls */}
        <div className="flex gap-4">
          <button
            onClick={() => scroll("left")}
            className="w-14 h-14 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group"
            aria-label="Previous project"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-14 h-14 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group"
            aria-label="Next project"
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Horizontal Scrolling Deck */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 pt-4 px-6 sm:px-12 md:px-20 lg:px-24 hide-scrollbar"
      >
        {CASE_STUDIES.map((study) => (
          <div
            key={study.id}
            className="case-card flex-shrink-0 w-full md:w-[85vw] lg:w-[900px] snap-center bg-white rounded-[24px] overflow-hidden border border-border flex flex-col lg:flex-row shadow-xl"
          >
            {/* Image Side */}
            <div className="w-full lg:w-[40%] h-[250px] lg:h-auto relative">
              <NextImage
                src={study.image}
                alt={study.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 to-transparent" />
            </div>

            {/* Data Side */}
            <div className="w-full lg:w-[60%] p-6 lg:p-8 flex flex-col justify-center">
              <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-2">
                {study.asset}
              </span>
              <h3 className="text-foreground mb-6 text-balance">
                {study.title}
              </h3>

              <div className="space-y-5">
                {study.strain !== "N/A" && (
                  <div>
                    <h4 className="text-foreground/50 mb-1">The Structural Strain</h4>
                    <p className="text-foreground/80 font-light text-sm leading-relaxed">{study.strain}</p>
                  </div>
                )}

                {study.yield !== "N/A" && (
                  <div>
                    <h4 className="text-foreground/50 mb-1">The Strategic Yield</h4>
                    <p className="text-foreground/80 font-light text-sm leading-relaxed">{study.yield}</p>
                  </div>
                )}

                {study.roi !== "N/A" && (
                  <div>
                    <h4 className="text-accent mb-1">The ROI Signal</h4>
                    <p className="text-foreground/90 font-light text-sm leading-relaxed border-l-2 border-accent pl-3">{study.roi}</p>
                  </div>
                )}

                {study.similar.length > 0 && (
                  <div className="pt-6 border-t border-border">
                    <h4 className="text-foreground/40 mb-3">Similar Deployments</h4>
                    <div className="flex flex-wrap gap-2">
                      {study.similar.map((sim, idx) => (
                        <span key={idx} className="px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs text-foreground/70">
                          {sim}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
