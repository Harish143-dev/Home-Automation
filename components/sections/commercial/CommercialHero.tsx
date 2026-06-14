"use client";

import NextImage from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { gsap, SplitText, useGSAP } from "../../../lib/gsapSetup";

export function CommercialHero() {
  const containerRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { isReady } = useBreakpoint();

  // Entrance Animations
  useGSAP(
    () => {
      if (!containerRef.current || !isReady) return;

      let split: any = null;

      document.fonts.ready.then(() => {
        split = h1Ref.current
          ? new SplitText(h1Ref.current, { type: "words" })
          : null;

        // Set initial states
        if (split?.words) {
          gsap.set(split.words, { y: 40, opacity: 0 });
        } else {
          gsap.set(h1Ref.current, { y: 30, opacity: 0 });
        }

        gsap.set(subRef.current, { y: 20, autoAlpha: 0 });
        gsap.set(ctaRef.current, { y: 20, autoAlpha: 0 });

        const runEntrance = () => {
          const entranceTl = gsap.timeline({
            defaults: { ease: "power3.out" }
          });

          // Heading words cascade in
          if (split?.words) {
            entranceTl.to(split.words, {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 1.1,
            }, 0.1);
          } else {
            entranceTl.to(h1Ref.current, {
              y: 0,
              opacity: 1,
              duration: 1.1,
            }, 0.1);
          }

          // Subheading slides up
          entranceTl.to(subRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
          }, 0.3);

          // CTA button slides up
          entranceTl.to(ctaRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
          }, 0.45);
        };

        // Trigger entrance immediately on mount
        runEntrance();
      });

      return () => {
        if (split) split.revert();
      };
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  return (
    <section
      ref={containerRef}
      id="commercial-hero"
      className={`relative h-screen w-full bg-secondary overflow-hidden flex flex-col justify-between transition-opacity duration-700 ${!isReady ? "opacity-0" : "opacity-100"}`}
    >
      {/* 🎬 Static Background */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <NextImage
          src="/images/commercial_hero_bg.png"
          alt="Modern Intelligent Commercial Space"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Clean, simple dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-[2]" />
      </div>

      {/* 🌌 Premium Typography & CTA Content Overlay */}
      {/* Upper spacing for fixed NavBar alignment */}
      <div className="h-28 sm:h-32 md:h-36 z-10 pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-32 flex flex-col justify-end flex-grow pb-[8vh] sm:pb-[12vh] pointer-events-none select-none">
        <div className="max-w-3xl flex flex-col items-start text-left gap-5 sm:gap-7">

          {/* Refined editorial headline */}
          <h1
            ref={h1Ref}
            className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white text-balance"
          >
            The Responsive Workspace.
          </h1>

          {/* Understated luxury supporting text */}
          <p
            ref={subRef}
            className="text-sm md:text-base text-white/80 font-light tracking-wide leading-relaxed max-w-md text-balance"
          >
            We engineer adaptive commercial environments where infrastructure responds to human rhythms and environmental signals, adjusting light, sound, and micro climates to unlock focus, rest, and cross organizational connection.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="pointer-events-auto flex flex-col sm:flex-row gap-4"
          >
            <Link href="#consultation">
              <Button
                variant="accent"
                size="lg"
                shape="full"
                className="w-full sm:w-auto px-8 h-11 sm:h-12 md:h-14 font-medium tracking-wider text-xs sm:text-sm transition-all duration-500 hover:bg-accent-soft hover:shadow-[0_0_40px_rgba(140,24,23,0.35)]"
              >
                Schedule an Institutional Consultation
              </Button>
            </Link>
            
            <Link href="/projects/commercial">
              <Button
                variant="outline"
                size="lg"
                shape="full"
                className="w-full sm:w-auto px-8 h-11 sm:h-12 md:h-14 font-medium tracking-wider text-xs sm:text-sm bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-500"
              >
                Explore Commercial Portfolios
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
