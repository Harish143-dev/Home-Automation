"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { 
  LayoutGrid, 
  ShieldCheck, 
  Leaf, 
  Network, 
  Gem, 
  Home 
} from "lucide-react";

const BRANDS = [
  {
    name: "Lutron",
    description: "The global leader in lighting control, delivering intelligent dimming, motorized shades, and seamless smart home integration with exceptional reliability."
  },
  {
    name: "Future KNX",
    description: "Open-standard KNX automation for flexible, scalable control of lighting, HVAC, blinds, and energy management across the entire home."
  },
  {
    name: "JUNG",
    description: "German-engineered keypads and control interfaces that combine timeless aesthetics with advanced smart home functionality."
  },
  {
    name: "Basalte",
    description: "Award-winning designer keypads and touch interfaces that blend luxury craftsmanship with intuitive control for modern residences."
  },
  {
    name: "Zennio",
    description: "Innovative KNX automation solutions offering elegant touch panels, intelligent room controllers, and energy-efficient home automation."
  }
];

const REASONS = [
  {
    title: "Elegant Wireless & Wired Keypads",
    description: "Beautifully designed control interfaces that complement luxury interiors.",
    icon: LayoutGrid
  },
  {
    title: "Reliable Performance",
    description: "Enterprise-grade systems engineered for long-term stability and dependable operation.",
    icon: ShieldCheck
  },
  {
    title: "Energy Efficient",
    description: "Intelligent scheduling, occupancy sensing, and daylight-based control help optimize energy consumption.",
    icon: Leaf
  },
  {
    title: "Expandable System",
    description: "Easily add lighting, shades, HVAC, audio-video, security, and voice control as your needs evolve.",
    icon: Network
  },
  {
    title: "Premium Design",
    description: "Sophisticated finishes and customizable keypads that enhance every living space.",
    icon: Gem
  },
  {
    title: "Smart Home Integration",
    description: "Unified control of lighting, climate, motorized shades, entertainment, and security from a single platform.",
    icon: Home
  }
];

export default function LightingPartners() {
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

    tl.fromTo(".lp-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".lp-brand",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(".lp-reason",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      {/* Subtle Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-partners">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-partners)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="lp-header text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light">
            Global Partners
          </span>
          <h2 className="text-foreground mb-6">
            Powered by World-Class Lighting Control Systems
          </h2>
          <p className="text-muted font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            ATPL partners with globally trusted automation brands to deliver intelligent, reliable, and future-ready lighting control solutions for luxury residences. Our systems are designed to integrate seamlessly, offering exceptional performance, elegant design, and effortless control.
          </p>
        </div>

        {/* Brands List */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28 justify-center">
          {BRANDS.map((brand, idx) => (
            <div 
              key={idx}
              className="lp-brand p-8 rounded-2xl border border-border bg-panel shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-300 flex flex-col items-start text-left"
            >
              <h3 className="text-foreground mb-3">
                {brand.name}
              </h3>
              <p className="text-muted font-light text-sm sm:text-base md:text-lg leading-relaxed">
                {brand.description}
              </p>
            </div>
          ))}
        </div>

        {/* Why These Technologies */}
        <div className="w-full">
          <div className="lp-header mb-12 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-accent/50" />
            <h3 className="text-foreground text-center">
              Why These Technologies?
            </h3>
            <div className="h-[1px] w-12 bg-accent/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 md:gap-y-12 w-full">
            {REASONS.map((reason, idx) => (
              <div 
                key={idx} 
                className="lp-reason flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-panel flex items-center justify-center mb-6 border border-border shadow-sm relative overflow-hidden group-hover:scale-110 transition-transform duration-500 ease-out">
                  <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <reason.icon className="w-7 h-7 text-accent relative z-10" strokeWidth={1.2} />
                </div>
                
                <h4 className="text-foreground mb-3">
                  {reason.title}
                </h4>
                
                <p className="text-muted font-light text-sm sm:text-base md:text-lg leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
