"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@/lib/utils";
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
  // Left Side (Coordinates pulled inward to leave 25-35% outer margins for text wrapping)
  { id: "lighting", title: "Lighting Control", icon: Lightbulb, items: ["Dimmer modules", "Wireless keypads"], side: "left", pos: { x: 35, y: 15 } },
  { id: "shades", title: "Motorised Shades", icon: Blinds, items: ["Roller Blinds", "Drapery Track"], side: "left", pos: { x: 25, y: 38 } },
  { id: "hvac", title: "HVAC System", icon: ThermometerSun, items: ["Thermostats", "Climate Interface"], side: "left", pos: { x: 25, y: 62 } },
  { id: "security", title: "Security", icon: ShieldCheck, items: ["Cameras", "Digital Locks"], side: "left", pos: { x: 35, y: 85 } },
  // Right Side
  { id: "audio", title: "Audio System", icon: Speaker, items: ["Amplifiers", "Ceiling Speakers"], side: "right", pos: { x: 65, y: 15 } },
  { id: "theater", title: "Home Theater", icon: Film, items: ["Projectors", "Screens"], side: "right", pos: { x: 75, y: 38 } },
  { id: "tv-lift", title: "Motorized Lifts", icon: Tv, items: ["Concealed TVs"], side: "right", pos: { x: 75, y: 62 } },
  { id: "wifi", title: "Enterprise Wi-Fi", icon: Wifi, items: ["Access Points"], side: "right", pos: { x: 65, y: 85 } }
];

