"use client";

import Image, { StaticImageData } from "next/image";
import React, { useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import {
  ArrowRight,
  Lightbulb,
  Volume2,
  Blinds,
  Thermometer,
  ShieldCheck,
  Wrench,
  Sparkles,
} from "lucide-react";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { EASE } from "../../../lib/animation.config";

//images 

import LightingAutomationImage from "@/assets/home/descipline/lighting-automation.jpg"
import AudioVideoAutomationImage from "@/assets/home/descipline/av-automation.jpg"
import ShadesAutomationImage from "@/assets/home/descipline/shades-automation.jpg"
import TemperatureAutomationImage from "@/assets/home/descipline/hvac-automation.jpg"
import SecurityAutomationImage from "@/assets/home/descipline/security-automation.jpg"
import MaintenanceAutomationImage from "@/assets/home/descipline/amc-automation.jpg"

type ServicePanel = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  secondaryDescription: string;
  image: StaticImageData;
  accent: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
};

const SERVICES: ServicePanel[] = [
  {
    id: "lighting",
    eyebrow: "01 / Lighting Automation",
    title: "Lighting Automation",
    description:
      "Lights turn on automatically when you enter, switch off when spaces are vacant, and can be managed or dimmed to the perfect level from a single keypad for a smart living experience.",
    secondaryDescription:
      "Includes intelligent processors, dimmer modules, occupancy sensors, and elegant keypads to deliver effortless lighting control, energy savings,",
    image: LightingAutomationImage,
    accent: "#8ab4ff",
    icon: Lightbulb,
  },
  {
    id: "av",
    eyebrow: "02 / Audio Video Automation",
    title: "Audio Video Automation",
    description:
      "Easily control music, streaming platforms, and audio zones from a single app, from soothing devotional music during a pooja, synchronized audio for a house party, to personalized music in different rooms for every family member.",
    secondaryDescription:
      "Includes amplifiers, decorative wall speakers, in-ceiling speakers, and hanging speakers to deliver immersive entertainment",
    image: AudioVideoAutomationImage,
    accent: "#c7a6ff",
    icon: Volume2,
  },
  {
    id: "shades",
    eyebrow: "03 / Shades Automation",
    title: "Shades Automation",
    description:
      "Adjust shades to any desired level for the perfect balance of daylight and privacy, with smooth ultra-quiet operation that automatically opens halfway during sunlight and fully after peak daylight for comfort, energy efficiency, and convenience.",
    secondaryDescription: "Includes roller blinds and automated drapery tracks",
    image: ShadesAutomationImage,
    accent: "#7ee7d8",
    icon: Blinds,
  },
  {
    id: "hvac",
    eyebrow: "04 / HVAC Automation",
    title: "HVAC Automation",
    description:
      "Easily adjust AC temperature through a thermostat, keypad, iPad, app, creating the perfect ambience and convenient control from anywhere.",
    secondaryDescription:
      "Includes intelligent interfaces and smart thermostats",
    image: TemperatureAutomationImage,
    accent: "#8ce1a1",
    icon: Thermometer,
  },
  {
    id: "security",
    eyebrow: "05 / Security Automation",
    title: "Security Automation",
    description:
      "Receive instant app notifications if a door is opened while you are away, set schedules and access timings as per your preference, and monitor your home remotely for enhanced security and convenience at all times.",
    secondaryDescription:
      "Includes smart cameras, video doorbells, and digital door locks for advanced safety and remote access",
    image: SecurityAutomationImage,
    accent: "#ffd47a",
    icon: ShieldCheck,
  },
  {
    id: "amc",
    eyebrow: "06 / Core Maintenance",
    title: "AMC",
    description:
      "Customers can simply call our support number to register a complaint, after which our engineers are promptly assigned to reach the site within 4 hours for quick and reliable resolution.",
    secondaryDescription:
      " ATPL sets a new industry benchmark with 4-hour in-person technician support, 24x7 assistance, and 60+ in-house engineers ensuring faster issue resolution and uninterrupted comfort. ",
    image: MaintenanceAutomationImage,
    accent: "#ff9d8f",
    icon: Wrench,
  },
];

