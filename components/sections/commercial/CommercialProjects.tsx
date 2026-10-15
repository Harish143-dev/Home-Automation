"use client";

import React, { useRef } from "react";
import NextImage from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";

const CASE_STUDIES = [
  {
    id: 1,
    title: "Ernst & Young (EY) Corporate Campus",
    asset: "Fortune 500 Corporate Campus, Gurugram",
    image: "/images/projects/commercial/ey-gurgaon/1.jpg",
    strain: "Managing a highly volatile, hybrid workforce floorplate across 150,000 sq. ft. while facing extreme localized heatwaves and rising energy costs.",
    yield: "Integrated a centralized Lutron Athena backbone that synthesizes automated daylight harvesting with dynamic HVAC micro-climate tracking.",
    roi: "Reduced peak-load utility overheads by 22% within the first two quarters while stabilizing employee cognitive focus.",
    similar: ["KPMG", "PwC", "Deloitte", "McKinsey"]
  },
  {
    id: 2,
    title: "Meta Corporate Office",
    asset: "Meta Regional Headquarters, Gurugram",
    image: "/images/projects/commercial/meta-office-gurgaon/1.jpg",
    strain: "Creating an adaptable, human-centric workspace for hundreds of engineering and operations teams across expansive open-plan zones and collaborative hubs.",
    yield: "Smart lighting, AV, conferencing, and workspace automation across reception areas, workstations, and meeting rooms, featuring occupancy sensing, daylight harvesting, dimming control, and motorized shades.",
    roi: "Achieved 30% reduction in lighting power density while providing effortless app-based space reconfiguration.",
    similar: ["Google", "Microsoft", "Meta", "Amazon", "VMware"]
  },
  {
    id: 3,
    title: "NVIDIA Corporate Campus",
    asset: "Technology Development Center, Bengaluru",
    image: "/images/projects/commercial/nvidia/1.jpg",
    strain: "Supporting demanding 24/7 engineering cycles with circadian-attuned illumination and high-density conferencing.",
    yield: "Circadian lighting algorithms, dynamic daylight harvesting, and intelligent boardroom scheduling infrastructure integrated with facility monitoring.",
    roi: "Boosted occupant cognitive comfort while reducing lighting energy overhead by 28%.",
    similar: ["Intel", "Qualcomm", "Apple", "AMD"]
  },
  {
    id: 4,
    title: "Tiffany & Co. Flagship Boutique",
    asset: "Ultra-Luxury Retail Flagship, Mumbai",
    image: "/images/projects/commercial/tiffany-mumbai/1.jpg",
    strain: "Achieving museum-grade color rendering index (CRI 98+) to exhibit haute joaillerie while maintaining zero heat load on gemstone display vitrines.",
    yield: "Architectural lighting, audio, and centralized control systems integrated throughout the showroom, display areas, customer lounges, and private VIP salons.",
    roi: "Enhanced jewelry brilliance and customer dwell time with automated showcase protection presets.",
    similar: ["Cartier", "Dior", "Louis Vuitton", "Bvlgari"]
  },
  {
    id: 5,
    title: "Barclays Bank Global Centre",
    asset: "Financial Services Campus, Chennai",
    image: "/images/projects/commercial/barclays-bank-chennai/1.jpg",
    strain: "Stringent global financial institution compliance requiring encrypted protocols and automated after-hours security illumination.",
    yield: "Centralized Building Management System (BMS) integration, encrypted DALI lighting backbones, and smart presence detection.",
    roi: "Achieved full ISO energy compliance with automated load-shedding and multi-tenant sub-metering.",
    similar: ["Standard Chartered", "HSBC", "Deutsche Bank"]
  },
  {
    id: 6,
    title: "BMW Experience Centre",
    asset: "Automotive Showroom & Delivery Bay, Gurugram",
    image: "/images/projects/commercial/bmw-showroom/1.jpg",
    strain: "Eliminating vehicle surface reflections and specular glare while spotlighting automotive design contours during client deliveries.",
    yield: "Tunable white lighting tracks with custom unveil scene recall, lounge audio integration, and automated glass façade drapery.",
    roi: "Elevated showroom dwell time and delivered dramatic customer vehicle reveal ceremonies.",
    similar: ["Mercedes-Benz", "Audi", "Porsche"]
  },
  {
    id: 7,
    title: "Ferrari Flagship Showroom",
    asset: "Supercar Presentation Pavilion, Bengaluru",
    image: "/images/projects/commercial/ferrari-showroom/1.jpg",
    strain: "Highlighting bespoke vehicle coachwork and paint finishes without thermal distortion on automotive materials.",
    yield: "High-CRI precision spotlighting arrays, zoned background audio distribution, and one-touch client presentation presets.",
    roi: "Unrivaled showroom aesthetic matching Maranello global corporate identity guidelines.",
    similar: ["Maserati", "Lamborghini"]
  },
  {
    id: 8,
    title: "Chennai Metro Rail Transit Hub",
    asset: "Public Transit Infrastructure, Chennai",
    image: "/images/projects/commercial/chennai-metro/1.jpg",
    strain: "High-volume commuter traffic requiring 24/7 durability, fail-safe reliability, and rapid emergency lighting transitions.",
    yield: "Ruggedized DALI lighting control matrices, automated daylight compensation at station concourses, and centralized telemetry.",
    roi: "Reduced station electrical consumption by 24% while ensuring continuous passenger safety.",
    similar: ["Delhi Metro", "Bangalore Metro", "Hyderabad Metro"]
  },
  {
    id: 9,
    title: "Wave Cinemas Multiplex",
    asset: "Commercial Entertainment & Auditoriums, Noida",
    image: "/images/projects/commercial/wave-cinema/1.jpg",
    strain: "Complex showtime scheduling requiring smooth dim-to-black auditorium transitions without distracting audience members.",
    yield: "Automated lighting control systems synchronized directly with digital cinema projection servers across auditoriums and concession foyers.",
    roi: "Extended projector lamp and lighting lifecycle by 35% with seamless showtime automation.",
    similar: ["PVR INOX", "Cinepolis"]
  },
  {
    id: 10,
    title: "Yashraj Studio Sound Stages",
    asset: "Film & Sound Production Complex, Mumbai",
    image: "/images/projects/commercial/yashraj-studio/1.jpg",
    strain: "Zero acoustic and electrical interference requirements for sensitive studio recording microphones and acoustic suites.",
    yield: "Low-voltage architectural dimming without transformer hum, integrated on-air tally signaling, and executive screening suite presets.",
    roi: "Uncompromising acoustic purity and lighting versatility for premier cinema productions.",
    similar: ["Film City", "Mehboob Studios"]
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

        {/* Carousel Controls - Desktop */}
        <div className="hidden md:flex gap-4">
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
            className="case-card flex-shrink-0 w-[85vw] sm:w-[75vw] lg:w-[900px] snap-center bg-white rounded-[24px] overflow-hidden border border-border flex flex-col lg:flex-row shadow-xl"
          >
            {/* Image Side */}
            <div className="w-full lg:w-[40%] h-[200px] sm:h-[250px] lg:h-auto relative">
              <NextImage
                src={study.image}
                alt={study.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 to-transparent" />
            </div>

            {/* Data Side */}
            <div className="w-full lg:w-[60%] p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
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

      {/* Carousel Controls - Mobile */}
      <div className="flex md:hidden justify-center gap-6 px-6 mt-2 pb-6">
        <button
          onClick={() => scroll("left")}
          className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group"
          aria-label="Previous project"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-300 group"
          aria-label="Next project"
        >
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
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
