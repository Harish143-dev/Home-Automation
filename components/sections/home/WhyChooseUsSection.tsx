'use client';

import React from 'react';
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
  return (
    <section className="py-12 md:py-16 relative z-10 px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <h2 className=" mb-6 text-foreground">
            What Sets Us Apart?
          </h2>
          <p className="text-muted text-sm sm:text-base md:text-lg lg:text-[21px] font-medium leading-relaxed tracking-wide max-w-2xl mx-auto">
            Our commitment to excellence ensures unmatched quality and innovation in every project.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-6 md:gap-10 pb-[10vh]">
          {usps.map((usp, index) => {
            const Icon = usp.icon;

            return (
              <div
                key={usp.id}
                className="sticky shadow-lg border border-border bg-panel rounded-[24px] md:rounded-[32px] p-8 sm:p-10 md:p-14 lg:p-16 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center overflow-hidden"
                style={{
                  top: `calc(120px + ${index * 20}px)`,
                  zIndex: 10 + index
                }}
              >
                {/* Subtle gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                {/* Left side: Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-surface-darker border border-border shadow-inner flex items-center justify-center shrink-0 relative z-10">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-accent" strokeWidth={1.5} />
                </div>

                {/* Right side: Content */}
                <div className="flex-1 flex flex-col justify-center relative z-10">
                  <h3 className=" text-foreground mb-4 md:mb-6">
                    {usp.title}
                  </h3>
                  <p className="text-muted text-sm md:text-base leading-relaxed font-light tracking-wide mb-6 md:mb-8 max-w-2xl">
                    {usp.description}
                  </p>

                  <div className="mt-auto">
                    <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center relative z-20">
          <button className="flex items-center justify-center px-8 py-4 gap-3 text-[15px] font-medium text-foreground bg-surface-darker hover:bg-panel border border-border rounded-full transition-all group">
            View All Capabilities
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-accent" />
          </button>
        </div>
      </div>
    </section>
  );
}
