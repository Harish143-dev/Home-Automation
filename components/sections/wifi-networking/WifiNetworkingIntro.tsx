'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { EASE, DURATION } from '../../../lib/animation.config';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';
import { 
  Router,
  Lightbulb, 
  Cctv, 
  MonitorPlay, 
  Speaker, 
  Tv, 
  Thermometer, 
  Mic, 
  Blinds, 
  Smartphone, 
  Tablet,
  CheckCircle2
} from 'lucide-react';

const FEATURES = [
  {
    title: "Lighting Automation",
    desc: "Every lighting command, scene, schedule, and occupancy sensor communicates through your home's network, ensuring instant and reliable control across every room."
  },
  {
    title: "Security",
    desc: "Smart locks, video door phones, surveillance cameras, motion sensors, and remote monitoring rely on a secure network to deliver real-time alerts and uninterrupted protection."
  },
  {
    title: "Audio",
    desc: "Enjoy synchronized multi-room audio with uninterrupted music streaming and instant control of speakers throughout your home."
  },
  {
    title: "Video",
    desc: "Distribute content from media players, set-top boxes, gaming consoles, and streaming devices to multiple displays over a high-performance network with minimal latency."
  },
  {
    title: "Home Theatre",
    desc: "A dedicated, high-speed network ensures smooth 4K/8K streaming, responsive control, and synchronized performance of every home theatre component."
  },
  {
    title: "Voice Assistants",
    desc: "Alexa, Google Assistant, and Siri communicate through your network to instantly execute voice commands for lighting, climate, entertainment, and other connected devices."
  }
];

// Nodes positioned in a circle around the center (50, 50)
const NODES = [
  { id: "light", label: "Lighting Control", icon: Lightbulb, pos: { x: 50, y: 5 } },
  { id: "sec", label: "Security & Locks", icon: Cctv, pos: { x: 82, y: 18 } },
  { id: "ht", label: "Home Theatre", icon: MonitorPlay, pos: { x: 92, y: 50 } },
  { id: "audio", label: "Multi-Room Audio", icon: Speaker, pos: { x: 82, y: 82 } },
  { id: "tv", label: "Smart TV", icon: Tv, pos: { x: 50, y: 95 } },
  { id: "hvac", label: "HVAC / AC", icon: Thermometer, pos: { x: 18, y: 82 } },
  { id: "voice", label: "Voice Assistant", icon: Mic, pos: { x: 8, y: 50 } },
  { id: "shades", label: "Motorized Shades", icon: Blinds, pos: { x: 18, y: 18 } },
  { id: "app", label: "Mobile App", icon: Smartphone, pos: { x: 35, y: 35 } }, // Inner orbit
  { id: "panel", label: "Touch Panel", icon: Tablet, pos: { x: 65, y: 65 } },   // Inner orbit
];

// Generates an elegant smooth curve from center to node
const getCurvePath = (endX: number, endY: number) => {
  // Use a cubic bezier curve to give it an organic "wiring" feel
  return `M 50 50 C 50 ${endY}, ${endX} 50, ${endX} ${endY}`;
};

