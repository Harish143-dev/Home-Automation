"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function LightingCTA() {
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

    tl.fromTo(".lcta-content",
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".lcta-btn",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" },
      "-=0.4"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground"
    >
      <div className="max-w-5xl mx-auto lcta-content bg-panel border border-border shadow-sm rounded-3xl p-10 md:p-16 lg:p-20 text-center relative overflow-hidden flex flex-col items-center">

        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-6 max-w-3xl relative z-10">
          Ready to Transform Your Home with Intelligent Lighting?
        </h2>

        <p className="text-muted font-light text-base md:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl relative z-10">
          Discover how personalized lighting automation can enhance comfort, improve energy efficiency, and elevate everyday living. Speak with our experts to design a solution tailored to your home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto relative z-10">

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "accent", size: "lg" }),
              "lcta-btn w-full sm:w-auto tracking-wide text-base gap-3 rounded-full"
            )}
          >
            <Calendar className="w-5 h-5" />
            Schedule a Consultation
          </Link>

          <Link
            href="/experience-center"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "lcta-btn group w-full sm:w-auto tracking-wide text-base gap-3 rounded-full border-border hover:border-accent hover:text-accent hover:bg-accent/5"
            )}
          >
            Visit an Experience Center
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>
      </div>
    </section>
  );
}
