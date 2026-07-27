"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";

export default function CareersHero() {
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

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-end overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <NextImage
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
          alt="Careers at Anusha Technovision"
          fill
          priority
          className="hero-bg object-cover opacity-60 scale-105"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-24 flex flex-col items-center text-center mt-12 md:mt-20">
        <div className="hero-element mb-2 flex items-center justify-end gap-4 overflow-hidden">
          <div className="h-[1px] w-8 bg-white/40" />
          <span className="hero-element block text-[10px] sm:text-xs tracking-[0.3em] text-accent uppercase mb-4">
            Careers
          </span>
          <div className="h-[1px] w-8 bg-white/40" />
        </div>

        <h1
          ref={textRef}
          className="hero-element text-white text-balance mb-2"
        >
          Build the Future of Smart Automation with Anusha Technovision
        </h1>

        <p className="hero-element text-sm md:text-base lg:text-lg text-white/80 font-light tracking-wide leading-relaxed max-w-2xl text-balance mb-4">
          Join a team that&apos;s shaping intelligent homes, hospitality, and commercial spaces through automation, innovation, and engineering excellence.
        </p>

        <div className="hero-element flex flex-col sm:flex-row items-center ">
          <Link
            href="#open-positions"
            className={cn(
              buttonVariants({ variant: "glass", size: "lg", shape: "pill" }),
              "group overflow-hidden"
            )}
          >
            <span className="hero-element block text-[10px] sm:text-xs tracking-[0.3em] text-accent uppercase mb-4">View Open Positions</span>
            <ArrowRight className="relative z-10 ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </Link>
        </div>
      </div>
    </section>
  );
}
