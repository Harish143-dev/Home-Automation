"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import heroImage from "@/assets/projects/private-residence.jpg";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function MduHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

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
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
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
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 1.2
        }
      );
    }

    // Subtle parallax on the background image
    gsap.to(".mdu-hero-bg", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => split.revert();
  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] flex justify-end overflow-hidden bg-black flex-col justify-end"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 mdu-hero-bg will-change-transform">
        <NextImage
          src={heroImage}
          alt="Smart Multi-Dwelling Unit (MDU) Automation"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic dark overlay */}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col items-start justify-end flex-grow pb-16 md:pb-24 pointer-events-none select-none">

        <div ref={textRef} className="flex flex-col">
          <div className="hero-line">
            <h1 className="hero-element text-white text-balance mb-6 max-w-4xl">
              Smart Multi-Dwelling Unit (MDU)
            </h1>
          </div>
          <div className="hero-line">
            <h1 className="hero-element text-white text-balance mb-6 max-w-4xl">
              Automation Solutions
            </h1>
          </div>
        </div>

        <p className="hero-element font-light text-white/80 text-lg md:text-xl max-w-2xl mb-10 text-balance">
          Create intelligent apartment communities with integrated smart home automation that enhances convenience, energy efficiency, security, and modern living for every resident.
        </p>

        <div className="hero-fade-up mt-10 flex flex-col sm:flex-row items-center justify-start gap-4 opacity-0 w-full sm:w-auto">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Schedule a Consultation
            </Button>
          </Link>
          <a href="/api/brochure" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <Button variant="shiny" size="lg" className="w-full sm:w-auto">
              Download Brochure
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