function ServicePanelCard({
  service,
  index,
}: {
  service: ServicePanel;
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useBreakpoint();
  const prefersReducedMotion = useReducedMotion();
  const Icon = service.icon;

  const isImageRight = index % 2 === 0;

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      // Image Parallax as the section scrolls into view
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15, yPercent: isMobile ? -5 : -15 },
        {
          scale: 1,
          yPercent: 0,
          ease: EASE.none,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            end: "top top",
            scrub: true,
          },
        },
      );

      // Staggered reveal for text content — scoped with component-specific class (audit M2)
      const elements = gsap.utils.toArray(".cs-stagger-el", contentRef.current);
      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: EASE.reveal,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: cardRef, dependencies: [isMobile, prefersReducedMotion] },
  );

  return (
    <article
      ref={cardRef}
      className="sticky top-0 z-20 flex h-[100svh] w-full flex-col overflow-hidden bg-background md:h-screen md:flex-row"
      style={{ zIndex: 20 + index }}
    >
      {/* Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Image Panel */}
      <div
        className={`relative h-[40%] sm:h-[45%] w-full overflow-hidden bg-surface-darker md:h-full md:w-1/2 ${isImageRight ? "md:order-2" : "md:order-1"}`}
      >
        <div
          ref={imageRef}
          className="absolute inset-0 h-[120%] w-[120%] -left-[10%] -top-[10%] origin-center bg-cover bg-center transform-gpu"
        >
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        {/* Soft gradient overlay for text readability on mobile */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent md:hidden" />
      </div>

      {/* Content Panel */}
      <div
        ref={contentRef}
        className={`relative flex h-[60%] sm:h-[55%] w-full flex-col justify-center px-5 sm:px-8 md:h-full md:w-1/2 lg:px-20 ${isImageRight ? "md:order-1" : "md:order-2"}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02),transparent_70%)]" />

        <div className="relative z-10 max-w-xl mx-auto md:mx-0">

          <h3 className="cs-stagger-el mb-3 sm:mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl font-light leading-[1.2] tracking-wide text-foreground drop-shadow-sm">
            {service.title}
          </h3>

          <p className="cs-stagger-el text-[13px] sm:text-[15px] md:text-base lg:text-lg leading-[1.6] sm:leading-[1.7] text-muted max-w-[95%] sm:max-w-[90%]">
            {service.description}
          </p>

          <p className="cs-stagger-el mt-3 text-xs sm:text-sm md:text-base leading-[1.6] text-muted/75 mb-6 sm:mb-8 md:mb-12 max-w-[95%] sm:max-w-[88%]">
            {service.secondaryDescription}
          </p>

          <div className="cs-stagger-el">
            <button
              type="button"
              aria-label={`Explore ${service.title} solution`}
              className="group relative inline-flex items-center gap-3 sm:gap-4 overflow-hidden rounded-full bg-accent px-6 sm:px-8 py-3 sm:py-4 text-[13px] sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-accent-soft shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="relative z-10">Talk to an Expert</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              <div
                className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                style={{ backgroundColor: service.accent }}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ConnectedSystems() {
  const containerRef = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      // Scoped header reveal using gsap.utils.toArray with scope (audit M1)
      const headerEls = gsap.utils.toArray(
        ".cs-header-el",
        containerRef.current,
      );
      const headerContainer = containerRef.current?.querySelector(
        ".cs-header-container",
      );

      if (headerEls.length > 0 && headerContainer) {
        gsap.fromTo(
          headerEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: EASE.reveal,
            scrollTrigger: {
              trigger: headerContainer,
              start: "top 70%",
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="platform"
      className="relative z-20 w-full bg-background"
    >
      {/* Intro Pin Section - Sticks at top before cards slide over it */}
      <div className="cs-header-container sticky top-0 z-10 flex h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] w-full flex-col items-center justify-center overflow-hidden px-5 sm:px-6 text-center">
        <div className="absolute inset-0 bg-background" />

        <div className="relative z-10 max-w-4xl">
          <div className="cs-header-el mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-darker px-4 sm:px-5 py-1.5 sm:py-2 text-xs font-medium tracking-[0.2em] uppercase text-foreground backdrop-blur-md shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-foreground" />
            Core Capabilities
          </div>
          <h2 className="cs-header-el text-3xl md:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground">
            Engineering Disciplines
          </h2>
          <p className="cs-header-el mt-4 sm:mt-6 text-sm sm:text-base text-muted max-w-xl mx-auto">
            ATPL manages the complete lifecycle of system integration, encompassing initial design layout, structural coordination, system programming, and deployment. Our methodology unifies diverse automated infrastructures under a singular engineering framework, establishing absolute system accountability and long-term operational stability and service.
          </p>
        </div>
      </div>

      {/* Stacked Cards mapped directly in the flow */}
      <div className="relative z-20 w-full">
        {SERVICES.map((service, index) => (
          <ServicePanelCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
