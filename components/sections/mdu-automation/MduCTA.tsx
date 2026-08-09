"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden flex flex-col items-center justify-center text-center"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <filter id="noiseFilter-cta"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter-cta)" />
      </svg>

      <div className="cta-content relative z-10 max-w-4xl flex flex-col items-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="h-[1px] w-6 bg-accent/30" />
          <span className="text-sm md:text-base tracking-[0.3em] text-accent">
            Next Steps
          </span>
          <div className="h-[1px] w-6 bg-accent/30" />
        </div>

        <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl mb-6">
          Build Smarter Residential Communities with Intelligent Automation
        </h2>

        <p className="text-lg md:text-xl text-muted font-light leading-relaxed max-w-3xl mb-12">
          Partner with Anusha Technovision to design scalable, future-ready Multi-Dwelling Unit automation solutions that elevate modern living and add lasting value to your developments.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Talk to an Expert
            </Button>
          </Link>

          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Request a Proposal
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
