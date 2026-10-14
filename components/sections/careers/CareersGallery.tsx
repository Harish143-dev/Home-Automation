"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_IMAGES = [
  {
    src: "/images/projects/residential/bhartiya-residence/1.jpg",
    alt: "Team meetings and collaborative planning",
    className: "col-span-1 md:col-span-2 row-span-2 aspect-[4/3] md:aspect-auto",
  },
  {
    src: "/images/projects/residential/aranyak-farmhouse/1.jpg",
    alt: "Project execution and engineering",
    className: "col-span-1 aspect-square",
  },
  {
    src: "/images/projects/hospitality/crown-plaza-gurgaon/1.jpg",
    alt: "Training sessions and skill development",
    className: "col-span-1 aspect-square",
  },
  {
    src: "/images/projects/commercial/wave-cinema/1.jpg",
    alt: "Employee celebrations and team bonding",
    className: "col-span-1 md:col-span-2 aspect-[2/1]",
  },
  {
    src: "/images/projects/commercial/meta-office-gurgaon/1.jpg",
    alt: "Site installations and field work",
    className: "col-span-1 md:col-span-2 aspect-[2/1]",
  },
];

export default function CareersGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        onRefresh: () => scheduleScrollRefresh(),
      }
    });

    // Animate Header Elements
    const headerElements = gsap.utils.toArray(".cg-header-el", headerRef.current);
    tl.fromTo(headerElements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.normal,
        ease: EASE.reveal
      }
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full px-6 sm:px-8 md:px-16 lg:px-24 bg-background overflow-hidden"
    >
      {/* Noise Texture Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none" aria-hidden="true">
        <filter id="noise-gallery">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-gallery)" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
          <h5 className="cg-header-el text-accent !mb-6">
            Life at Anusha
          </h5>
          <h2 className=" cg-header-el text-foreground mb-8">
            People are at the heart of everything we do.
          </h2>
        </div>

        {/* Bento Grid Gallery */}
        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full auto-rows-[200px] md:auto-rows-[300px]"
        >
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className={`cg-image-container group relative rounded-2xl overflow-hidden bg-white/5 ${img.className}`}
            >
              <NextImage
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              {/* Subtle gradient overlay to match the premium dark feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white/90 font-light tracking-wide text-sm md:text-base opacity-0 translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
