"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NextImage from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { scheduleScrollRefresh } from "../../../lib/scrollRefresh";
import { Check } from "lucide-react";

// Placeholder image (Swap these out with real assets later)
import imgPlaceholder from "@/assets/residential/hero.jpg";

// Ensure GSAP plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURES = [
  {
    id: "cctv-surveillance",
    title: "Smart CCTV Surveillance",
    image: imgPlaceholder,
    description: "Monitor your home with high-definition cameras, live remote viewing, video recording, and intelligent motion alerts for complete peace of mind.",
    highlights: ["Live View", "Recording", "Night Vision", "Motion Detection"]
  },
  {
    id: "video-door-phone",
    title: "Video Door Phone Systems",
    image: imgPlaceholder,
    description: "See, speak to, and verify visitors from anywhere before granting access through your smartphone or indoor monitor.",
    highlights: ["Two-way communication", "HD video", "Mobile access", "Visitor snapshots"]
  },
  {
    id: "smart-door-locks",
    title: "Smart Door Locks",
    image: imgPlaceholder,
    description: "Unlock your home using fingerprint, PIN, smartphone, RFID card, or temporary digital access for guests and household staff.",
    highlights: ["Fingerprint", "PIN Code", "Mobile App", "Temporary Access", "Auto Lock"]
  },
  {
    id: "access-control",
    title: "Access Control Systems",
    image: imgPlaceholder,
    description: "Assign personalized access permissions for family members, guests, and service staff while maintaining a complete access history.",
    highlights: ["User-specific permissions", "Scheduled access", "Activity logs", "Multiple authentication methods"]
  },
  {
    id: "motion-intrusion",
    title: "Motion & Intrusion Detection",
    image: imgPlaceholder,
    description: "Receive instant notifications whenever unexpected movement, forced entry, or unauthorized access is detected.",
    highlights: ["Motion Sensors", "Door & Window Sensors", "Glass Break Detection", "Intrusion Alerts"]
  },
  {
    id: "emergency-alerts",
    title: "Emergency Alert Integration",
    image: imgPlaceholder,
    description: "Stay informed with instant notifications for smoke, gas leaks, panic button activation, water leakage, or other emergency events.",
    highlights: ["Fire Alarm", "Smoke Detection", "Gas Leak", "Water Leak", "Panic Button"]
  },
  {
    id: "remote-monitoring",
    title: "Remote Mobile Monitoring",
    image: imgPlaceholder,
    description: "Control your home's security from anywhere with a single app to monitor cameras, lock doors, manage users, and receive real-time alerts.",
    highlights: ["Live CCTV", "Lock/Unlock Doors", "View Activity Logs", "Instant Notifications", "User Management"]
  }
];

export function SecurityFeatures() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { isReady, isDesktop } = useBreakpoint();

  // Scroll triggers to detect which section is active
  useGSAP(() => {
    if (!isReady || !isDesktop) return;

    const featureBlocks = gsap.utils.toArray<HTMLElement>('.sf-feature-block');

    featureBlocks.forEach((block, i) => {
      ScrollTrigger.create({
        trigger: block,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveIndex(i),
        onEnterBack: () => setActiveIndex(i),
      });
    });

    scheduleScrollRefresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && (t.vars.trigger as HTMLElement).classList?.contains('sf-feature-block')) {
          t.kill();
        }
      });
    }

  }, { scope: containerRef, dependencies: [isReady, isDesktop] });

  // Animate the image crossfade
  useGSAP(() => {
    if (!isReady || prefersReducedMotion) return;

    // Scale slightly for a nice effect
    gsap.fromTo('.sf-graphic-img',
      { scale: 1.05, filter: "blur(4px)" },
      { scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" }
    );

  }, { scope: containerRef, dependencies: [activeIndex, isReady, prefersReducedMotion], revertOnUpdate: true });

  return (
    <section
      ref={containerRef}
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Section Header */}
        <div className="text-center max-w-3xl mb-16 md:mb-24 flex flex-col items-center">
          <h5 className=" text-accent mb-6 block">
            Core Capabilities
          </h5>
          <h2 className=" text-foreground text-balance mb-8">
            Smart Security Solutions for Modern Homes
          </h2>
          <p className="text-lg md:text-xl font-light tracking-wide text-muted leading-relaxed text-balance">
            Protect what matters most with intelligent security systems that provide complete visibility, controlled access, and instant alerts—whether you're at home or away.
          </p>
        </div>

        {/* Interactive Scroll Section */}
        <div className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

          {/* Left Side: Sticky Visualizer (Desktop Only) / Inline Visualizer (Mobile) */}
          <div className="w-full lg:w-[45%] relative">
            <div className="lg:sticky lg:top-0 lg:h-screen flex items-center justify-center">
              <div className="w-full h-[300px] lg:h-[450px] bg-panel rounded-[2rem] overflow-hidden relative shadow-lg shrink-0">

                {/* The Images - Map all of them and use opacity to crossfade */}
                {FEATURES.map((feature, idx) => (
                  <div
                    key={feature.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <NextImage
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="sf-graphic-img object-cover"
                      priority={idx === 0}
                    />
                    {/* Subtle dark gradient overlay to ensure the image feels premium */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Scrollable Feature List */}
          <div className="w-full lg:w-[55%] flex flex-col pb-8 lg:pb-32">
            {FEATURES.map((feature, i) => {
              const isActive = isDesktop ? activeIndex === i : true;
              const isPast = activeIndex > i;

              return (
                <div
                  key={feature.id}
                  className={`sf-feature-block flex flex-col justify-center gap-6 py-12 lg:h-screen transition-opacity duration-700 ease-out ${isDesktop
                    ? isActive ? 'opacity-100' : 'opacity-30'
                    : 'opacity-100'
                    }`}
                  onClick={() => !isDesktop && setActiveIndex(i)}
                >
                  <h3 className={`transition-colors duration-500 ${isActive || !isDesktop ? 'text-foreground' : 'text-muted'}`}>
                    {feature.title}
                  </h3>

                  <p className="text-base lg:text-xl font-light text-muted-foreground leading-relaxed max-w-xl">
                    {feature.description}
                  </p>

                  {/* Highlights as Sleek Pills */}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {feature.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs lg:text-sm border transition-colors duration-300 ${isActive || !isDesktop
                          ? 'bg-panel border-border text-foreground shadow-sm'
                          : 'bg-transparent border-transparent text-muted'
                          }`}
                      >
                        <Check className={`w-3.5 h-3.5 ${isActive || !isDesktop ? 'text-accent' : 'opacity-0'}`} />
                        <span className="font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}


