"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ArrowRight, FileText } from "lucide-react";

export default function MduCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(".cta-content > *",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 80%",
        }
      }
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-24 md:py-32 lg:py-40 px-5 sm:px-8 md:px-16 lg:px-24 bg-secondary text-white overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <filter id="noiseFilter-cta"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter-cta)" />
      </svg>

      <div className="cta-content relative z-10 max-w-4xl flex flex-col items-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-[1px] w-6 bg-white/30" />
          <span className="text-sm md:text-base tracking-[0.3em] text-white/50">
            Next Steps
          </span>
          <div className="h-[1px] w-6 bg-white/30" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide leading-[1.1] mb-6">
          Build Smarter Residential Communities with Intelligent Automation
        </h2>

        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-3xl mb-12">
          Partner with Anusha Technovision to design scalable, future-ready Multi-Dwelling Unit automation solutions that elevate modern living and add lasting value to your developments.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link 
            href="/contact"
            className="group relative flex items-center justify-center gap-3 px-8 sm:px-10 h-14 bg-accent text-white rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <span className="relative z-10 text-sm tracking-widest uppercase font-medium">Talk to an Expert</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
          
          <Link 
            href="/contact"
            className="group relative flex items-center justify-center gap-3 px-8 sm:px-10 h-14 bg-white/5 border border-white/20 text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-white/40 w-full sm:w-auto"
          >
            <span className="relative z-10 text-sm tracking-widest uppercase font-medium">Request a Proposal</span>
            <FileText className="relative z-10 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
