"use client";

import { useRef } from "react";
import { Server, Shield, Network, Wifi, Smartphone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

const NODES = [
  {
    icon: Server,
    label: "ISP & Gateway",
    desc: "High-speed internet entry point"
  },
  {
    icon: Shield,
    label: "Core Firewall",
    desc: "Network security & routing"
  },
  {
    icon: Network,
    label: "Managed Switches",
    desc: "Power & data distribution"
  },
  {
    icon: Wifi,
    label: "Access Points",
    desc: "Seamless Wi-Fi coverage"
  },
  {
    icon: Smartphone,
    label: "Smart Systems",
    desc: "Lighting, AV, HVAC, Security"
  }
];

export function WifiAutomationDiagram() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        onRefresh: () => scheduleScrollRefresh(),
      }
    });

    // Animate nodes in from the left
    tl.fromTo(".wifi-node", 
      { opacity: 0, x: -30, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.2)" }
    );

    // Animate the connectors fading/sliding in
    tl.fromTo(".wifi-connector",
      { opacity: 0, width: 0 },
      { opacity: 1, width: "auto", duration: 0.4, stagger: 0.2, ease: "power2.out" },
      "-=0.8" // start slightly after nodes start
    );

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance max-w-4xl mx-auto">
            A Connected Networking Ecosystem
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            Integrate enterprise-grade networking equipment into a coordinated system that works seamlessly across your property to guarantee speed, security, and stability.
          </p>
        </div>

        {/* Horizontal Flowchart */}
        <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="min-w-[900px] lg:w-full flex items-center justify-between relative px-4">
            
            {NODES.map((node, idx) => {
              const Icon = node.icon;
              const isLast = idx === NODES.length - 1;

              return (
                <div key={idx} className="flex items-center">
                  
                  {/* Node */}
                  <div className="wifi-node flex flex-col items-center w-40 relative group">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-panel border border-black/5 shadow-sm flex items-center justify-center mb-4 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-lg relative z-10">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-accent transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                    </div>
                    <div className="text-center">
                      <h4 className="text-foreground font-medium text-sm md:text-base mb-1">{node.label}</h4>
                      <p className="text-muted-foreground text-xs md:text-sm font-light">{node.desc}</p>
                    </div>
                  </div>

                  {/* Connector Line (except for last) */}
                  {!isLast && (
                    <div className="wifi-connector w-12 md:w-20 lg:w-24 h-px bg-black/10 mx-2 relative top-[-2rem]">
                      {/* Optional Arrowhead, removed for cleaner look as per user request in Security */}
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
