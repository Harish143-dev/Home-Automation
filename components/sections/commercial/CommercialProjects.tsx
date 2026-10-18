"use client";

import React, { useRef, useState } from "react";
import NextImage from "next/image";
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { cn } from "@/lib/utils";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const activeProject = CASE_STUDIES[activeIndex];

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".case-header",
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".showcase-card",
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CASE_STUDIES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={containerRef} className="py-12 md:py-20 bg-background text-foreground w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24">

        {/* Section Header */}
        <div className="mb-10 sm:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 case-header">
          <div className="max-w-2xl">
            <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-3 block">
              The Proof Matrix
            </span>
            <h2 className="text-foreground">
              Infrastructure in Action: Case Studies
            </h2>
            <p className="mt-4 text-foreground/70 text-base md:text-lg font-light leading-relaxed">
              High-availability automation deployments across corporate campuses, luxury retail flagships, transit hubs, and production studios.
            </p>
          </div>

          {/* Navigation Controls & Counter */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs tracking-widest text-muted font-mono mr-2">
              <span className="text-foreground font-semibold text-sm">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              {" / "}
              {String(CASE_STUDIES.length).padStart(2, '0')}
            </span>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-surface-darker hover:border-accent text-foreground transition-all duration-300"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-surface-darker hover:border-accent text-foreground transition-all duration-300"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Split Showcase */}
        <div className="showcase-card bg-panel border border-border rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

            {/* Left: 16:9 Landscape Viewer & Thumbnail Strip */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {/* Landscape Image Container */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black/5 shadow-inner">
                <NextImage
                  key={activeProject.id}
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-all duration-700 ease-out"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

                {/* Floating Asset Pill */}
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                  <span className="tracking-widest text-[11px] sm:text-xs text-white/95 font-medium">
                    {activeProject.asset}
                  </span>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end">
                  <span className="text-white text-sm sm:text-base font-light tracking-wide drop-shadow-md">
                    {activeProject.title}
                  </span>
                </div>
              </div>

              {/* Landscape Thumbnails Selector Strip */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 hide-scrollbar">
                {CASE_STUDIES.map((study, idx) => (
                  <button
                    key={study.id}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "relative shrink-0 w-20 sm:w-24 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all duration-300",
                      activeIndex === idx
                        ? "border-accent ring-2 ring-accent/30 scale-105"
                        : "border-border/60 opacity-60 hover:opacity-100 hover:border-foreground/40"
                    )}
                    aria-label={`Select ${study.title}`}
                  >
                    <NextImage
                      src={study.image}
                      alt={study.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Structured Case Study Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Eyebrow & Title */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent text-xs font-mono tracking-widest">
                    Case Study #{String(activeProject.id).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-6 leading-tight">
                  {activeProject.title}
                </h3>

                {/* Challenge & Solution Grid */}
                <div className="space-y-4 mb-6">
                  {activeProject.strain !== "N/A" && (
                    <div>
                      <h4 className="text-xs tracking-wider text-muted font-semibold mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
                        The Structural Strain
                      </h4>
                      <p className="text-foreground/80 font-light text-xs sm:text-sm leading-relaxed">
                        {activeProject.strain}
                      </p>
                    </div>
                  )}

                  {activeProject.yield !== "N/A" && (
                    <div>
                      <h4 className="text-xs tracking-wider text-muted font-semibold mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/80 shrink-0" />
                        The Strategic Yield
                      </h4>
                      <p className="text-foreground/80 font-light text-xs sm:text-sm leading-relaxed">
                        {activeProject.yield}
                      </p>
                    </div>
                  )}
                </div>

                {/* ROI Signal Highlight Box */}
                {activeProject.roi !== "N/A" && (
                  <div className="bg-accent/[0.05] border border-accent/25 rounded-xl p-4 mb-6">
                    <h4 className="text-xs tracking-wider text-accent font-semibold mb-1">
                      The ROI Signal
                    </h4>
                    <p className="text-foreground/95 font-light text-xs sm:text-sm leading-relaxed">
                      {activeProject.roi}
                    </p>
                  </div>
                )}
              </div>

              {/* Similar Deployments at Bottom */}
              {activeProject.similar.length > 0 && (
                <div className="pt-4 border-t border-border flex flex-wrap items-center gap-1.5 mt-auto">
                  <span className="text-xs text-muted/70 font-light mr-1">Similar:</span>
                  {activeProject.similar.map((sim, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-black/[0.04] border border-black/8 text-[11px] sm:text-xs text-foreground/75 font-light"
                    >
                      {sim}
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

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