export function WifiNetworkingIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    // 1. Intro Text Animation
    gsap.fromTo(textRef.current?.children ? Array.from(textRef.current.children) : [],
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
        }
      }
    );

    // 2. Ecosystem Diagram Animation
    if (diagramRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: diagramRef.current,
          start: "top 75%",
        }
      });

      // Center Hub pops in
      tl.fromTo(".eco-center-hub",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }
      );

      // Rings expand
      tl.fromTo(".eco-ring",
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

      // "Draw" the wires using pathLength=100
      tl.fromTo(".eco-wire-base",
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 1.2, stagger: 0.05, ease: "power2.inOut" },
        "-=0.8"
      );

      // Nodes pop in at the end of the wires
      tl.fromTo(".eco-node",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: "back.out(1.2)" },
        "-=0.6"
      );

      // Infinite Flowing Data animation on top of the wires
      gsap.fromTo(".eco-wire-flow",
        { strokeDashoffset: 100 },
        { 
          strokeDashoffset: 0, 
          duration: 3, 
          repeat: -1, 
          ease: "none",
          stagger: {
            each: 0.2,
            from: "random"
          }
        }
      );

      // Center Router pulse
      gsap.to(".eco-pulse-ring", {
        scale: 1.25,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "power1.out",
        delay: 1
      });
    }

    // 3. Feature Grid Animation
    if (gridRef.current) {
      gsap.fromTo('.wn-feature',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    }

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion, isReady] });

  return (
    <section ref={sectionRef} className={`py-16 md:py-24 relative w-full bg-panel px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5 transition-opacity duration-500 ${!isReady ? "opacity-0" : "opacity-100"}`}>
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Intro Text Header (Reduced bottom margin) */}
        <div ref={textRef} className="flex flex-col items-center text-center gap-4 md:gap-6 w-full max-w-4xl mb-12 md:mb-16">
          <h5 className="text-accent tracking-[0.1em]">
            The Foundation
          </h5>
          <h2 className="text-foreground text-balance text-3xl md:text-4xl lg:text-5xl">
            Every Smart Home Starts with a Reliable Network
          </h2>
          <p className="text-sm md:text-lg lg:text-xl font-light tracking-wide text-muted-foreground leading-relaxed text-balance">
            Every smart home depends on a strong, well-designed network. ATPL creates enterprise-grade networking infrastructure that keeps your lighting, entertainment, security, climate control, and automation systems connected, responsive, and ready for future upgrades.
          </p>
        </div>

        {/* Ecosystem Orbit Diagram (Reduced aspect ratio / max-height to tighten layout) */}
        <div ref={diagramRef} className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-video lg:aspect-[16/9] lg:max-h-[600px] flex items-center justify-center mb-16 md:mb-24">
          
          {/* SVG Wires Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            {NODES.map((node, i) => (
              <g key={`wire-group-${i}`}>
                {/* Base solid wire */}
                <path
                  className="eco-wire-base text-black/10"
                  d={getCurvePath(node.pos.x, node.pos.y)}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="100"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Animated flowing data dashed wire (overlaps the base) */}
                <path
                  className="eco-wire-flow"
                  d={getCurvePath(node.pos.x, node.pos.y)}
                  stroke="#8c1817"
                  strokeWidth="0.4"
                  fill="none"
                  pathLength="100"
                  strokeDasharray="2 10" // Short dash, long gap for flowing effect
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
          </svg>

          {/* Concentric Design Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3].map((ring) => (
              <div
                key={`ring-${ring}`}
                className="eco-ring absolute border border-black/5 rounded-full"
                style={{
                  width: `${140 + ring * 140}px`,
                  height: `${140 + ring * 140}px`
                }}
              />
            ))}
            <div className="eco-pulse-ring absolute w-[100px] h-[100px] border border-accent/40 rounded-full" />
          </div>

          {/* Central Hub (Router) */}
          <div className="eco-center-hub absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-foreground rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.15)] relative overflow-hidden group hover:scale-105 transition-transform duration-500">
              {/* Premium dark styling for center hub */}
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground via-foreground/90 to-accent/20" />
              <div className="absolute inset-1 border border-white/10 rounded-full" />
              <Router className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10 group-hover:text-accent transition-colors duration-500" />
            </div>
          </div>

          {/* Orbiting Nodes - Upgraded to elegant glass/pill shapes */}
          {NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="eco-node absolute flex items-center gap-2 md:gap-3 bg-white/80 backdrop-blur-md border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-full py-1.5 px-3 md:py-2.5 md:px-5 z-20 whitespace-nowrap group hover:scale-110 hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(140,24,23,0.12)] transition-all duration-300"
                style={{
                  left: `${node.pos.x}%`,
                  top: `${node.pos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="text-accent/80 group-hover:text-accent transition-colors duration-300">
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2} />
                </div>
                <span className="text-[10px] md:text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300">
                  {node.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Feature Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 w-full max-w-6xl mx-auto">
          {FEATURES.map((feature, i) => (
            <div key={i} className="wn-feature flex flex-col gap-3 group">
              <div className="flex items-center gap-3 mb-1">
                <CheckCircle2 className="w-5 h-5 text-accent/70 group-hover:text-accent transition-colors duration-300 shrink-0" strokeWidth={2} />
                <h3 className="text-lg md:text-xl font-medium tracking-tight text-foreground">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm md:text-base font-light text-muted-foreground leading-relaxed pl-8">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
