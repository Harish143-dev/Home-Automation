"use client";

import React, { useRef, useState } from "react";
import NextImage from "next/image";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { clsx } from "clsx";

const SYSTEMS_DATA = [
  {
    topHeading: "Lutron Vive",
    title: "Wireless Infrastructure Framework",
    image: "/images/commercial_solution_standalone.png",
    idealFor: [
      "Modern corporate offices executing fast-paced asset transitions",
      "High-density educational complexes",
      "Responsive healthcare installations",
      "Agile retail footprints",
      "Complex commercial retrofit projects where structural rewiring introduces prohibitive operational downtime"
    ],
    features: [
      "High-Velocity Wireless Lighting Controls: Eliminates invasive conduit runs, deploying advanced automated intelligence seamlessly across existing or occupied building footprints.",
      "Localized Occupancy Sensing Matricies: Utilizes low-profile sensor arrays to continuously monitor tenant density, dynamically adjusting illumination to reflect real-time spatial utilization.",
      "Automated Daylight Harvesting Logic: Calibrates artificial light output in direct response to environmental signals and natural solar infiltration throughout the daytime hours.",
      "Granular Dimming & Scene Control Orchestration: Delivers micro-zone environmental modification, allowing facilities teams to tailor localized illumination to diverse physical and sensory needs.",
      "Centralized Dashboard Management: Aggregates multi-floor spatial data into a single, cohesive interface for transparent configuration, load balancing, and diagnostic oversight.",
      "Native Multi-Protocol Fluency (DALI & 0–10V Support): Provides complete technical compatibility with both digital and analog fixtures, protecting legacy hardware infrastructure from obsolescence."
    ],
    benefits: [
      "Accelerated Velocity of Installation",
      "Reduced Low-Voltage Material Footprint",
      "Immediate Baseline Energy Conservation",
      "Frictionless, Infinite Scalability",
      "Optimized Occupant Comfort & Agency",
      "Unified Smart Building Ecosystem Integration",
      "Low-Maintenance Operational Stability"
    ],
    ctaText: "Explore Vive Solutions"
  },
  {
    topHeading: "Lutron Athena",
    title: "Total Control Platform",
    image: "/images/commercial_solution_centralised.png",
    idealFor: [
      "Flagship 5-star luxury business hotels",
      "Expansive corporate headquarters",
      "Premium fine-dining hospitality venues",
      "High-density cinematic multiplexes",
      "High-traffic airport transit lounges",
      "Landmark commercial campus developments requiring macro-level environmental governance"
    ],
    features: [
      "Unified Light & Blind Aesthetic Synthesis",
      "Universal Protocol Fluency (DALI, 0-10V, DMX & Tunable White)",
      "App-Based Spatial Orchestration & Scene Management",
      "Predictive Daylight Harvesting & Advanced Presence Telemetry",
      "Cloud-Connected Monitoring & Asset Analytics"
    ],
    benefits: [
      "Deep Structural Energy Optimization: Drives macro-level carbon reductions by orchestrating heavy HVAC thermal management alongside automated, precision window treatments to naturally combat solar heat gain.",
      "Cognitive, Biophilic & Occupant Wellbeing Preservation: Seamlessly alters color temperatures and light curves in harmony with natural circadian human rhythms, actively mitigating travel stress, mental fatigue, and stress levels.",
      "Simplified Institutional Facilities Governance: Centralizes sprawled, multi-system properties under a singular, intelligent command framework, minimizing labor dependencies and operational friction.",
      "Maximization of Asset Spatial Utilization: Evaluates real-time sensor metrics and occupancy habits, yielding actionable intelligence that allows enterprises to adapt their physical real estate agility.",
      "Enterprise Scale Across Infinite Blueprints: Expands effortlessly from a single high-profile presidential suite or executive boardroom into a unified network governing multiple buildings across a national real estate portfolio."
    ],
    ctaText: "Explore Athena Systems"
  }
];

