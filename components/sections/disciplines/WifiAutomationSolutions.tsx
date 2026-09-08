"use client";

import { useRef, useState } from "react";
import { Network, ShieldCheck, WifiHigh, Laptop, Trees, Router, AppWindow, Waypoints } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { cn } from "@/lib/utils";

const TABS = [
  {
    id: "high-performance-wifi",
    label: "High-Performance Wi-Fi",
    icon: WifiHigh,
    title: "High-Performance Wi-Fi",
    description: "Seamless wireless connectivity designed for consistent coverage and performance.",
    pointers: [
      "Whole-home Wi-Fi coverage",
      "High-speed wireless connectivity",
      "Optimized access point placement",
      "Reliable connectivity across spaces"
    ]
  },
  {
    id: "network-infrastructure",
    label: "Network Infrastructure",
    icon: Network,
    title: "Network Infrastructure",
    description: "Build a strong foundation for all connected technologies.",
    pointers: [
      "Structured network architecture",
      "Wired and wireless infrastructure",
      "High-performance network equipment",
      "Reliable connectivity for connected systems"
    ]
  },
  {
    id: "centralized-network-management",
    label: "Centralized Management",
    icon: AppWindow,
    title: "Centralized Network Management",
    description: "Monitor and manage network performance from a centralized platform.",
    pointers: [
      "Centralized network monitoring",
      "Device and network management",
      "Performance visibility",
      "Simplified network administration"
    ]
  },
  {
    id: "secure-connectivity",
    label: "Secure Connectivity",
    icon: ShieldCheck,
    title: "Secure Connectivity",
    description: "Protect your connected environment with secure network architecture.",
    pointers: [
      "Secure network configuration",
      "Protected connected devices",
      "Segmented network architecture",
      "Controlled network access"
    ]
  },
  {
    id: "scalable-network-design",
    label: "Scalable Network Design",
    icon: Router,
    title: "Scalable Network Design",
    description: "Infrastructure designed to support future technologies and growing connectivity demands.",
    pointers: [
      "Future-ready network architecture",
      "Easy expansion for new devices",
      "Support for growing bandwidth demands",
      "Flexible infrastructure design"
    ]
  },
  {
    id: "smart-system-integration",
    label: "Smart System Integration",
    icon: Waypoints,
    title: "Smart System Integration",
    description: "Create a network foundation that supports connected technologies throughout the home.",
    pointers: [
      "Supports home automation systems",
      "Connectivity for AV and entertainment",
      "Integration with security systems",
      "Reliable communication between smart devices"
    ]
  }
];

export function WifiAutomationSolutions() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    gsap.fromTo(".wifi-sol-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
    );

    gsap.fromTo(".wifi-sol-tabs",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: containerRef.current, start: "top 70%" } }
    );

    scheduleScrollRefresh();
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  const activeContent = TABS.find(t => t.id === activeTab)!;

  return (
    <section ref={containerRef} className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col">

        {/* Header */}
        <div className="wifi-sol-header text-center mb-16 md:mb-24">
          <h2 className="text-foreground mb-6 text-balance max-w-4xl mx-auto">
            Complete Wi-Fi & Network Infrastructure Solutions
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            From planning and design to deployment and ongoing support, we create reliable network ecosystems for spaces of every size.
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Tabs Menu */}
          <div className="wifi-sol-tabs w-full lg:w-1/3 flex flex-col gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 md:p-5 rounded-2xl text-left transition-all duration-300 w-full group",
                    isActive ? "bg-background shadow-sm border border-black/5" : "hover:bg-black/5"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0",
                    isActive ? "bg-accent/10 text-accent" : "bg-black/5 text-muted-foreground group-hover:bg-accent/5 group-hover:text-accent"
                  )}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className={cn(
                    "text-base md:text-lg transition-colors duration-300",
                    isActive ? "text-foreground font-medium" : "text-muted-foreground font-light"
                  )}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="w-full lg:w-2/3 bg-background rounded-[2rem] p-8 sm:p-12 border border-black/5 shadow-sm min-h-[400px] flex flex-col">
            <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards h-full flex flex-col">

              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                <activeContent.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl md:text-3xl text-foreground mb-4">
                {activeContent.title}
              </h3>

              <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed mb-8">
                {activeContent.description}
              </p>

              <div className="mt-auto">
                <h5 className="text-accent mb-4 tracking-[0.1em] text-xs sm:text-sm md:text-base">Features & Capabilities</h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeContent.pointers.map((pointer, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="text-muted-foreground font-light text-sm md:text-base">
                        {pointer}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
