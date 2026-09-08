"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

export function SecurityAutomationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(".sec-cta-element",
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground flex flex-col items-center justify-center text-center border-t border-black/5"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        <h2 className="sec-cta-element text-foreground mb-6 text-balance">
          Build a Smarter, More Secure Environment
        </h2>
        
        <p className="sec-cta-element text-muted-foreground font-light text-lg md:text-xl leading-relaxed text-balance max-w-3xl mb-12">
          Whether you're securing a luxury residence, hotel, office, or large commercial property, our experts can design an integrated security solution around your requirements.
        </p>
        
        <div className="sec-cta-element flex flex-col sm:flex-row gap-5 items-center justify-center w-full">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Discuss Your Security Requirements
            </Button>
          </Link>
          
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Talk to a Security Expert
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
