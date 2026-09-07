"use client";

import React from "react";
import NextImage from "next/image";

const FOUNDERS = [
  {
    name: "John Doe",
    role: "Managing Director / Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    message: [
      "For over two decades, our vision has been driven by a singular goal: to seamlessly integrate technology into the fabric of daily life without compromising architectural integrity.",
      "We believe that true luxury lies in simplicity. The best automation systems are those that fade into the background, allowing you to focus on what truly matters while your environment anticipates your needs.",
      "As we look to the future, we remain committed to pushing the boundaries of what is possible, continuously innovating to create spaces that are not just smart, but truly intelligent."
    ]
  },
  {
    name: "Jane Smith",
    role: "CEO / Co-founder",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    message: [
      "Building a company that transforms how people interact with their spaces requires more than just technological expertise; it demands a deep understanding of human behavior and design.",
      "Our approach is centered on the customer. We spend countless hours understanding the nuances of how people live and work, ensuring that our solutions are intuitive, reliable, and fundamentally enhance their quality of life.",
      "We are incredibly proud of the team we've built and the impact we've had on thousands of projects across India. Together, we are shaping the future of intelligent living."
    ]
  }
];

export default function MeetOurFounders() {
  return (
    <section
      className="py-12 md:py-16 relative w-full bg-background text-foreground px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-founders"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-founders)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 md:px-24">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 md:mb-32">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Meet Our Founder
          </span>
          <h2 className=""  > Leadership That Inspires Innovation </h2> </div> <div className="flex flex-col gap-24 md:gap-32 lg:gap-40">
          {FOUNDERS.map((founder, idx) => {
            const isReverse = idx % 2 !== 0;

            return (
              <div
                key={idx}
                className={`founder-row flex flex-col lg:flex-row ${isReverse ? 'lg:flex-row-reverse' : ''} items-center gap-12 lg:gap-24`}
              >

                {/* Image Column */}
                <div className="w-full lg:w-5/12">
                  <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden">
                    <NextImage
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 border border-black/5 rounded-xl md:rounded-2xl pointer-events-none" />
                  </div>
                </div>

                {/* Text Column */}
                <div className="w-full lg:w-7/12 space-y-8">
                  <div>
                    <h3 className=" mb-3">
                      {founder.name}
                    </h3>
                    <div className="text-accent text-lg md:text-xl font-light tracking-wide">
                      {founder.role}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {founder.message.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-muted-foreground font-light text-base md:text-lg leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section >
  );
}
