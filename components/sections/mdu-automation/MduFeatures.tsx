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
  Tv, 
  Wifi 
} from "lucide-react";

const SYSTEMS = [
  {
    id: "lighting",
    title: "Lighting Control System",
    icon: Lightbulb,
    spanClass: "md:col-span-2 lg:col-span-2",
    items: [
      "Lighting Control processor",
      "Lighting Control Dimmer module",
      "Wireless occupancy",
      "Keypad"
    ]
  },
  {
    id: "hvac",
    title: "HVAC Control System",
    icon: Thermometer,
    spanClass: "col-span-1",
    items: [
      "Interface for HVAC",
      "Thermostat"
    ]
  },
  {
    id: "shades",
    title: "Motorised Shades",
    icon: Blinds,
    spanClass: "col-span-1",
    items: [
      "Roller Blinds",
      "Drapery Track"
    ]
  },
  {
    id: "audio",
    title: "Audio System",
    icon: Speaker,
    spanClass: "md:col-span-2 lg:col-span-2",
    items: [
      "Amplifier",
      "Decorative on wall speaker",
      "In Ceiling Speaker",
      "Decorative Hanging speaker"
    ]
  },
  {
    id: "security",
    title: "Security System",
    icon: ShieldCheck,
    spanClass: "md:col-span-2 lg:col-span-2",
    items: [
      "Camera",
      "Door Bell with Camera",
      "Digital door lock"
    ]
  },
  {
    id: "theater",
    title: "Home Theater System",
    icon: Film,
    spanClass: "col-span-1",
    items: [
      "Projector",
      "Screen"
    ]
  },
  {
    id: "tv",
    title: "Motorized TV Lift",
    icon: Tv,
    spanClass: "col-span-1",
    items: []
  },
  {
    id: "wifi",
    title: "Wi-Fi Access Points",
    icon: Wifi,
    spanClass: "md:col-span-2 lg:col-span-2",
    items: []
  }
];

export default function MduFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(".feature-header",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
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
      className="relative w-full py-20 sm:py-28 md:py-32 lg:py-48 px-5 sm:px-8 md:px-16 lg:px-24 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="feature-header max-w-4xl text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-6 bg-accent/30" />
            <span className="text-sm md:text-base tracking-[0.3em] text-accent">
              Smart Home Automation
            </span>
            <div className="h-[1px] w-6 bg-accent/30" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-6">
            Intelligent Automation Designed for Modern Residential Communities
          </h2>
          
          <p className="text-muted font-light text-base md:text-lg leading-relaxed max-w-3xl">
            Our Multi Division unit (MDU) solution enables developers and builders to deliver connected, future-ready apartments equipped with intelligent lighting, climate, entertainment, security, and centralized control systems.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SYSTEMS.map((system) => (
            <div 
              key={system.id} 
              className={`bento-card group relative flex flex-col p-8 rounded-2xl bg-panel shadow-sm border border-border overflow-hidden transition-shadow duration-500 hover:shadow-xl ${system.spanClass}`}
            >
              {/* Subtle Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ease-out border border-border">
                  <system.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl md:text-2xl font-light tracking-wide text-foreground mb-4">
                  {system.title}
                </h3>
                
                {system.items.length > 0 && (
                  <ul className="flex flex-col gap-2.5 mt-auto pt-4 border-t border-border/50">
                    {system.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm md:text-base text-muted font-light">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
