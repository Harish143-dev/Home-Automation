"use client";

import { useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { 
  Lightbulb, 
  Blinds, 
  ThermometerSun, 
  ShieldCheck, 
  Speaker, 
  Film, 
  Tv, 
  Wifi 
} from "lucide-react";

const SYSTEM_NODES = [
  {
    id: "lighting",
    title: "Lighting Control System",
    icon: Lightbulb,
    items: ["Lighting Control processor", "Lighting Control Dimmer module", "Wireless occupancy", "Keypad"]
  },
  {
    id: "shades",
    title: "Motorised Shades",
    icon: Blinds,
    items: ["Roller Blinds", "Drapery Track"]
  },
  {
    id: "hvac",
    title: "HVAC Control System",
    icon: ThermometerSun,
    items: ["Interface for HVAC", "Thermostat"]
  },
  {
    id: "security",
    title: "Security System",
    icon: ShieldCheck,
    items: ["Camera", "Door Bell with Camera", "Digital door lock"]
  },
  {
    id: "audio",
    title: "Audio System",
    icon: Speaker,
    items: ["Amplifier", "Decorative on wall speaker", "In Ceiling Speaker", "Decorative Hanging speaker"]
  },
  {
    id: "theater",
    title: "Home Theater System",
    icon: Film,
    items: ["Projector", "Screen"]
  },
  {
    id: "tv-lift",
    title: "Motorized TV Lift",
    icon: Tv,
    items: []
  },
  {
    id: "wifi",
    title: "Wi-Fi Access Points",
    icon: Wifi,
    items: []
  }
];

export default function LightingControls() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady, isDesktop } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".lc-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".lc-center",
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" },
      "-=0.4"
    );

    tl.fromTo(".lc-node",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.6"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  // Split nodes for desktop layout
  const leftNodes = SYSTEM_NODES.slice(0, 4);
  const rightNodes = SYSTEM_NODES.slice(4, 8);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="lc-header text-center max-w-3xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light uppercase">
            Ecosystem
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-6">
            Control Your Home Your Way
          </h2>
          <p className="text-muted font-light text-sm md:text-base leading-relaxed max-w-2xl">
            Choose the control method that's most convenient for you. Our unified smart home architecture perfectly integrates every vital system into a single, intuitive interface.
          </p>
        </div>

        {/* Ecosystem Layout */}
        <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-12 lg:gap-8">
          
          {/* Left Column (Nodes) */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8 justify-center order-2 lg:order-1">
            {leftNodes.map((node) => (
              <div key={node.id} className="lc-node flex flex-col lg:flex-row items-start lg:items-center gap-4 bg-panel p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:border-accent/30 group">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0 border border-border group-hover:bg-accent/5 transition-colors">
                  <node.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-lg font-medium text-foreground tracking-wide mb-1">{node.title}</h3>
                  {node.items.length > 0 && (
                    <p className="text-sm text-muted font-light leading-relaxed">
                      {node.items.join(" • ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Center Column (Tablet Hub) */}
          <div className="lc-center flex-1 lg:flex-[1.2] flex items-center justify-center order-1 lg:order-2 relative min-h-[300px] lg:min-h-[500px]">
            {/* Pulsing rings behind tablet */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[120%] aspect-square rounded-full border border-accent/10 absolute animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <div className="w-[100%] aspect-square rounded-full border border-accent/20 absolute animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite_1s]" />
            </div>

            <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-[8px] border-black bg-black">
              <NextImage
                src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop"
                alt="Smart Home Interface"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h4 className="text-white text-xl md:text-2xl font-light tracking-widest mb-2">Smart Home</h4>
                <p className="text-white/70 text-sm tracking-wider uppercase">Central Automation Hub</p>
              </div>
            </div>
          </div>

          {/* Right Column (Nodes) */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8 justify-center order-3 lg:order-3">
            {rightNodes.map((node) => (
              <div key={node.id} className="lc-node flex flex-col lg:flex-row-reverse items-start lg:items-center gap-4 bg-panel p-6 rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:border-accent/30 group">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0 border border-border group-hover:bg-accent/5 transition-colors">
                  <node.icon className="w-5 h-5 text-accent" />
                </div>
                <div className="flex flex-col text-left lg:text-right">
                  <h3 className="text-lg font-medium text-foreground tracking-wide mb-1">{node.title}</h3>
                  {node.items.length > 0 && (
                    <p className="text-sm text-muted font-light leading-relaxed">
                      {node.items.join(" • ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
