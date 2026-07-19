"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ArrowRight, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";

export default function LightingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current || !textRef.current) return;

    // Split text for staggered line reveal
    const split = new SplitText(textRef.current, { type: "lines" });

    // Initial state
    gsap.set(split.lines, { y: 30, opacity: 0 });

    const tl = gsap.timeline();

    tl.to(split.lines, {
      y: 0,
      opacity: 1,
      duration: DURATION.slow,
      stagger: STAGGER.normal,
      ease: EASE.premium,
      delay: 0.2
    })
      .fromTo(".hero-element",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.normal, stagger: STAGGER.wide, ease: EASE.reveal },
        "-=0.8"
      );

    // Subtle parallax on the background image
    gsap.to(".hero-bg", {
      yPercent: 15,
      ease: EASE.none,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    scheduleScrollRefresh();

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-start overflow-hidden bg-black"
    >
      {/* Background Image - Stunning Luxury Smart Lighting */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <NextImage
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Smart Lighting Automation"
          fill
          priority
          className="hero-bg object-cover opacity-60 scale-105"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Content Container (Left Aligned) */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-24 flex flex-col items-start text-left mt-12 md:mt-20">

        {/* H1 Heading sizing strictly matching DESIGN_SYSTEM.md */}
        <h1
          ref={textRef}
          className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white mb-8 max-w-5xl"
        >
          Smart Lighting Automation for Modern Homes
        </h1>

        {/* Subheading */}
        <p className="hero-element text-sm sm:text-base md:text-lg text-white/70 font-light leading-relaxed max-w-3xl mb-12">
          Transform everyday living with intelligent lighting that automatically adjusts to your routine. From relaxing evenings to entertaining guests, create the perfect ambience with customized scenes, voice control, and seamless automation—all while improving energy efficiency and convenience.
        </p>

        {/* Left Aligned CTA Container */}
        <div className="hero-element flex flex-col sm:flex-row items-start justify-start gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Primary CTA */}
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "accent", size: "lg", shape: "full" }),
              "group overflow-hidden w-full sm:w-auto"
            )}
          >
            <span className="relative z-10 tracking-widest text-sm">Book a Consultation</span>
            <ArrowRight className="relative z-10 ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/experience-center"
            className={cn(
              buttonVariants({ variant: "glass", size: "lg", shape: "full" }),
              "group overflow-hidden w-full sm:w-auto"
            )}
          >
            <MapPin className="relative z-10 mr-3 w-4 h-4 text-white/70" />
            <span className="relative z-10 tracking-widest text-sm text-white/90">Visit Our Experience Center</span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </div>
    </section>
  );
}
