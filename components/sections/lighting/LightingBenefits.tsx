"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { 
  Palette, 
  Heart, 
  Leaf, 
  ShieldCheck, 
  Gem, 
  Rocket 
} from "lucide-react";

const BENEFITS = [
  {
    id: "personalized-ambience",
    title: "Personalized Ambience",
    icon: Palette,
    description: "Create beautifully tailored lighting scenes for every occasion—from quiet evenings and family dinners to movie nights and social gatherings—all controlled with a touch, voice command, mobile app, or automated schedule."
  },
  {
    id: "enhanced-comfort",
    title: "Enhanced Comfort",
    icon: Heart,
    description: "Enjoy a home that intuitively adapts to your lifestyle with intelligent lighting, automated shades, and integrated climate control working together effortlessly."
  },
  {
    id: "energy-savings",
    title: "Energy Savings",
    icon: Leaf,
    description: "Lower energy consumption through smart scheduling, occupancy sensing, daylight-responsive lighting, and intelligent climate management without compromising comfort."
  },
  {
    id: "improved-security",
    title: "Improved Security",
    icon: ShieldCheck,
    description: "Increase peace of mind with automated lighting, smart locks, video doorbells, and occupancy simulation that gives your home a naturally occupied appearance when you're away."
  },
  {
    id: "elegant-living",
    title: "Elegant Living",
    icon: Gem,
    description: "Simplify everyday living by replacing multiple switches and remotes with elegant smart keypads and a single, intuitive control platform that complements your home's design."
  },
  {
    id: "future-ready",
    title: "Future Ready",
    icon: Rocket,
    description: "Create a connected home designed to evolve with your needs by bringing together lighting, shades, climate control, audio-video, security, Wi-Fi, and voice control into one intelligent ecosystem."
  }
];

export default function LightingBenefits() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

    tl.fromTo(".lb-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".lb-item",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-10 sm:py-12 md:py-16 px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div ref={headerRef} className="lb-header text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light">
            Value & Lifestyle
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-6">
            Everyday Benefits You'll Experience
          </h2>
        </div>

        {/* Benefits Grid */}
        <div ref={listRef} className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {BENEFITS.map((benefit, idx) => (
            <div 
              key={benefit.id} 
              className="lb-item flex flex-col items-start text-left"
            >
              <div className="w-14 h-14 rounded-full bg-panel flex items-center justify-center mb-6 border border-border shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <benefit.icon className="w-6 h-6 text-accent relative z-10" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-muted font-light text-sm md:text-base leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
