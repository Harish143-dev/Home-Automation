"use client";

import React from "react";
import { MapPin, Phone } from "lucide-react";

const LOCATIONS = [
  {
    city: "Delhi",
    address: "Lower Ground Floor, D20, Block D, Jangpura, New Delhi, Delhi 110014",
    phones: ["+91-11-24324113", "+91-11-45643992", "+91-11-24324115"]
  },
  {
    city: "Mumbai",
    address: "10/76, Apte Properties, Ground Floor Parijat House, LR Papan Marg, off Doctor Elijah Moses Road, Worli, Mumbai, Maharashtra 400018",
    phones: ["+91-22-49675653", "+91-82912-39139"]
  },
  {
    city: "Bengaluru",
    address: "13, 100 Feet Ring Road, Anjaneya Nagar, Bangalore South Banashankari 3 Rd Stage, Bangalore 560085, Karnataka",
    phones: ["+91-80-4113-0438", "+91-80-25270460"]
  }
];

export default function OurLocations() {
  return (
    <section
      className="py-12 md:py-16 relative px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-locations"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noise-locations)" />
      </svg>

      <div className="relative z-10 max-w-7xl w-full mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 md:mb-32">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Our Locations
          </span>
          <h2 className="">
            Experience Centers & Offices
          </h2>
        </div>

        {/* Centered Locations Layout with Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {LOCATIONS.map((loc, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center group py-10 md:py-0 px-4 md:px-8 lg:px-12 first:pt-0 md:first:pt-0 last:pb-0 md:last:pb-0"
            >
              <h3 className=" mb-8 text-foreground transition-colors duration-300">
                {loc.city}
              </h3>

              <div className="flex-grow flex flex-col space-y-8 w-full items-center">
                {/* Address */}
                <div className="flex flex-col items-center gap-3">
                  <MapPin className="w-5 h-5 text-accent opacity-80" />
                  <p className="text-muted-foreground font-light text-[15px] leading-relaxed max-w-[280px]">
                    {loc.address}
                  </p>
                </div>

                {/* Phones */}
                <div className="flex flex-col items-center gap-3">
                  <Phone className="w-5 h-5 text-accent opacity-80" />
                  <div className="flex flex-col items-center gap-1.5">
                    {loc.phones.map((phone, pIdx) => (
                      <a
                        key={pIdx}
                        href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                        className="text-foreground/80 hover:text-accent font-light text-[15px] transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
