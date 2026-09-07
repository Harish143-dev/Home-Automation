"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { useRef } from "react";

export function AudioVideoCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(
      ".cta-element",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        
        <div className="flex flex-col items-center">
          <h5 className="cta-element text-accent mb-6 font-medium">
            Start Your Project
          </h5>
          
          <h2 className="cta-element text-foreground mb-8 text-balance">
            Ready to Make Your Space More Intelligent?
          </h2>
          
          <p className="cta-element text-muted-foreground font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            Whether you're automating a luxury residence, hospitality environment, or commercial space, our experts can design an audio video solution around your requirements.
          </p>
          
          <div className="cta-element flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                Talk to an Audio Video Expert
              </Button>
            </Link>
            
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-black/20 hover:bg-black/5">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
