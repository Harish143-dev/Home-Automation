'use client';

import React, { useState, useRef } from 'react';
import NextImage from 'next/image';
import { gsap, useGSAP } from '../../../lib/gsapSetup';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scheduleScrollRefresh } from '../../../lib/scrollRefresh';

// Placeholder images for scenarios
import imgScenario1 from '../../../public/images/scenario_goodbye.png';
import imgScenario2 from '../../../public/images/scenario_dinner.png';
import imgScenario3 from '../../../public/images/scenario_morning.png';
import imgScenario4 from '../../../public/images/scenario_tv.png';
import imgScenario5 from '../../../public/images/residential_hero_bg.png'; // Reusing for placeholder

const SCENARIOS = [
  {
    id: "leaving-home",
    title: "Leaving Home",
    description: "With a single tap, lock all doors, arm the security system, switch off selected lights, and activate surveillance cameras before you leave.",
    image: imgScenario1
  },
  {
    id: "visitor-arrival",
    title: "Visitor Arrival",
    description: "Receive a live video call on your smartphone, speak with visitors, verify their identity, and grant access remotely from anywhere.",
    image: imgScenario2
  },
  {
    id: "vacation-mode",
    title: "Vacation Mode",
    description: "Keep an eye on your home with live camera access while scheduled lighting and automated routines create the appearance that someone is home.",
    image: imgScenario3
  },
  {
    id: "late-night",
    title: "Late-Night Security",
    description: "Motion detected outdoors automatically turns on pathway and perimeter lights while sending an instant alert to your smartphone.",
    image: imgScenario4
  },
  {
    id: "emergency-alerts",
    title: "Emergency Alerts",
    description: "Receive immediate notifications with live camera snapshots when motion, intrusion, smoke, gas leaks, or other unusual activity is detected.",
    image: imgScenario5
  }
];

export function SecurityScenarios() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.fromTo('.ss-header',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    scheduleScrollRefresh();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <section ref={sectionRef} className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-20">

        {/* Header */}
        <div className="ss-header text-center max-w-3xl mx-auto">
          <h5 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-accent mb-4 block">
            Intelligent Automation
          </h5>
          <h2 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground text-balance mb-6">
            Everyday Security Scenarios Made Smarter
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Experience how intelligent security automation protects your home by responding instantly to everyday situations.
          </p>
        </div>

        {/* Scenarios Interactive Container */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left Side: Tabs / Accordion Style */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center gap-4">
            {SCENARIOS.map((scenario, idx) => {
              const isActive = activeTab === idx;

              return (
                <div
                  key={scenario.id}
                  onClick={() => setActiveTab(idx)}
                  className={`group cursor-pointer p-6 rounded-2xl transition-all duration-500 border ${isActive
                    ? 'bg-panel border-black/10 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-black/5'
                    }`}
                >
                  <h3 className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300 mb-3 ${isActive ? 'text-accent' : 'text-foreground group-hover:text-accent'
                    }`}>
                    {scenario.title}
                  </h3>

                  <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                    <p className="overflow-hidden text-base lg:text-lg font-light text-muted-foreground leading-relaxed">
                      {scenario.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Image Crossfade */}
          <div className="w-full lg:w-[55%] relative h-[400px] md:h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden bg-panel shadow-xl">
            {SCENARIOS.map((scenario, idx) => (
              <div
                key={scenario.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeTab === idx
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 z-0'
                  }`}
              >
                <NextImage
                  src={scenario.image}
                  alt={scenario.title}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
                {/* Subtle gradient overlay to enhance contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
