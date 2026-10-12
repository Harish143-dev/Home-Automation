"use client";

import React from "react";
import NextImage from "next/image";

const TEAM = [
  {
    name: "Michael Chen",
    role: "Head of Engineering",
    image: "/images/projects/hospitality/taj-lakefront-bhopal/1.webp"
  },
  {
    name: "Sarah Jenkins",
    role: "Lead Lighting Designer",
    image: "/images/projects/hospitality/taj-lakefront-bhopal/1.webp"
  },
  {
    name: "David Alaba",
    role: "Project Management Lead",
    image: "/images/projects/commercial/wave-cinema/1.webp"
  },
  {
    name: "Emily Watson",
    role: "Client Experience Director",
    image: "/images/projects/hospitality/crown-plaza-gurgaon/1.webp"
  },
  {
    name: "Arjun Patel",
    role: "Systems Integration Lead",
    image: "/images/projects/commercial/meta-office-gurgaon/1.webp"
  },
  {
    name: "Priya Sharma",
    role: "Support Operations",
    image: "/images/projects/hospitality/crown-plaza-gurgaon/1.webp"
  }
];

export default function OurTeam() {
  return (
    <section
      className="py-12 md:py-16 relative px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 md:mb-24">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Our Team
          </span>
          <h2 className=" mb-4">
            The Experts Behind Every Intelligent Solution
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
            From engineers and designers to project managers and support specialists, our team collaborates to deliver seamless automation experiences.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {TEAM.map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Image Container with Hover Scale */}
              <div className="relative w-full aspect-square md:aspect-[4/5] rounded-xl md:rounded-2xl overflow-hidden mb-6 transition-shadow duration-500 group-hover:shadow-2xl">
                <NextImage
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  unoptimized
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 pointer-events-none" />
              </div>

              {/* Text Info */}
              <h4 className=" mb-1 transition-colors duration-300 group-hover:text-accent">
                {member.name}
              </h4>
              <div className="text-muted-foreground font-light tracking-wider text-sm md:text-base">
                {member.role}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
