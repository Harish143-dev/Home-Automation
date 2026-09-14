"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap, SplitText, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function AMCCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current || !headlineRef.current) return;

    let split: any = null;

    document.fonts.ready.then(() => {
      if (!headlineRef.current || !sectionRef.current) return;
      split = new SplitText(headlineRef.current, {
        type: "lines,words",
        linesClass: "overflow-hidden"
      });

      gsap.from(split.words, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        yPercent: 120,
        rotationZ: 2,
        opacity: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
      });
    });

    gsap.from(".cta-subhead", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3
    });

    gsap.from(".cta-btn-group", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 55%",
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.4
    });

    return () => {
      if (split) split.revert();
    };
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative flex flex-col items-center justify-center w-full bg-background overflow-hidden px-6 border-t border-black/5"
    >
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-accent/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-[1440px] mx-auto w-full">

        <div className="flex items-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-black/10" />
          <h5 className="text-accent !mb-0">
            Secure Your Systems
          </h5>
          <div className="h-[1px] w-12 bg-black/10" />
        </div>

        <h2
          ref={headlineRef}
          className="text-foreground mb-8 text-balance max-w-4xl"
        >
          Keep Your Intelligent Space Performing at Its Best
        </h2>

        <p className="cta-subhead text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-muted-foreground max-w-3xl mx-auto mb-12 text-balance">
          From smart home automation and lighting to AV, networking, security and HVAC systems, our AMC services provide the ongoing support your technology needs.
        </p>

        <div className="cta-btn-group flex flex-col sm:flex-row items-center gap-5 sm:gap-6 w-full sm:w-auto">
          <Link href="/contact">
            <Button
              variant="interactive"
              size="lg"
              className="w-full sm:w-auto"
            >
              Request an AMC Consultation
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto rounded-full"
            >
              <Headset className="w-5 h-5 mr-2 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
              <span className="text-base sm:text-lg font-medium tracking-wide">
                Talk to Our Support Team
              </span>
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
