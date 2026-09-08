"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

export function WifiAutomationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(".wifi-cta-element",
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
        
        <h2 className="wifi-cta-element text-foreground mb-6 text-balance">
          Build a Stronger Foundation for Your Connected Space
        </h2>
        
        <p className="wifi-cta-element text-muted-foreground font-light text-lg md:text-xl leading-relaxed text-balance max-w-3xl mb-12">
          Whether you're building a smart home, commercial environment, or hospitality project, our experts can help design reliable, secure, and scalable Wi-Fi and network infrastructure tailored to your requirements.
        </p>
        
        <div className="wifi-cta-element flex flex-col sm:flex-row gap-5 items-center justify-center w-full">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Talk to a Connectivity Expert
            </Button>
          </Link>
          
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Request a Consultation
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