export default function LightingControls() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    // 1. Reveal Header
    tl.fromTo(".lc-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // 2. Pulse Center Hub
    tl.fromTo(".lc-center-hub",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.2)" },
      "-=0.4"
    );

    // 3. Draw SVG Lines
    tl.fromTo(".lc-path",
      { strokeDasharray: 300, strokeDashoffset: 300 },
      { strokeDashoffset: 0, duration: 1, stagger: 0.05, ease: "power2.inOut" },
      "-=0.6"
    );

    // 4. Pop in Nodes
    tl.fromTo(".lc-node-icon",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.5)" },
      "-=0.8"
    );

    // 5. Fade in Node Text
    tl.fromTo(".lc-node-content",
      { opacity: 0, x: (i, el) => el.dataset.side === 'left' ? 10 : -10 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" },
      "-=0.6"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  // Generate SVG Path with horizontal exits/entries
  const generatePath = (x: number, y: number, side: string) => {
    const startX = 50;
    const startY = 50;
    // CP1 leaves center horizontally
    const cp1x = side === "left" ? 35 : 65;
    const cp1y = 50;
    // CP2 enters node horizontally
    const cp2x = side === "left" ? x + 10 : x - 10;
    const cp2y = y;

    return `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="lc-header text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light">
            Ecosystem
          </span>
          <h2 className="text-foreground mb-6 text-balance">
            Complete Home Control
          </h2>
          <p className="text-muted font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
            A unified smart home architecture that seamlessly integrates every critical system into a single, intelligent interface.
          </p>
        </div>

        {/* Mobile View: Vertical Stack */}
        <div className="w-full flex flex-col gap-4 md:hidden">
          <div className="bg-panel border border-border rounded-2xl p-8 mb-6 text-center shadow-sm">
            <h3 className="text-foreground mb-2">Central Hub</h3>
            <p className="text-muted text-sm font-light">The brain of your smart home</p>
          </div>
          {SYSTEM_NODES.map((node) => (
            <div key={node.id} className="flex items-center gap-4 bg-panel p-4 rounded-xl border border-border">
              <div className="w-12 h-12 shrink-0 rounded-full bg-accent/5 flex items-center justify-center text-accent">
                <node.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-foreground">{node.title}</h4>
                <p className="text-xs text-muted font-light mt-1">{node.items.join(" • ")}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tablet/Desktop View: Infographic Radial Layout */}
        <div
          ref={containerRef}
          className="hidden md:block relative w-full max-w-[1100px] aspect-[4/3] lg:aspect-[16/9] mx-auto mt-0"
        >
          {/* SVG Connection Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {SYSTEM_NODES.map((node) => (
              <path
                key={`path-${node.id}`}
                d={generatePath(node.pos.x, node.pos.y, node.side)}
                fill="none"
                stroke="currentColor"
                strokeWidth={hoveredNode === node.id ? "0.4" : "0.2"}
                className={cn(
                  "lc-path drop-shadow-sm transition-all duration-500",
                  hoveredNode === node.id ? "text-accent shadow-accent drop-shadow-lg" : "text-border"
                )}
              />
            ))}
          </svg>

          {/* Central Hub Circle */}
          <div className="lc-center-hub absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 lg:w-[260px] lg:h-[260px] z-10 flex items-center justify-center pointer-events-none">
            {/* Outer Ring */}
            <div className={cn(
              "absolute inset-0 rounded-full border bg-background/50 backdrop-blur-sm shadow-xl transition-all duration-500",
              hoveredNode ? "border-accent/40 bg-accent/5 scale-105" : "border-accent/20"
            )} />
            <div className="absolute inset-3 md:inset-4 rounded-full border border-border bg-panel shadow-inner" />
            {/* Inner Content */}
            <div className={cn(
              "relative z-20 flex flex-col items-center justify-center text-center p-4 lg:p-6 transition-transform duration-500",
              hoveredNode ? "scale-105" : "scale-100"
            )}>
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-accent/5 flex items-center justify-center mb-2 lg:mb-4">
                <ShieldCheck className="w-6 h-6 lg:w-8 lg:h-8 text-accent" />
              </div>
              <h3 className="text-foreground mb-1 lg:mb-2">
                Smart Home<br />Ecosystem
              </h3>
              <p className="text-[10px] lg:text-xs font-medium tracking-[0.2em] text-accent/80">
                Central Hub
              </p>
            </div>
          </div>

          {/* The 8 Nodes */}
          {SYSTEM_NODES.map((node) => (
            <div
              key={node.id}
              className="absolute w-12 h-12 lg:w-16 lg:h-16 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
              style={{ left: `${node.pos.x}%`, top: `${node.pos.y}%` }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Icon Circle */}
              <div className={cn(
                "lc-node-icon relative w-full h-full bg-panel rounded-full border flex items-center justify-center shadow-lg transition-all duration-300",
                hoveredNode === node.id ? "border-accent scale-110 shadow-accent/20" : "border-accent/20"
              )}>
                <node.icon className={cn(
                  "w-5 h-5 lg:w-6 lg:h-6 transition-colors duration-300",
                  hoveredNode === node.id ? "text-accent" : "text-foreground"
                )} />
                <div className={cn(
                  "absolute inset-0 rounded-full transition-opacity duration-300",
                  hoveredNode === node.id ? "bg-accent/10 opacity-100" : "bg-accent/5 opacity-0"
                )} />
              </div>

              {/* Text Content (positioned outside the circle) */}
              <div
                data-side={node.side}
                className={cn(
                  "lc-node-content absolute top-1/4 -translate-y-1/2 w-max max-w-[200px] lg:max-w-[240px] pointer-events-none transition-all duration-300",
                  node.side === "left" ? "right-[130%] text-right" : "left-[130%] text-left",
                  hoveredNode && hoveredNode !== node.id ? "opacity-40" : "opacity-100"
                )}
              >
                <h5 className={cn("transition-colors duration-300",
                  hoveredNode === node.id ? "text-accent" : "text-foreground"
                )}>
                  {node.title}
                </h5>
                {node.items.length > 0 && (
                  <p className={cn(
                    "text-[10px] lg:text-xs font-light leading-relaxed transition-colors duration-300 mt-1",
                    hoveredNode === node.id ? "text-foreground" : "text-muted"
                  )}>
                    {node.items.join(" • ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
