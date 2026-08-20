"use client";

import React, { useRef } from "react";
import { ConciergeBell, Binary, Briefcase, Users, ShieldCheck, Sparkles, Wrench, Key } from "lucide-react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { EASE, DURATION } from "../../../lib/animation.config";
import { useBreakpoint } from "../../../hooks/useBreakpoint";

const NODES = [
  { id: "front-desk", label: "Front Desk Staff", icon: ConciergeBell, pos: { x: 50, y: 12 } },
  { id: "it-staff", label: "IT Staff", icon: Binary, pos: { x: 82, y: 24 } },
  { id: "management", label: "Hotel Management", icon: Briefcase, pos: { x: 88, y: 50 } },
  { id: "guests", label: "Guests", icon: Users, pos: { x: 75, y: 82 } },
  { id: "security", label: "Security Personnel", icon: ShieldCheck, pos: { x: 25, y: 82 } },
  { id: "housekeeping", label: "Housekeeping", icon: Sparkles, pos: { x: 12, y: 50 } },
  { id: "maintenance", label: "Maintenance Staff", icon: Wrench, pos: { x: 18, y: 24 } },
];

export function HospitalityEcosystem() {
  const containerRef = useRef<HTMLElement>(null);
  const { isReady, isDesktop } = useBreakpoint();

  useGSAP(() => {
    if (!isReady) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      }
    });

    // 1. Center hub scales in
    tl.fromTo(".eco-center-hub",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: DURATION.normal, ease: EASE.premium }
    );

    // 2. Concentric rings pulse in
    tl.fromTo(".eco-ring",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: DURATION.slow, stagger: 0.15, ease: "power2.out" },
      "-=0.4"
    );

    // 3. SVG lines draw out
    tl.fromTo(".eco-line",
      { strokeDasharray: "0 1000" }, // This is a bit tricky, better to use standard gsap drawSVG or strokeDashoffset if path length is known.
      // Since path lengths vary, animating strokeDashoffset requires knowing length. 
      // We can animate opacity and scale instead, or just fade them in.
      { strokeDasharray: "6 6", opacity: 1, duration: DURATION.normal, stagger: 0.05, ease: EASE.standard },
      "-=0.6"
    );

    // 4. Nodes pop in
    tl.fromTo(".eco-node",
      { scale: 0.8, opacity: 0, y: 10 },
      { scale: 1, opacity: 1, y: 0, duration: DURATION.medium, stagger: 0.08, ease: EASE.premium },
      "-=0.5"
    );

    // Continuous subtle pulse on center ring
    gsap.to(".eco-pulse-ring", {
      scale: 1.15,
      opacity: 0,
      duration: 2.5,
      repeat: -1,
      ease: "power1.out",
      delay: 2
    });

  }, { scope: containerRef, dependencies: [isReady] });

  return (
    <section ref={containerRef} className={`py-12 md:py-16 w-full px-6 md:px-12 lg:px-24 bg-background overflow-hidden transition-opacity duration-500 ${!isReady ? "opacity-0" : "opacity-100"}`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className=" text-foreground">
            Connected Hospitality Ecosystem
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl">
            This makes the brand look highly technical + enterprise capable.
          </p>
        </div>

        {/* Diagram Container */}
        <div className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-video lg:aspect-[21/9] lg:h-[600px] flex items-center justify-center mt-8">

          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                <path d="M0,0 L4,2 L0,4" fill="#9ca3af" />
              </marker>
            </defs>
            {NODES.map((node, i) => {
              // Calculate control point for a nice curve
              const startX = 50;
              const startY = 50;
              const endX = node.pos.x;
              const endY = node.pos.y;

              // Draw a simple straight line for a cleaner technical look
              return (
                <path
                  key={`line-${i}`}
                  className="eco-line opacity-0"
                  d={`M ${startX} ${startY} L ${endX} ${endY}`}
                  stroke="#9ca3af"
                  strokeWidth="0.2"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>

          {/* Concentric Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3].map((ring) => (
              <div
                key={`ring-${ring}`}
                className="eco-ring absolute border border-blue-500/10 rounded-full"
                style={{
                  width: `${150 + ring * 100}px`,
                  height: `${150 + ring * 100}px`
                }}
              />
            ))}
            <div className="eco-pulse-ring absolute w-[150px] h-[150px] border-2 border-blue-500/40 rounded-full" />
          </div>

          {/* Central Hub */}
          <div className="eco-center-hub absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] border-4 border-white dark:border-background relative overflow-hidden">
              {/* Inner stylized circles */}
              <div className="absolute inset-2 border-2 border-white/30 rounded-full border-t-transparent" />
              <div className="absolute inset-4 border-2 border-white/60 rounded-full border-b-transparent" />
              <Key className="w-10 h-10 md:w-12 md:h-12 text-white relative z-10" />
            </div>
          </div>

          {/* Nodes */}
          {NODES.map((node, i) => {
            const Icon = node.icon;
            // Adjust positioning slightly for mobile so it doesn't overflow completely
            // We use standard percentages, the container will scale
            return (
              <div
                key={node.id}
                className="eco-node absolute flex items-center gap-3 bg-background border border-black/5 dark:border-white/10 shadow-lg rounded-full py-2 px-4 md:py-3 md:px-6 z-20 whitespace-nowrap"
                style={{
                  left: `${node.pos.x}%`,
                  top: `${node.pos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="text-blue-600">
                  <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2} />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground">
                  {node.label}
                </span>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
