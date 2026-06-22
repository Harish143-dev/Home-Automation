"use client";

import React, { useRef } from "react";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { EASE } from "../../../lib/animation.config";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";

interface Capability {
  title: string;
  description: string;
}

interface CapabilitySection {
  id: string;
  name: string;
  subheading: string;
  capabilities: Capability[];
  image: string;
}

const CAPABILITIES_DATA: CapabilitySection[] = [
  // Removed GRMS systems as they are now handled by HospitalitySolutions
  {
    id: "common",
    name: "Common Spaces & Public Areas",
    subheading: "Design public volumes that actively reduce stress and support recovery through automated transitions of lighting, acoustics, and environmental parameters.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
    capabilities: [
      { title: "Lighting Management Frameworks", description: "Creating everyday health infrastructure through light: Deploys dynamic, time-locked lighting scenes across expansive lobbies and receptions that match natural circadian human rhythms, reducing guest travel strain while optimizing energy conservation." },
      { title: "Centralized Acoustic Distribution Networks", description: "Spatial acoustic balance and sensory comfort. Distributes clear, balanced background music across public lounges to craft a soothing, welcoming atmosphere that complements the property's brand identity." },
      { title: "High-Performance LED Video Walls", description: "Ethereal, integrated visual communication. Showcases brand storytelling, dynamic digital art, and fluid lifestyle content through zero-bezel, architectural display solutions." },
      { title: "Unified Networking & Security Infrastructure", description: "Structural resilience and property-wide stability. Establishes secure network foundations, high-density guest Wi-Fi backbones, and smart surveillance arrays for uninterrupted hospitality operations." }
    ]
  },
  {
    id: "boardrooms",
    name: "Boardrooms & Meeting Rooms",
    subheading: "Empower corporate groups with zero-friction collaboration hubs managed through intuitive control systems.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    capabilities: [
      { title: "Integrated Video Conferencing Systems", description: "Facilitates global connection using high-definition tracking cameras, beamforming audio, and single-touch room launch scripts." },
      { title: "High-Resolution LED Presentation Displays", description: "Sharp visual data rendering via ultra-low pixel pitch display walls designed for critical executive evaluation." },
      { title: "Acoustically Calibrated Audio Networks", description: "Delivers speech clarity and balanced speaker tracking through integrated Digital Signal Processors (DSPs) and custom microphone arrays." },
      { title: "Cable-Free Wireless Presentation Layers", description: "Enables multi-user content casting and split-screen collaboration via native AirPlay and secure multi-platform casting." },
      { title: "Room Scheduling & Presence Analytics", description: "Optimizes corporate real estate agility through electronic door signage linked to real-time calendars and space utilization sensors." }
    ]
  },
  {
    id: "banquet",
    name: "Banquet Halls & Event Spaces",
    subheading: "Execute complex, high-velocity event timelines through unified venue controls built for rapid layout adaptation.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200",
    capabilities: [
      { title: "High-Density Networking Foundations", description: "Guarantees dedicated, high-bandwidth connectivity for massive concurrent device loads, live streaming demands, and event production networks." },
      { title: "Enterprise Access & Surveillance Security", description: "Protects high-profile VIP events through centralized credentialing, smart surveillance, and role-based perimeter management." },
      { title: "Performance LED Video Walls & Projection Integration", description: "Delivers high-impact event graphics through integrated motorized projection screens and scalable display configurations." },
      { title: "High-Fidelity Audio Distribution Arrays", description: "Clear vocal distribution and immersive soundscapes utilizing specialized amplifiers, DSP matrix routing, and wireless audio setups." },
      { title: "Kinematic Partition & Multi-Room Integration", description: "Smart sensors automatically adjust audio and lighting logic the moment divisible banquet walls are moved, instantly separating or combining event zones." },
      { title: "Unified Centralized Venue Dashboards", description: "Empowers banquet managers with absolute environmental control over HVAC, AV, and illumination arrays from a single, secure mobile interface." }
    ]
  },
  {
    id: "dining",
    name: "Restaurants & Dining Spaces",
    subheading: "Shape memorable culinary atmospheres where light, acoustics, and micro-climates adapt seamlessly to the style and time of day.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200",
    capabilities: [
      { title: "Architectural Lighting Orchestration", description: "Transitions ambiance through scene-based lighting presets engineered specifically for breakfast, lunch, dinner, and late-night configurations." },
      { title: "Curated Soundscape Distribution", description: "Delivers high-fidelity background music and sound-masking layers that mask acoustic clutter and reinforce brand intimacy." },
      { title: "Ambient Video Display Systems", description: "Engages diners with subtle visual digital canvases, dynamic branding, and entertainment options integrated into the architecture." },
      { title: "Solar-Adaptive Shading Governance", description: "Motorized shading networks automatically compute outdoor sun angles to prevent window glare while preserving premium views." },
      { title: "Dynamic Climate & Ventilation Balancing", description: "Adjusts temperature and fresh air exchange rates dynamically to handle changing guest loads during peak kitchen service windows." }
    ]
  },
  {
    id: "spa",
    name: "Spa & Wellness Areas",
    subheading: "Build restorative sanctuaries that enhance relaxation by giving guests and therapists total control over their sensory environment.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200",
    capabilities: [
      { title: "Circadian Lighting Management", description: "Soft, customizable lighting scenes and tunable white curves designed to lower stress levels and support therapeutic recovery." },
      { title: "Immersive Soundscape Systems", description: "Delivers clear audio and calming acoustic soundscapes across treatment rooms and relaxation lounges to promote mental recovery." },
      { title: "Precise Thermal Micro-Climate Control", description: "Proactively balances localized temperatures and humidity levels to match the exact physiological requirements of specialized wellness treatments." }
    ]
  },
  {
    id: "boh",
    name: "Back of House (BOH)",
    subheading: "Support uninterrupted property operations with centralized system dashboards built for low-maintenance reliability.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
    capabilities: [
      { title: "Scalable Networking Infrastructure", description: "The Specifics: The mission-critical network backbone driving property-wide data management, property management software syncing, and operational apps." },
      { title: "AI-Powered Surveillance & Operational Security", description: "The Specifics: Optimizes loss prevention and safety tracking via intelligent video analytics, access logs, and real-time incident alerting." },
      { title: "Centralized Automated Efficiency Lighting", description: "The Specifics: Maximizes structural cost reductions through automated scheduling, corridor dimming presets, and vacancy tracking logic." },
      { title: "Unified Facility Command Portals", description: "The Specifics: Consolidates multiple building operations onto a single platform, enabling engineering teams to troubleshoot and monitor properties remotely." },
      { title: "Smart Processors & Modular Control Racks", description: "The Specifics: High-availability Lutron hardware processors, heavy DALI controllers, and switching modules designed for continuous, round-the-clock operation." }
    ]
  }
];

