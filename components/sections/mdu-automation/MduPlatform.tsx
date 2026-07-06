"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { 
  Lightbulb, 
  Thermometer, 
  Blinds, 
  ShieldCheck, 
  Speaker, 
  Film, 
  LayoutGrid, 
  Wifi 
} from "lucide-react";

const PLATFORM_FEATURES = [
  {
    id: "lighting",
    title: "Lighting Control",
    description: "Smart dimming, scenes, scheduling and occupancy control.",
    icon: Lightbulb
  },
  {
    id: "hvac",
    title: "HVAC Control",
    description: "Maintain ideal indoor temperatures while reducing energy consumption.",
    icon: Thermometer
  },
  {
    id: "shades",
    title: "Motorized Shades",
    description: "Automate curtains and blinds based on time, sunlight or occupancy.",
    icon: Blinds
  },
  {
    id: "security",
    title: "Security System",
    description: "Door locks, cameras, video door phones and guest access.",
    icon: ShieldCheck
  },
  {
    id: "audio",
    title: "Audio Distribution",
    description: "Multi-room entertainment with premium audio experiences.",
    icon: Speaker
  },
  {
    id: "theater",
    title: "Home Theatre",
    description: "Integrated cinema experience with one-touch control.",
    icon: Film
  },
  {
    id: "keypads",
    title: "Wireless Keypads",
    description: "Elegant scene-based controls replacing traditional switches.",
    icon: LayoutGrid
  },
  {
    id: "wifi",
    title: "Wi-Fi Infrastructure",
    description: "Reliable connectivity supporting the complete automation ecosystem.",
    icon: Wifi
  }
];

export default function MduPlatform() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(".platform-header",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".platform-header",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".platform-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".platform-grid",
          start: "top 80%",
        }
      }
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-16 lg:px-24 bg-secondary text-white overflow-hidden"
    >
      {/* Dark Section Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none">
        <filter id="noiseFilter-platform"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter-platform)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="platform-header max-w-4xl text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-6 bg-white/30" />
            <span className="text-sm md:text-base tracking-[0.3em] text-white/50">
              Intelligent Platform
            </span>
            <div className="h-[1px] w-6 bg-white/30" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-white mb-6">
            Everything Connected Through One Intelligent Platform
          </h2>
          
          <p className="text-white/70 font-light text-base md:text-lg leading-relaxed max-w-3xl">
            Control every essential function of your apartment from a single intuitive interface using elegant keypads, mobile applications, or voice assistants.
          </p>
        </div>

        {/* Grid */}
        <div className="platform-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-16">
          {PLATFORM_FEATURES.map((feature) => (
            <div 
              key={feature.id} 
              className="platform-card group flex flex-col relative pt-4"
            >
              <div className="absolute top-0 left-0 w-8 h-[1px] bg-white/20 group-hover:w-full group-hover:bg-accent transition-all duration-700 ease-in-out" />

              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500 mt-2">
                <feature.icon className="w-5 h-5 text-white/90 group-hover:text-accent-soft transition-colors duration-500" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-light tracking-wide text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
