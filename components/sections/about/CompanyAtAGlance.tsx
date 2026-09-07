"use client";

import React from "react";

const STATS = [
  {
    prefix: "Over",
    value: "24",
    label: "Years of Industry Experience",
    description: "Two decades of pioneering automation standards across India.",
  },
  {
    prefix: "Over",
    value: "1,000",
    label: "Portfolios Completed",
    description: "Delivering reliable, sophisticated systems to the country's most discerning private residences, hotels and offices.",
  },
  {
    prefix: "",
    value: "3",
    label: "Experience Centres",
    description: "",
  },
  {
    prefix: "Over",
    value: "30",
    label: "Technology Partners",
    description: "",
  },
  {
    prefix: "Over",
    value: "15",
    label: "Regional Hubs",
    description: "",
  },
  {
    prefix: "",
    value: "Pan India",
    label: "Project Presence",
    description: "",
  },
];

export default function CompanyAtAGlance() {
  return (
    <section
      className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24 border-t border-black/5"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-20 lg:gap-32 items-start">

        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-24 md:sticky md:top-32 md:h-fit">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium mb-4">
            Company at a Glance
          </span>
          <h2 className=" text-foreground">
            Our Impact in Numbers
          </h2>
        </div>

        {/* Right Stats Vertical Stack (Native Scrolling) */}
        <div className="w-full md:w-1/2 flex flex-col gap-16 sm:gap-20 border-l border-black/5 pl-6 sm:pl-8 md:pl-16">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col border-b border-black/5 pb-6 sm:pb-8 last:border-b-0 last:pb-0 group cursor-default"
            >
              {stat.prefix && <span className="text-sm md:text-base tracking-[0.3em] text-accent font-normal mt-5 mb-1 sm:mb-2 block">{stat.prefix}</span>}
              <div className="font-light tracking-wide leading-none text-foreground mb-3 sm:mb-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 text-3xl sm:text-4xl lg:text-5xl">
                <span>{stat.value}</span>
              </div>
              <div className="text-muted-foreground font-light tracking-wide text-sm sm:text-base md:text-lg transition-colors duration-500 group-hover:text-foreground whitespace-pre-line">
                {stat.label}
              </div>
              {stat.description && (
                <p className="text-muted/70 font-light text-sm md:text-base leading-relaxed mt-3">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
