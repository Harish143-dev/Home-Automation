"use client";

import { useRef, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { Plus, Minus, MapPin } from "lucide-react";

const PROJECTS = [
  {
    id: "madhuri-dixit",
    client: "Madhuri Dixit's Residence",
    location: "Mumbai",
    scope: "Intelligent Lighting Automation",
    solutions: "Lighting Control, Motorized Shades, HVAC Control",
    outcome: "A thoughtfully curated living environment with effortless scene control, enhanced comfort, and intuitive automation.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "atul-raheja",
    client: "Atul Raheja Residence",
    location: "Delhi",
    scope: "Intelligent Lighting Automation",
    solutions: "Smart Lighting Control, Smart Keypads",
    outcome: "Personalized lighting scenes with intuitive one-touch control throughout the residence.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "nakul-bhatia",
    client: "Nakul Bhatia Residence",
    location: "Delhi",
    scope: "Intelligent Lighting Automation",
    solutions: "Lighting Control, Smart Keypads",
    outcome: "Intelligent lighting designed to enhance ambience, everyday convenience, and energy efficiency.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "devyani-villa",
    client: "Devyani Villa",
    location: "Delhi",
    scope: "Intelligent Lighting Automation",
    solutions: "Lighting Control, Motorized Shades, Smart Home Integration",
    outcome: "A seamlessly connected home delivering greater comfort, refined aesthetics, and effortless day-to-day living.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sournika-villa",
    client: "Sournika Villa",
    location: "Kerala",
    scope: "Intelligent Lighting Automation",
    solutions: "Lighting Control, Climate Integration, Smart Controls",
    outcome: "A connected home with personalized lighting experiences, enhanced comfort, and improved energy performance.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "rajan-mittal",
    client: "Rajan Mittal Residence",
    location: "Delhi",
    scope: "Intelligent Lighting Automation",
    solutions: "Lighting Control, Custom GUI, Audio-Video, Motorized Shades, Security Integration",
    outcome: "A fully integrated home with centralized control, intuitive operation, and a seamless connected living experience.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"
  }
];

export default function LightingProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(PROJECTS[0].id); // Open first by default
  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
      }
    });

    tl.fromTo(".lproj-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    tl.fromTo(".lproj-item",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col">

        {/* Header */}
        <div className="lproj-header text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light">
            Featured Work
          </span>
          <h2 className="text-foreground mb-6">
            Lighting Automation Projects
          </h2>
          <p className="text-muted font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover how we have transformed prestigious residences across India with intelligent, beautifully integrated lighting automation solutions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="w-full flex flex-col border-t border-border">
          {PROJECTS.map((project) => {
            const isOpen = openId === project.id;

            return (
              <div
                key={project.id}
                className="lproj-item flex flex-col border-b border-border transition-colors duration-300 hover:bg-black/[0.02]"
              >
                {/* Header (Clickable) */}
                <button
                  onClick={() => toggleAccordion(project.id)}
                  className="w-full py-6 md:py-8 flex items-center justify-between group focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-left">
                    <h3 className={`transition-colors ${isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>
                      {project.client}
                    </h3>
                    <div className={`flex items-center gap-1.5 transition-colors ${isOpen ? 'text-accent/70' : 'text-muted'}`}>
                      <MapPin className="text-xl sm:text-2xl lg:text-3xl w-4 h-4" />
                      <span className="text-sm font-medium tracking-wider">{project.location}</span>
                    </div>
                  </div>

                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ml-4 ${isOpen ? 'border-accent bg-accent text-white rotate-180' : 'border-border bg-panel text-foreground group-hover:border-accent group-hover:text-accent'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* Content (Expandable) */}
                <div
                  className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "max-h-[1200px] opacity-100 pb-8 md:pb-12" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 pt-6">

                    {/* Left Col: Image */}
                    <div className="lg:col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                      <div className="absolute inset-0 bg-black/5 z-10" />
                      <NextImage
                        src={project.image}
                        alt={project.client}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className={`object-cover transition-transform duration-[1.5s] ease-out origin-center ${isOpen ? 'scale-100' : 'scale-110'
                          }`}
                      />
                    </div>

                    {/* Right Col: Details */}
                    <div className="lg:col-span-3 flex flex-col justify-center gap-8 lg:pr-8">
                      {/* Outcome Quote */}
                      <div className="relative">
                        <span className="absolute -top-4 -left-4 text-7xl text-accent/10 font-serif leading-none select-none">"</span>
                        <p className="text-foreground font-light text-xl md:text-2xl leading-relaxed italic relative z-10 pt-2">
                          {project.outcome}
                        </p>
                      </div>

                      <div className="w-full h-px bg-border" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                          <span className="block text-xs tracking-[0.2em] text-accent mb-2 font-medium">Scope</span>
                          <p className="text-foreground font-light text-base">{project.scope}</p>
                        </div>

                        <div>
                          <span className="block text-xs tracking-[0.2em] text-accent mb-2 font-medium">Integrated Solutions</span>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.solutions.split(',').map((sol, i) => (
                              <span key={i} className="px-3 py-1 bg-panel border border-border rounded-full text-xs font-medium text-foreground">
                                {sol.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link
            href="/projects"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base text-white bg-accent border border-accent hover:bg-accent/90 rounded-full transition-all duration-500 overflow-hidden lproj-item shadow-sm hover:shadow-md"
          >
            <span className="relative z-10 flex items-center gap-2 font-medium">
              View all projects
              <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
