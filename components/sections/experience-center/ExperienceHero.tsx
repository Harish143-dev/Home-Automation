"use client";

import NextImage from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { gsap, SplitText, useGSAP } from "../../../lib/gsapSetup";

export function ExperienceHero() {
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

 return () => {
 split?.revert();
 };
 },
 { scope: containerRef, dependencies: [isReady] }
 );

 return (
 <section
 ref={containerRef}
 id="experience-hero"
 className={`relative h-[100svh] w-full bg-black overflow-hidden flex flex-col justify-end transition-opacity duration-700 ${!isReady ? "opacity-0" : "opacity-100"}`}
 >
 {/* 🎬 Static Background */}
 <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
 <NextImage
 src="/images/residential_hero_bg.png"
 alt="Immersive Smart Home Automation Experience"
 fill
 priority
 sizes="100vw"
 className="object-cover"
 />

 {/* Clean, simple dark gradient overlay for text readability */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
 </div>

 {/* 🌌 Premium Typography & CTA Content Overlay */}
 {/* Upper spacing for fixed NavBar alignment */}
 <div className="h-28 sm:h-32 md:h-36 z-10 pointer-events-none" />

 <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col items-start justify-end flex-grow pb-16 md:pb-24 pointer-events-none select-none">
 <div className="max-w-3xl flex flex-col items-start text-left ">

 {/* Refined editorial headline */}
 <h1
 ref={h1Ref}
 className="hero-element text-white text-balance mb-6 max-w-4xl"
 >
 Experience Intelligent Automation <br className="hidden sm:inline" />
 in Real Life
 </h1>

 {/* Understated luxury supporting text */}
 <p
 ref={subRef}
 className="hero-element font-light text-white/80 text-lg md:text-xl max-w-2xl mb-6 text-balance"
 >
 Visit our experience centres in Delhi, Mumbai, and Bangalore to explore immersive smart automation solutions across residential, hospitality, and commercial environments.
 </p>

 {/* CTA Buttons */}
 <div
 ref={ctaRef}
 className="pointer-events-auto flex flex-col sm:flex-row gap-4"
 >
 <Link href="/contact">
 <Button variant="interactive" size="lg" className="w-full sm:w-auto"
 >
 Schedule a Visit
 </Button>
 </Link>

 <Link href="/contact">
 <Button variant="shiny" size="lg" className="w-full sm:w-auto"
 >
 Book a Virtual Demo
 </Button>
 </Link>
 </div>
 </div>
 </div>
 </section>
 );
}