// Reusable Accordion Component
function AccordionItem({
  title,
  children,
  isOpen,
  onToggle
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-border w-full">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <span className={clsx(
          "text-lg md:text-xl font-light tracking-wide transition-colors duration-300",
          isOpen ? "text-accent" : "text-foreground group-hover:text-accent"
        )}>
          {title}
        </span>
        <div className={clsx(
          "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0 ml-4",
          isOpen ? "border-accent bg-accent text-white rotate-180" : "border-border text-muted group-hover:border-accent group-hover:text-accent"
        )}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{
          maxHeight: isOpen ? (contentRef.current?.scrollHeight ?? 1000) + "px" : "0px",
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="pb-8 text-muted font-light leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

// Formatter for complex lists (splitting title and description)
function FormattedList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item, idx) => {
        const split = item.split(":");
        if (split.length > 1) {
          return (
            <li key={idx} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <div>
                <strong className="font-medium text-foreground mr-1">{split[0].trim()}:</strong>
                {split.slice(1).join(":").trim()}
              </div>
            </li>
          );
        }
        return (
          <li key={idx} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-muted mt-2 shrink-0" />
            <span>{item.trim()}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function CommercialSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track open accordion state per system
  // Using an object: { [systemIndex]: openAccordionIndex }
  const [openAccordions, setOpenAccordions] = useState<Record<number, number>>({
    0: 0, // Vive defaults to first accordion open
    1: 0  // Athena defaults to first accordion open
  });

  const toggleAccordion = (sysIndex: number, accIndex: number) => {
    setOpenAccordions(prev => ({
      ...prev,
      [sysIndex]: prev[sysIndex] === accIndex ? -1 : accIndex
    }));
  };

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // Fade up sections as you scroll down
    const blocks = gsap.utils.toArray(".solution-block") as HTMLElement[];

    blocks.forEach((block) => {
      gsap.from(block, {
        scrollTrigger: {
          trigger: block,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
      });
    });

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} id="commercial-solutions" className="py-12 md:py-16 bg-background text-foreground w-full">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-20 lg:px-24">

        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto solution-block">
          <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
            Architecture & Infrastructure
          </span>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">
            Commercial Automation Solutions
          </h2>
        </div>

        {/* Systems List */}
        <div className="space-y-32 md:space-y-48">
          {SYSTEMS_DATA.map((system, sysIndex) => {
            const isEven = sysIndex % 2 === 0;

            return (
              <div
                key={sysIndex}
                className={clsx(
                  "solution-block flex flex-col gap-12 lg:gap-20 items-center",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >

                {/* Text & Accordion Content */}
                <div className="w-full lg:w-[45%] flex flex-col">
                  <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-accent mb-4 block">
                    {system.topHeading}
                  </span>
                  <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl mb-8 md:mb-10 text-balance">
                    {system.title}
                  </h3>

                  {/* Accordion Group */}
                  <div className="w-full flex flex-col border-t border-border">
                    <AccordionItem
                      title="Ideal Applications"
                      isOpen={openAccordions[sysIndex] === 0}
                      onToggle={() => toggleAccordion(sysIndex, 0)}
                    >
                      <FormattedList items={system.idealFor} />
                    </AccordionItem>

                    <AccordionItem
                      title="Key Infrastructure Features"
                      isOpen={openAccordions[sysIndex] === 1}
                      onToggle={() => toggleAccordion(sysIndex, 1)}
                    >
                      <FormattedList items={system.features} />
                    </AccordionItem>

                    <AccordionItem
                      title="Operational Benefits"
                      isOpen={openAccordions[sysIndex] === 2}
                      onToggle={() => toggleAccordion(sysIndex, 2)}
                    >
                      <FormattedList items={system.benefits} />
                    </AccordionItem>
                  </div>

                  {/* CTA Button */}
                  <button className="mt-12 px-8 py-4 border border-border rounded-full w-fit hover:border-accent hover:text-accent transition-all duration-300 flex items-center gap-3 group">
                    <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base">{system.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Imagery */}
                <div className="w-full lg:w-[55%] relative h-[450px] sm:h-[600px] lg:h-[750px] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl group">
                  <NextImage
                    src={system.image}
                    alt={system.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    priority={sysIndex === 0}
                  />
                  {/* Subtle vignette for depth */}
                  <div className="absolute inset-0 border border-black/10 rounded-[24px] md:rounded-[40px] z-10 pointer-events-none" />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
