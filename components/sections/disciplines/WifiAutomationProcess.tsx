"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const ROADMAP_STEPS = [
  "Order Received",
  "Welcome Letter & Client Dashboard Shared",
  "ATPL Project Coordinator visits Site",
  "Site visit details shared with you",
  "ATPL Engineer inspects site",
  "Material Submission & Approval",
  "Material Procured",
  "Material Billed",
  "Material Delivered on Site",
  "Site Installation",
  "Programming & System Integration",
  "Testing & Commissioning",
  "Site Handover"
];

export function WifiAutomationProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onRefresh: () => scheduleScrollRefresh(),
      }
    });

    // Animate the line drawing down based on scroll
    if (timelineRef.current) {
      gsap.fromTo(".wifi-process-line",
        { height: 0 },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1
          }
        }
      );
    }

  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <h5 className="inline-block text-accent mb-4">
            Roadmap to a Smarter Home
          </h5>
          <h2 className="text-foreground mb-6 text-balance">
            Our Wi-Fi Automation Process
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            From the moment your order is received to the final handover, our systematic approach ensures a flawless, high-quality networking installation experience.
          </p>
        </div>

        {/* Timeline Layout */}
        <div ref={timelineRef} className="relative w-full pl-4 md:pl-0 mt-8">

          {/* Center Vertical Line (Hidden on very small screens, aligned left on mobile, center on desktop) */}
          <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-px bg-black/10 -translate-x-1/2 z-0">
            <div className="wifi-process-line w-full bg-accent origin-top" />
          </div>

          <div className="flex flex-col gap-10 md:gap-8 w-full pb-8">
            {ROADMAP_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0; // 0, 2, 4 (Left side on desktop)

              return (
                <div
                  key={idx}
                  className={`relative w-full flex items-center justify-start md:justify-between z-10 group ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Empty space for alternating desktop layout */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />

                  {/* Center Node (Number) */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-background border-[3px] border-black/10 flex items-center justify-center shadow-sm transition-all duration-300 group-hover:border-accent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/20 shrink-0 z-20">
                    <span className="text-accent font-display text-xl">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Content Element (Flat UI) */}
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 ${
                    isEven ? "md:text-right" : "md:text-left"
                  }`}>
                    <div className="py-4 md:py-6 flex items-center h-full">
                      <h4 className="text-foreground/90 group-hover:text-accent transition-colors duration-300 w-full">
                        {step}
                      </h4>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
