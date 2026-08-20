"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    id: "horizon-tower",
    title: "The Horizon Tower",
    description: "Luxury 40-Story Residential High-Rise",
    image: "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
    tags: ["Climate Control", "Lighting"],
    href: "/projects",
  },
  {
    id: "aura-residences",
    title: "Aura Residences",
    description: "Premium Gated Community",
    image: "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-1.jpg",
    tags: ["Security", "Access Control"],
    href: "/projects",
  },
  {
    id: "lumina-lofts",
    title: "Lumina Lofts",
    description: "Boutique Smart Apartments",
    image: "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-1.jpg",
    tags: ["Motorized Shades", "Multi-room Audio"],
    href: "/projects",
  }
];

export default function MduProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    gsap.fromTo(".projects-header",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(".project-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        }
      }
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Header */}
        <div className="projects-header max-w-4xl text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-6 bg-accent/30" />
            <span className="text-sm md:text-base tracking-[0.3em] text-accent">
              Portfolio
            </span>
            <div className="h-[1px] w-6 bg-accent/30" />
          </div>

          <h2 className=" text-foreground mb-6">
            Featured MDU Deployments
          </h2>

          <p className="text-muted font-light text-base md:text-lg leading-relaxed max-w-2xl">
            Explore how we have transformed premier residential properties with state-of-the-art automation systems tailored for modern living.
          </p>
        </div>

        {/* Grid */}
        <div className="projects-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              className="project-card group relative flex flex-col overflow-hidden outline-none"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                <NextImage
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />

                {/* Hover Glass Panel */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base">View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col px-2">
                <div className="flex items-center gap-3 mb-3 text-xs md:text-sm tracking-[0.2em] text-accent font-medium">
                  {project.tags.join(" • ")}
                </div>

                <h3 className=" text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-base text-muted font-light leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
