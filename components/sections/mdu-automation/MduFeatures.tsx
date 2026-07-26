"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { 
  Lightbulb, 
  Blinds, 
  Thermometer, 
  ShieldCheck, 
  Speaker, 
  Film, 
  LayoutGrid, 
  Wifi 
} from "lucide-react";

const EXPERTISE = [
  "Apartments",
  "Entrance Lobbies",
  "Clubhouses",
  "Common Areas",
  "Amenities and Recreational Spaces"
];

const SYSTEMS = [
  {
    id: "lighting",
    title: "Lighting Control",
    icon: Lightbulb,
    description: "Lighting automation enables scene-based control, scheduling, and motion/occupancy-based operation. It also supports security lighting response and keypad-based control for easy management."
  },
  {
    id: "audio-video",
    title: "Audio Video Solutions",
    icon: Speaker,
    description: "Provides centralized control of multi-room audio and video systems with streaming support, home theatre integration, and coverage of indoor and outdoor areas."
  },
  {
    id: "security",
    title: "Security Solutions",
    icon: ShieldCheck,
    description: "Includes surveillance, access control, remote monitoring, video door phone integration, smart locks, and intrusion detection systems for overall security."
  },
  {
    id: "shades",
    title: "Shades Solutions",
    icon: Blinds,
    description: "Motorized blinds and curtains with time- and sunlight-based control. Supports manual scene or one-touch operation for privacy and shading."
  },
  {
    id: "hvac",
    title: "HVAC Solutions",
    icon: Thermometer,
    description: "Automated temperature control based on occupancy and schedules to improve comfort and reduce energy use."
  },
  {
    id: "theater",
    title: "Home Theatre",
    icon: Film,
    description: "Provides integrated audio and video control for a cinema-like experience at home with centralized switching and high-quality output."
  },
  {
    id: "keypads",
    title: "Wireless Keypads",
    icon: LayoutGrid,
    description: "Simple wall-mounted or portable controls to manage lighting and scenes without using mobile apps or switches."
  },
  {
    id: "wifi",
    title: "Wi-Fi Infrastructure",
    icon: Wifi,
    description: "Ensures stable, high-speed connectivity across the space for all smart devices, automation, and streaming needs."
  }
];

export default function MduFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(".feature-header-el",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".feature-header",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".bento-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 80%",
        }
      }
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="feature-header max-w-4xl text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="feature-header-el mb-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-6 bg-accent/30" />
            <span className="text-sm md:text-base tracking-[0.3em] text-accent">
              Smart Home Automation
            </span>
            <div className="h-[1px] w-6 bg-accent/30" />
          </div>
          
          <h2 className="feature-header-el text-foreground mb-8">
            Intelligent Automation Designed for Modern Residential Communities
          </h2>
          
          <p className="feature-header-el text-muted font-light text-base md:text-lg leading-relaxed max-w-3xl mb-8">
            We deliver intelligent automation solutions for Multi-Dwelling Unit (MDU) developments, creating connected and efficient living experiences across residential communities.
          </p>

          <div className="feature-header-el flex flex-wrap justify-center gap-3 mb-10">
            {EXPERTISE.map((exp, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full border border-border/60 bg-black/[0.02] text-sm md:text-base font-light text-muted">
                {exp}
              </span>
            ))}
          </div>

          <p className="feature-header-el text-muted font-light text-base md:text-lg leading-relaxed max-w-3xl mb-6">
            Our solutions are powered by Lutron and designed to support future KNX integration, ensuring flexibility, scalability, and long-term value for modern developments.
          </p>
          
          <p className="feature-header-el text-muted font-light text-base md:text-lg leading-relaxed max-w-3xl">
            We have successfully delivered automation solutions for leading residential projects by developers such as Unity Amaryllis, Elan, and M3M, enhancing comfort, convenience, energy efficiency, and the overall resident experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="bento-grid w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SYSTEMS.map((system) => (
            <div 
              key={system.id} 
              className="bento-card group relative flex flex-col p-8 rounded-2xl bg-panel shadow-sm border border-border overflow-hidden transition-shadow duration-500 hover:shadow-xl"
            >
              {/* Subtle Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out border border-border">
                  <system.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-foreground mb-3">
                  {system.title}
                </h3>
                
                <p className="text-muted font-light text-sm md:text-base leading-relaxed mt-auto">
                  {system.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
