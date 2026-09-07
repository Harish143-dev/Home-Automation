"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import featuredImage from "@/assets/projects/SawaiManMahal.jpg";

export default function FeaturedArticle() {
  return (
    <section
      className="py-12 md:py-16 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24"
    >
      <Link href="/blog/the-invisible-interface" className="max-w-7xl mx-auto cursor-pointer group block">
        <div className="flex flex-col gap-10 lg:gap-16">

          {/* Magazine Cover Style Image */}
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-2xl">
            <div className="absolute inset-0 will-change-transform">
              <NextImage
                src={featuredImage}
                alt="Featured Editorial Image"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/5 transition-opacity duration-700 group-hover:opacity-0" />
            </div>

            {/* Elegant reading CTA overlay on image corner */}
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 flex items-center gap-4 bg-background/80 backdrop-blur-md px-6 py-4 rounded-full border border-white/10 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span className="text-sm font-light tracking-wide text-foreground">Read Feature</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </div>
          </div>

          {/* Typography block */}
          <div className="flex flex-col gap-6 md:w-3/4 lg:w-2/3">
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <h5 className="text-accent !mb-0">Architectural Technology</h5>
              <h5>•</h5>
              <h5 className="!mb-0">May 28, 2026</h5>
              <h5>•</h5>
              <h5 className="!mb-0">6 Min Read</h5>
            </div>

            <h2 className=" text-foreground group-hover:text-accent transition-colors duration-500">
              The Invisible Interface: Designing Automation That Disappears
            </h2>

            <p className="text-lg font-light text-muted-foreground leading-relaxed">
              Explore how modern architectural integration is shifting away from
              visible wall-acne and complex panels, moving towards ambient,
              predictive systems that seamlessly blend into luxury interiors.
            </p>
          </div>

        </div>
      </Link>
    </section>
  );
}
