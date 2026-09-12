"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useGSAP, gsap, SplitText } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Button } from "@/components/ui/button";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

export default function WifiAutomationHero() {
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
 gsap.to(".wifi-hero-bg", {
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
 className="relative w-full h-[100svh] min-h-[600px] flex overflow-hidden bg-black flex-col justify-end"
 >
 
 {/* Background Image */}
 <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
 <div className="wifi-hero-bg absolute inset-0 w-full h-full scale-110">
 <NextImage 
 src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
 alt="Intelligent Wi-Fi and Networking Solutions"
 fill
 priority
 className="object-cover opacity-60"
 />
 </div>
 {/* Dark gradient overlay to ensure text readability */}
 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[2]" />
 </div>

 {/* Content Container (Left Aligned) */}
 <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col items-start justify-end flex-grow pb-16 md:pb-24 pointer-events-none select-none">
 
 <h5 className="hero-element text-white/80 mb-4 md:mb-6">
 Wi-Fi & Networking
 </h5>
 
 <h1 
 ref={textRef} 
 className="text-white text-balance mb-6 max-w-4xl"
 >
 Intelligent Wi-Fi & Networking Solutions for Connected Spaces
 </h1>
 
 <p className="hero-element text-white/80 font-light text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed text-balance mb-6">
 Build a fast, secure, and reliable network infrastructure designed to power intelligent homes, commercial environments, and hospitality spaces. From seamless Wi-Fi coverage to integrated networking, we create connectivity solutions tailored to your requirements.
 </p>

 <div className="pointer-events-auto hero-element flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
 <Link href="/contact" className="w-full sm:w-auto">
 <Button variant="interactive" size="lg" className="w-full sm:w-auto">
 Talk to a Connectivity Expert
 </Button>
 </Link>
 <Link href="/contact" className="w-full sm:w-auto">
 <Button variant="shiny" size="lg" className="w-full sm:w-auto">
 Explore Our Solutions
 </Button>
 </Link>
 </div>

 </div>

 </section>
 );
}
