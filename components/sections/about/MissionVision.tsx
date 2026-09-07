"use client";

import React from "react";
import NextImage from "next/image";


export default function MissionVision() {
  return (
    <section
      className="py-12 md:py-16 relative px-5 sm:px-8 md:px-16 lg:px-24 overflow-hidden bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20 lg:gap-32">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="block tracking-[0.3em] text-sm md:text-base text-accent font-medium">
            Mission & Vision
          </span>
          <h2 className=" text-foreground">
            Our Purpose Drives Every Innovation
          </h2>
        </div>

        <div className="flex flex-col gap-20 lg:gap-32">

          {/* Mission Row */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className=""  > Our Mission </h3> <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
                To create intelligent, user-centric automation solutions that increase comfort, convenience, security, and energy efficiency while delivering exceptional experiences across residential, hospitality, and commercial spaces.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden">
                <NextImage
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200"
                  alt="Intelligent living space"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Vision Row */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className=""  > Our Vision </h3> <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
                To be India's most trusted automation solutions partner by continuously innovating, embracing emerging technologies, and setting new benchmarks in smart living and intelligent buildings.
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden">
                <NextImage
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern architectural building"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

        </div>
      </div >
    </section >
  );
}
