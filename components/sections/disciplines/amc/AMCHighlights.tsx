"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

const HIGHLIGHTS = [
  "24×7 Customer Support",
  "4-Hour On-Site Service for AMC Clients",
  "Preventive System Maintenance",
  "Regular Health Checks & Performance Monitoring",
  "Technical Assistance Across Multiple Systems"
];

export default function AMCHighlights() {
  return (
    <section
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left: Text */}
        <div className="w-full lg:w-5/12 flex flex-col items-start justify-center">
          <h5 className="text-accent mb-4 block">
            Premium Service
          </h5>
          <h2 className="text-foreground mb-6 text-balance">
            Key Highlights
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed text-balance">
            Our comprehensive AMC packages are designed to provide peace of mind, ensuring your smart home and commercial automation systems run flawlessly year-round.
          </p>
        </div>

        {/* Right: Stats List */}
        <div className="w-full lg:w-7/12 flex flex-col justify-center">
          <ul className="flex flex-col border-t border-black/5">
            {HIGHLIGHTS.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-4 group py-6 border-b border-black/5">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <span className="text-base md:text-lg font-light text-foreground leading-snug">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
