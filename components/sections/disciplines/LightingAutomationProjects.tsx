"use client";

import { useRef, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { Plus, Minus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    id: "bkt-farm",
    client: "BKT Farms",
    location: "Mumbai",
    scope: "Comprehensive Lighting Automation",
    solutions: "Landscape Lighting, Zoned Lighting Control, Smart Keypads, Integration",
    outcome: "A sprawling luxury estate featuring seamless lighting control across expansive indoor and outdoor spaces, creating the perfect ambience at all times.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
  },
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
  }
];

export function LightingAutomationProjects() {
  const [openId, setOpenId] = useState<string | null>(PROJECTS[0].id);
  const prefersReducedMotion = useReducedMotion();

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
    setTimeout(() => {
      scheduleScrollRefresh();
    }, 450);
  };

  return (
    <section
      className="py-16 md:py-24 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-4 font-light">
            Featured Work
          </span>
          <h2 className="text-foreground mb-6">
            Lighting Automation Projects
          </h2>
          <p className="text-muted-foreground font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover how we have transformed prestigious residences and properties across India with intelligent, beautifully integrated lighting automation solutions.
          </p>
        </div>

        {/* Accordion List */}
        <div className="w-full flex flex-col border-t border-black/5">
          {PROJECTS.map((project) => {
            const isOpen = openId === project.id;

            return (
              <div
                key={project.id}
                className="flex flex-col border-b border-black/5 transition-colors duration-300 hover:bg-black/[0.02]"
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
                    <div className={`flex items-center gap-1.5 transition-colors ${isOpen ? 'text-accent/70' : 'text-muted-foreground'}`}>
                      <MapPin className="text-xl sm:text-2xl lg:text-3xl w-4 h-4" />
                      <span className="text-sm md:text-base tracking-wider">{project.location}</span>
                    </div>
                  </div>

                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ml-4 ${isOpen ? 'border-accent bg-accent text-white rotate-180 scale-110' : 'border-black/10 bg-panel text-foreground group-hover:border-accent group-hover:text-accent'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* Content (Expandable) */}
                <div
                  className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 pb-8 md:pb-12 pt-4">

                      {/* Left Col: Image */}
                      <div className="lg:col-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                        <div className="absolute inset-0 bg-black/5 z-10 pointer-events-none" />
                        <NextImage
                          src={project.image}
                          alt={project.client}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className={`object-cover transition-transform duration-[1.5s] ease-out origin-center ${isOpen ? 'scale-100' : 'scale-110'}`}
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

                        <div className="w-full h-px bg-black/5" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                          <div>
                            <span className="block text-xs tracking-[0.2em] text-accent mb-3">Scope</span>
                            <p className="text-foreground font-light text-base">{project.scope}</p>
                          </div>

                          <div>
                            <span className="block text-xs tracking-[0.2em] text-accent mb-3">Integrated Solutions</span>
                            <div className="flex flex-wrap gap-2">
                              {project.solutions.split(',').map((sol, i) => (
                                <span key={i} className="px-3 py-1 bg-panel border border-black/5 rounded-full text-sm font-light text-foreground shadow-sm">
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
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link href="/projects" className="inline-block">
            <Button variant="interactive" size="lg">
              View all projects
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
