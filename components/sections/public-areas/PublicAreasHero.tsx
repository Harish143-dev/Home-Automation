"use client";

import NextImage from"next/image";
import React, { useRef } from"react";
import Link from"next/link";
import { Button } from"../../ui/button";
import { useBreakpoint } from"../../../hooks/useBreakpoint";
import { gsap, SplitText, useGSAP } from"../../../lib/gsapSetup";
import hero from"@/assets/residential/hero.jpg"; // Reusing placeholder for now

export function PublicAreasHero() {
  const containerRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { isReady } = useBreakpoint();

  // Entrance Animations
  useGSAP(
    () => {
      if (!containerRef.current || !isReady) return;

      const split = h1Ref.current
        ? new SplitText(h1Ref.current, { type:"words" })
        : null;

      if (split?.words) {
        gsap.set(split.words, { y: 40, opacity: 0 });
      } else {
        gsap.set(h1Ref.current, { y: 30, opacity: 0 });
      }

      gsap.set(subRef.current, { y: 20, autoAlpha: 0 });
      gsap.set(ctaRef.current, { y: 20, autoAlpha: 0 });

      const runEntrance = () => {
        const entranceTl = gsap.timeline({
          defaults: { ease:"power3.out" }
        });

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

        entranceTl.to(subRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
        }, 0.3);

        entranceTl.to(ctaRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
        }, 0.45);
      };

      runEntrance();

      return () => {
        split?.revert();
      };
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  return (
    <section
      ref={containerRef}
      id="public-areas-hero"
      className={`relative h-[100svh] w-full bg-black overflow-hidden flex flex-col justify-end transition-opacity duration-700 ${!isReady ?"opacity-0" :"opacity-100"}`}
    >
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <NextImage
          src={hero}
          alt="Intelligent Public Area Automation for Hospitality Spaces"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
      </div>

      <div className="h-28 sm:h-32 md:h-36 z-10 pointer-events-none" />

      <div className="relative z-10 w-full px-6 sm:px-12 md:px-20 lg:px-32 flex flex-col justify-end flex-grow pb-12 md:pb-16 lg:pb-20 pointer-events-none select-none">
        <div className="max-w-3xl flex flex-col items-start text-left">
          <h1
            ref={h1Ref}
            className="hero-element text-white text-balance mb-4 md:mb-6"
          >
            Intelligent Public Area Automation for Hospitality Spaces
          </h1>

          <p
            ref={subRef}
            className="hero-element text-sm md:text-base lg:text-lg text-white/80 font-light tracking-wide leading-relaxed max-w-2xl text-balance mb-6 md:mb-8"
          >
            Deliver exceptional guest experiences with intelligent automation for hotel lobbies, receptions, corridors, lounges, and other public spaces. ATPL integrates lighting, audio, climate, displays, networking, and security into one unified system, creating welcoming, energy-efficient, and easy-to-manage hospitality environments.
          </p>

          <div
            ref={ctaRef}
            className="pointer-events-auto flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact">
              <Button
                variant="interactive"
                size="lg"
                className="w-full sm:w-auto"
              >
                Schedule a Consultation
              </Button>
            </Link>
            <Link href="/api/brochure">
              <Button
                variant="glass"
                size="lg"
                className="w-full sm:w-auto"
              >
                Download Company Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
