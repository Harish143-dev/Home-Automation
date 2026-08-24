"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const PARTNERS = [
  {
    name: "Lutron",
    description: "As a leading designer and manufacturer of energy-saving products, Lutron understands the importance of protecting our environment and preserving our precious resources for future generations. Since our founding, we have developed innovative products that save energy, reduce waste, enhance efficiency, and improve people’s lifestyles."
  }
];

export function RestaurantPartners() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      }
    });

    tl.fromTo(".rp-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".rp-brand",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="rp-header text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-block text-sm md:text-base tracking-[0.1em] text-accent mb-4 font-light ">
            Technology Partner
          </span>
          <h2 className=" text-foreground mb-6">
            Powered by World-Class Technology
          </h2>
        </div>

        {/* Brands List */}
        <div className="w-full max-w-3xl mx-auto">
          {PARTNERS.map((brand, idx) => (
            <div
              key={idx}
              className="rp-brand p-8 sm:p-12 rounded-[2rem] border border-black/5 bg-panel shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <h3 className=" text-foreground mb-6 group-hover:text-accent transition-colors duration-300">
                {brand.name}
              </h3>
              <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed">
                {brand.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