export function HospitalityCapabilities() {
  const containerRef = useRef<HTMLElement>(null);
  const { isMobile, isReady } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!isReady || isMobile || prefersReducedMotion) return;

      const rightBlocks = gsap.utils.toArray(".cap-right-block") as HTMLDivElement[];
      const leftImages = gsap.utils.toArray(".cap-left-image") as HTMLDivElement[];
      const dots = gsap.utils.toArray(".cap-scroll-dot") as HTMLDivElement[];

      gsap.set(leftImages, { opacity: 0 });
      if (leftImages[0]) gsap.set(leftImages[0], { opacity: 1 });
      if (dots[0]) gsap.set(dots[0], { backgroundColor: "var(--color-accent)", scale: 1.2 });

      rightBlocks.forEach((block, idx) => {
        gsap.to(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              if (self.isActive) {
                gsap.to(leftImages, { opacity: 0, duration: 0.6, ease: EASE.smooth, overwrite: "auto" });
                gsap.to(leftImages[idx], { opacity: 1, duration: 0.6, ease: EASE.smooth, overwrite: "auto" });

                const img = leftImages[idx].querySelector("img");
                if (img) {
                  gsap.fromTo(img,
                    { scale: 1.05 },
                    { scale: 1, duration: 1.5, ease: "power2.out" }
                  );
                }

                gsap.to(dots, { backgroundColor: "rgba(0,0,0,0.1)", scale: 1, duration: 0.3 });
                gsap.to(dots[idx], { backgroundColor: "var(--color-accent)", scale: 1.2, duration: 0.3 });
              }
            }
          }
        });
      });

      scheduleScrollRefresh();
    },
    { scope: containerRef, dependencies: [isMobile, isReady, prefersReducedMotion] }
  );

  return (
    <section
      ref={containerRef}
      className="bg-background pt-16 md:pt-24 pb-8 md:pb-12 text-foreground"
    >


      {/* ═══ Mobile Layout ═══ */}
      <div className={isMobile ? "block" : "hidden"}>
        <div className="px-6 pb-24 flex flex-col gap-16">
          {CAPABILITIES_DATA.map((section) => (
            <div key={section.id} className="flex flex-col gap-6">
              <div className="w-full h-80 sm:h-96 relative rounded-3xl overflow-hidden shadow-lg">
                <img src={section.image} alt={section.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-light mb-3 text-accent">{section.name}</h3>
                <p className="text-sm md:text-base text-muted leading-relaxed font-light mb-6 italic">
                  {section.subheading}
                </p>
                <ul className="flex flex-col gap-5">
                  {section.capabilities.map((cap, j) => (
                    <li key={j} className="flex flex-col gap-1 border-l-2 border-accent/20 pl-4">
                      <span className="text-base md:text-lg text-foreground tracking-wide font-light">{cap.title}</span>
                      <span className="text-sm text-muted font-light leading-relaxed">{cap.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Desktop Pinned Layout (Native Sticky Scroll) ═══ */}
      <div className={isMobile ? "hidden" : "block"}>
        <div className="w-full max-w-[1440px] mx-auto relative px-12 lg:px-24 flex items-start">

          {/* Left Side: Sticky Image Container */}
          <div className="w-1/2 h-[80vh] sticky top-[10vh] rounded-[40px] overflow-hidden shadow-[10px_0_40px_rgba(0,0,0,0.1)] bg-black/5 shrink-0 z-10">
            {CAPABILITIES_DATA.map((section) => (
              <div key={section.id + "img"} className="cap-left-image absolute inset-0 w-full h-full">
                <img
                  src={section.image}
                  alt={section.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5" />
              </div>
            ))}
          </div>

          {/* Right Side: Naturally Scrolling Content & Scroll Indicator */}
          <div className="w-1/2 flex relative pl-12 lg:pl-20 pr-4">

            <div className="sticky top-[10vh] h-[80vh] w-6 flex flex-col items-center justify-center gap-4 shrink-0 -ml-6 mr-6">
              {CAPABILITIES_DATA.map((_, i) => (
                <div key={i} className="cap-scroll-dot w-2 h-2 rounded-full bg-black/10 transition-colors" />
              ))}
            </div>

            <div className="flex flex-col w-full pb-[20vh]">
              {CAPABILITIES_DATA.map((section, i) => (
                <div
                  key={section.id + "content"}
                  className={`cap-right-block flex flex-col justify-center min-h-[80vh] ${i === 0 ? "pt-[10vh]" : ""}`}
                >
                  <h3 className="text-3xl lg:text-4xl font-light leading-tight text-accent mb-4">
                    {section.name}
                  </h3>

                  <p className="text-lg lg:text-xl text-muted leading-relaxed font-light mb-10 max-w-xl italic">
                    {section.subheading}
                  </p>

                  <ul className="flex flex-col gap-6 max-w-xl">
                    {section.capabilities.map((cap, j) => (
                      <li key={j} className="flex flex-col gap-1 border-l-2 border-accent/20 pl-5">
                        <span className="text-lg lg:text-xl text-foreground tracking-wide font-light">{cap.title}</span>
                        <span className="text-base text-muted font-light leading-relaxed">{cap.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
