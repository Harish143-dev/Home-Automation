"use client";

import { Search, Share2, Link as LinkIcon, Mail, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FEATURED_PROJECTS = [
  {
    id: "feat-1",
    title: "Anubhav Jain Farmhouse",
    category: "Residential",
    image: "/images/projects/residential/anubhav-jain-farmhouse/1.jpg",
    href: "/projects/anubhav-jain-farmhouse"
  },
  {
    id: "feat-2",
    title: "Meta Corporate Office",
    category: "Commercial",
    image: "/images/projects/commercial/meta-office-gurgaon/1.jpg",
    href: "/projects/meta-office-gurgaon"
  },
  {
    id: "feat-3",
    title: "Six Senses Fort Barwara",
    category: "Hospitality",
    image: "/images/projects/hospitality/six-senses-barwara/1.jpg",
    href: "/projects/six-senses-fort-barwara"
  },
  {
    id: "feat-4",
    title: "NOX Lounge & Dining",
    category: "Restaurant",
    image: "/images/projects/restaurant/nox-mumbai/1.jpg",
    href: "/projects/nox-lounge-mumbai"
  }
];

const RECENT_PROJECTS = [
  {
    id: "rec-1",
    title: "Tiffany & Co. Flagship",
    date: "Apr 2024",
    image: "/images/projects/commercial/tiffany-mumbai/1.jpg",
    href: "/projects/tiffany-mumbai"
  },
  {
    id: "rec-2",
    title: "Vishal Udani Residence",
    date: "Feb 2024",
    image: "/images/projects/residential/vishal-udani/1.jpg",
    href: "/projects/vishal-udani-residence"
  },
  {
    id: "rec-3",
    title: "Oberoi Amarvilas",
    date: "Jan 2024",
    image: "/images/projects/hospitality/oberoi-amarvillas/1.jpg",
    href: "/projects/oberoi-amarvillas-agra"
  }
];

export function ProjectsSidebar() {
  return (
    <aside className="lg:col-span-3 flex flex-col gap-12 lg:sticky lg:top-32">

      {/* Social Sharing */}
      <div className="bg-transparent border border-border/60 rounded-xl p-6">
        <h4 className=" text-foreground mb-4 flex items-center gap-2">
          Share
        </h4>
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
          <h4 className=" text-foreground">Featured Projects</h4>
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
                <span className="tracking-[0.1em] text-xs text-white/70 mb-1 block">
                  {project.category}
                </span>
                <h4 className=" text-white group-hover:text-accent transition-colors">
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
          <h3 className=" text-foreground">Recent Projects</h3>
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
                <h4 className=" text-foreground line-clamp-2 group-hover:text-accent transition-colors">
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
