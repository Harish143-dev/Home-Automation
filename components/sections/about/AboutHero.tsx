"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import heroImage from "@/assets/projects/private-residence.jpg";
import { Button } from "@/components/ui/button";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { DURATION, EASE, STAGGER, SCROLL } from "@/lib/animation.config";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !textRef.current || !sectionRef.current) return;

    // Split text for line-by-line reveal
    const split = new SplitText(textRef.current.querySelectorAll(".hero-line"), {
      type: "lines",
      linesClass: "overflow-hidden"
    });

    const lines = split.lines.map((line) => {
      const inner = document.createElement('div');
      inner.innerHTML = line.innerHTML;
      line.innerHTML = '';
      line.appendChild(inner);
      return inner;
    });

    gsap.fromTo(lines,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: DURATION.slow,
        stagger: STAGGER.wide,
        ease: EASE.reveal,
        delay: 0.5
      }
    );

    const fadeElements = sectionRef.current.querySelectorAll('.hero-fade-up');
    if (fadeElements.length > 0) {
      gsap.fromTo(fadeElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DURATION.normal,
          stagger: STAGGER.normal,
          ease: EASE.reveal,
          delay: 1.2
        }
      );
    }

    // Subtle parallax on the background image
    gsap.to(".about-hero-bg", {
      yPercent: 15,
      ease: EASE.none,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: SCROLL.scrub,
      }
    });

    scheduleScrollRefresh();

    return () => split.revert();
  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-end overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 about-hero-bg will-change-transform">
        <NextImage
          src={heroImage}
          alt="Architectural Smart Home"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-24 flex flex-col items-start text-left mt-12 md:mt-20">

        <div ref={textRef} className="flex flex-col">
          <div className="hero-line">
            <h1 className="hero-element text-white text-balance mb-2">
              Engineering Intelligent
            </h1>
          </div>
          <div className="hero-line">
            <h1 className="hero-element text-white text-balance mb-2">
              Spaces Since 2002
            </h1>
          </div>
        </div>

        <p className="hero-element text-sm md:text-base lg:text-lg text-white/80 font-light tracking-wide leading-relaxed max-w-2xl text-balance mb-4">
          Transforming homes, hotels, and commercial spaces with intelligent automation, innovative technology, and seamless user experiences for over 20 years.
        </p>

        <div className="hero-fade-up mt-10 flex flex-col sm:flex-row items-center justify-start gap-4 opacity-0">
          <Link href="/projects" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Explore Our Solutions
            </Button>
          </Link>
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="shiny" size="lg" className="w-full sm:w-auto">
              Talk to Our Experts
            </Button>
          </Link>
        </div>
      </div>
      {/* Red curved wave bottom */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#F1EBD9" />
        </svg>
      </div>
    </section>
  );
}
