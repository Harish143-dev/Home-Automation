"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const ROADMAP_STEPS = [
  "Order Received",
  "Welcome Letter & Client Dashboard Shared",
  "ATPL Project Coordinator visits Site",
  "Material Approval, Procurement & Billing",
  "Material Delivered on Site",
  "Site Installation",
  "Programming & System Integration",
  "Testing & Commissioning",
  "Site Handover"
];

export default function LightingRoadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady, isMobile } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".lrm-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animate the line drawing down
    tl.fromTo(".lrm-line",
      { height: 0 },
      { height: "100%", duration: 1.5, ease: "power2.inOut" },
      "-=0.4"
    );

    // Stagger in the nodes
    tl.fromTo(".lrm-step",
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.2)" },
      "-=1.2"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="lrm-header text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light">
            Roadmap to a Smarter Home
          </span>
          <h2 className="text-foreground mb-6 text-balance">
            Bringing Intelligent Lighting to Life
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative w-full max-w-3xl mx-auto pl-4 md:pl-0 mt-8">

          {/* Center Vertical Line (Hidden on very small screens, aligned left on mobile, center on desktop) */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 z-0">
            <div className="lrm-line w-full bg-accent/30 origin-top" />
          </div>

          <div className="flex flex-col gap-12 md:gap-8 w-full">
            {ROADMAP_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0; // 0, 2, 4 (Left side on desktop)

              return (
                <div
                  key={idx}
                  className={`lrm-step relative w-full flex items-center justify-start md:justify-between z-10 group ${isEven ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                >
                  {/* Empty space for alternating desktop layout */}
                  <div className="hidden md:block w-[calc(50%-3rem)]" />

                  {/* Center Node (Number) */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-panel border-[3px] border-border flex items-center justify-center shadow-sm transition-all duration-300 group-hover:border-accent group-hover:scale-110 group-hover:shadow-md shrink-0">
                    <span className="text-accent font-medium text-lg">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0 ${isEven ? "md:text-right" : "md:text-left"
                    }`}>
                    <div className="bg-panel p-6 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300">
                      <h5 className="text-foreground">
                        {step}
                      </h5>
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
