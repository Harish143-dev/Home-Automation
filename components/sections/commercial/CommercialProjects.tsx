"use client";

import React, { useState } from "react";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Mortgage Services",
    description: "Streamlining financial workflows with automated environment controls.",
    image: "/images/commercial_project_mortgage.png",
  },
  {
    id: 2,
    title: "Property Management",
    description: "Let us handle the details so you can enjoy the rewards.",
    image: "/images/commercial_project_property.png",
  },
  {
    id: 3,
    title: "Construction and Real Estate Development",
    description: "Integrating smart infrastructure directly into the blueprint phase.",
    image: "/images/commercial_project_construction.png",
  }
];

export function CommercialProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1); // Default to middle card

  return (
    <section className="relative w-full bg-background py-24 sm:py-32 px-6 sm:px-12 md:px-20 lg:px-32">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-10 md:gap-14">

        {/* Header */}
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide leading-[1.2] text-foreground">
            Commercial Spaces Powered by <span className="text-foreground/50">Intelligent Automation</span>
          </h2>
        </div>

        {/* Projects Accordion / Expanding Cards */}
        <div className="flex flex-col lg:flex-row w-full h-[500px] lg:h-[400px] xl:h-[450px] gap-2 md:gap-4">
          {PROJECTS_DATA.map((project, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`relative overflow-hidden transition-all duration-700 ease-in-out cursor-pointer group flex-1 ${isHovered ? "lg:flex-[1.4]" : "lg:flex-1"
                  }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <NextImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  />
                  {/* Cinematic Gradients (keep these dark to ensure white text on cards is readable) */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 ${isHovered ? 'opacity-90' : 'opacity-70'}`} />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">

                  {/* Title (Always visible, wraps naturally) */}
                  <h3 className="text-2xl md:text-3xl font-light tracking-wide leading-[1.2] text-white mb-3">
                    {project.title.split(" ").map((word, i) => (
                      <React.Fragment key={i}>
                        {word}{" "}
                        {word === "Estate" && <br className="hidden lg:block" />}
                      </React.Fragment>
                    ))}
                  </h3>

                  {/* Expandable Details (Smooth height animation using CSS Grid) */}
                  <div
                    className={`grid transition-all duration-700 ease-in-out ${isHovered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[14px] sm:text-[16px] md:text-[17px] lg:text-[19px] leading-relaxed font-medium tracking-tight text-white/70 max-w-sm mb-5">
                        {project.description}
                      </p>

                      {/* CTA Button (matches reference image style: thin border pill) */}
                      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors w-fit">
                        <span className="text-xs font-medium text-white tracking-wide">Learn More</span>
                        <ArrowRight className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA (Read more case study) */}
        <div className="w-full flex justify-start lg:justify-end mt-2">
          <div className="flex items-center group cursor-pointer">
            <span className="text-sm md:text-base font-medium tracking-wide text-accent group-hover:text-accent/90 transition-colors duration-300">
              Read more case study
            </span>
            <div className="ml-4 w-10 h-10 rounded-full bg-surface-darker flex items-center justify-center group-hover:bg-panel transition-colors duration-300 border border-border">
              <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform duration-300 ease-out" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
