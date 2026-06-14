'use client';

import React, { useState } from 'react';
import {
  Globe,
  Headphones,
  Award,
  ArrowRight,
  Briefcase,
  Settings,
  MapPin,
  Star,
  Layers
} from 'lucide-react';
import { Button } from '../../ui/button';

const usps = [
  {
    id: 1,
    title: 'Experience & Expertise',
    shortTitle: 'Experience',
    description: "Over 24 years of industry leadership in Lighting Controls, Automation, Audio-Video, Security, and Wi-Fi Systems.",
    icon: Briefcase,
  },
  {
    id: 2,
    title: 'Extensive Portfolio',
    shortTitle: 'Portfolio',
    description: "Over 650 homes, over 250 hotels and over 100 offices completed",
    icon: Layers,
  },
  {
    id: 3,
    title: 'Diverse Projects & Reach',
    shortTitle: 'Reach',
    description: "Expertise across Residential, Commercial, Institutional, and Hospitality sectors with global reach.",
    icon: Globe,
  },
  {
    id: 4,
    title: 'Comprehensive Services',
    shortTitle: 'Services',
    description: "In-house commissioning & installation for full quality control, Post-warranty AMC services & Full project lifecycle support from consultation to execution.",
    icon: Settings,
  },
  {
    id: 5,
    title: 'Experience Centres',
    shortTitle: 'Centres',
    description: "State-of-the-Art Experience centres in Delhi (opened in December 2015) & Mumbai (2023) & Bangalore (2025).",
    icon: MapPin,
  },
  {
    id: 6,
    title: 'Industry Recognition',
    shortTitle: 'Recognition',
    description: "Largest Residential and Hospitality Lutron Partner in India, Authorized Shade fabricator for Lutron in India & Award-winning partner at Lutron yearly awards for 10 consecutive years.",
    icon: Award,
  },
  {
    id: 7,
    title: 'Top Brands Available',
    shortTitle: 'Top Brands',
    description: "Represent Industry Leaders in Lighting Controls, BoardRoom Solutions, Security Systems and A/V Options. Long Associations give end users better support.",
    icon: Star,
  },
  {
    id: 8,
    title: 'Dedicated Service Team',
    shortTitle: 'Support',
    description: "24/7 on call service, 4 hour on site service, In-house team of 60+ engineers. Long-term experience & quality service. Pan India Presence.",
    icon: Headphones,
  }
];

export function WhyChooseUsSection() {
  const [activePanel, setActivePanel] = useState<number>(0);

  return (
    <section className="relative z-10 py-16 sm:py-20 md:py-24 lg:py-32 px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden bg-background text-foreground">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 md:mb-16 lg:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] mb-3 sm:mb-4 md:mb-6 text-foreground">
              WHAT SETS US APART?
            </h2>
            <p className="text-muted text-sm sm:text-base md:text-lg lg:text-[21px] font-medium leading-relaxed tracking-wide">
              Our commitment to excellence ensures unmatched quality and innovation in every project.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[15px] font-medium text-accent hover:underline transition-all group">
            View All Capabilities
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Desktop & Mobile Layout Container */}
        <div className="flex flex-col md:flex-row h-auto md:h-[500px] lg:h-[600px] gap-2 sm:gap-3 md:gap-4 w-full">
          {usps.map((usp, index) => {
            const isActive = activePanel === index;
            const Icon = usp.icon;

            return (
              <div
                key={usp.id}
                onMouseEnter={() => setActivePanel(index)}
                onFocus={() => setActivePanel(index)}
                tabIndex={0}
                className={`
                  relative overflow-hidden rounded-2xl sm:rounded-[28px] md:rounded-[32px] cursor-pointer
                  transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  group flex flex-col border border-border
                  ${isActive
                    ? 'h-[340px] sm:h-[380px] md:h-full md:flex-[4_4_0%] bg-panel shadow-md z-10 scale-[1.01] md:scale-100'
                    : 'h-[72px] sm:h-[80px] md:h-full md:flex-[1_1_0%] bg-surface-darker hover:bg-panel z-0'
                  }
                `}
              >
                {/* 
                  Compressed State Title Bar 
                                <h3 className={`
                      text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-[1.2]
                      transition-colors duration-500
                      ${isActive ? 'text-white' : 'text-black'}
                    `}>
                  {/* Desktop Layout */}
                <div className={`
                  absolute inset-0 z-20 pointer-events-none
                  transition-opacity duration-300
                  ${isActive ? 'opacity-0' : 'opacity-100 delay-300'}
                `}>
                  {/* Desktop Layout */}
                  <div className="hidden md:flex flex-col items-center justify-between w-full h-full py-10">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full border border-border bg-surface-darker shadow-sm flex items-center justify-center shrink-0 transition-colors duration-500">
                      <Icon size={24} className="text-foreground" strokeWidth={1.5} />
                    </div>

                    {/* The text container uses a fixed width relative to the rotation to ensure it aligns nicely */}
                    <div className="flex-1 flex items-end justify-center pb-12">
                      <div className="-rotate-90 whitespace-nowrap origin-center font-medium text-[17px] text-foreground tracking-wide">
                        {usp.shortTitle}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden flex items-center w-full h-full px-4 sm:p-5">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-border bg-surface-darker shadow-sm flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-foreground sm:hidden" strokeWidth={1.5} />
                      <Icon size={24} className="text-foreground hidden sm:block" strokeWidth={1.5} />
                    </div>
                    <div className="ml-3 sm:ml-5 font-medium text-[15px] sm:text-[17px] text-foreground tracking-wide">
                      {usp.title}
                    </div>
                  </div>
                </div>

                {/* 
                  Expanded Content Area 
                */}
                <div className={`
                  flex-1 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 relative w-full h-full
                  transition-all duration-500 delay-100
                  ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
                `}>
                  {/* Subtle Background Icon */}
                  <div className={`
                    absolute top-8 right-8 md:top-12 md:right-12 
                    flex items-center justify-center pointer-events-none
                    transition-all duration-1000 transform
                    ${isActive ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-45 opacity-0'}
                  `}>
                    <Icon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 text-black/[0.03]" strokeWidth={0.75} />
                  </div>

                  <div className="relative z-10 mt-auto max-w-xl">
                    {/* Small active icon above title */}
                    <div className={`
                      w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-accent flex items-center justify-center mb-5 sm:mb-6 md:mb-8
                      transition-all duration-500 transform
                      ${isActive ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-8 opacity-0'}
                    `}>
                      <Icon size={24} className="text-white" strokeWidth={1.5} />
                    </div>

                    <h3 className={`
                      text-2xl md:text-3xl lg:text-4xl font-light tracking-wide leading-[1.2] text-foreground mb-2 sm:mb-3 md:mb-4
                      transition-all duration-500 transform
                      ${isActive ? 'translate-y-0 opacity-100 delay-150' : 'translate-y-8 opacity-0'}
                    `}>
                      {usp.title}
                    </h3>
                    <p className={`
                      text-muted text-[14px] sm:text-[16px] md:text-[17px] lg:text-[19px] mb-6 sm:mb-8 md:mb-10 leading-relaxed font-medium tracking-wide
                      transition-all duration-500 transform
                      ${isActive ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-8 opacity-0'}
                    `}>
                      {usp.description}
                    </p>

                    <Button 
                      variant="accent" 
                      size="lg" 
                      shape="full" 
                      className={`transition-all duration-500 transform ${isActive ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-8 opacity-0'}`}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View All Button */}
        <button className="md:hidden mt-10 w-full flex items-center justify-center gap-2 text-[15px] font-medium text-accent">
          View All Capabilities
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
