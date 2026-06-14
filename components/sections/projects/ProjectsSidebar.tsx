"use client";

import { Search, Share2, Link as LinkIcon, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FEATURED_PROJECTS = [
  {
    id: "feat-1",
    title: "The Horizon Estate",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400",
    href: "/projects/horizon-estate"
  },
  {
    id: "feat-2",
    title: "Lumina Corporate HQ",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
    href: "/projects/lumina-hq"
  },
  {
    id: "feat-3",
    title: "Azure Resort & Spa",
    category: "Hospitality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400",
    href: "/projects/azure-resort"
  }
];

const RECENT_PROJECTS = [
  {
    id: "rec-1",
    title: "Penthouse 42",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=200",
    href: "/projects/penthouse-42"
  },
  {
    id: "rec-2",
    title: "Silicon Valley Campus",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=200",
    href: "/projects/silicon-valley"
  },
  {
    id: "rec-3",
    title: "The Glass House",
    date: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=200",
    href: "/projects/glass-house"
  }
];

export function ProjectsSidebar() {
  return (
    <aside className="lg:col-span-3 flex flex-col gap-12 lg:sticky lg:top-32">
      
      {/* Social Sharing */}
      <div className="bg-transparent border border-border/60 rounded-xl p-6">
        <h3 className="text-sm tracking-widest uppercase text-foreground mb-4 flex items-center gap-2">
          Share
        </h3>
        <div className="flex items-center gap-3">
          {[
            { icon: LinkIcon, href: "#" },
            { icon: Mail, href: "#" },
            { icon: Share2, href: "#" },
          ].map((social, idx) => (
            <Link 
              key={idx} 
              href={social.href}
              className="w-10 h-10 rounded-full border border-border bg-background shadow-sm flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-300"
            >
              <social.icon className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-sm tracking-widest uppercase text-foreground">Featured Projects</h3>
          <div className="h-[1px] flex-grow bg-border" />
        </div>
        <div className="flex flex-col gap-6">
          {FEATURED_PROJECTS.map((project) => (
            <Link 
              href={project.href} 
              key={project.id}
              className="group relative w-full aspect-[16/9] rounded-xl overflow-hidden block"
            >
              <Image 
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-4">
                <span className="text-[10px] tracking-widest uppercase text-white/70 mb-1 block">
                  {project.category}
                </span>
                <h4 className="text-white font-light text-lg tracking-wide group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h3 className="text-sm tracking-widest uppercase text-foreground">Recent Projects</h3>
          <div className="h-[1px] flex-grow bg-border" />
        </div>
        <div className="flex flex-col gap-5">
          {RECENT_PROJECTS.map((project) => (
            <Link 
              href={project.href} 
              key={project.id}
              className="group flex items-center gap-4 hover:bg-muted/30 p-2 -ml-2 rounded-lg transition-colors"
            >
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-foreground font-light text-base tracking-wide line-clamp-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                <span className="text-xs text-muted-foreground font-light mt-1">
                  {project.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
}
