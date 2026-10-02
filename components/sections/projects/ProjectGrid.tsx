"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { getApiBaseUrl } from "@/lib/api";

const CATEGORIES = ["All Projects", "Residential", "Commercial", "Hospitality", "Automotive", "Marine"];

const DUMMY_PROJECTS = Array.from({ length: 9 }).map((_, i) => ({
  id: `project-${i + 1}`,
  title: [
    "The Horizon Estate",
    "Lumina Corporate HQ",
    "Azure Resort & Spa",
    "Penthouse 42",
    "Silicon Valley Campus",
    "The Glass House",
    "Metro Tower Residences",
    "Alpine Retreat",
    "Coastal Villa Automation"
  ][i],
  category: ["Residential", "Commercial", "Hospitality"][i % 3],
  image: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
  ][i],
  description: "A comprehensive smart automation ecosystem integrating advanced lighting, climate control, and predictive security.",
  date: "Oct 12, 2023",
  readTime: "4 min read",
  href: "/projects/details"
}));

export function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [allProjects, setAllProjects] = useState(DUMMY_PROJECTS);

  useEffect(() => {
    fetch(`${getApiBaseUrl()}/projects`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const liveProjects = data.data.map((p: any) => ({
            id: `db-project-${p.id}`,
            title: p.title,
            category: "Residential",
            image: p.imageUrl || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
            description: p.description,
            date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            readTime: "3 min read",
            href: "/residential"
          }));
          // Prepend live database projects to the catalogue
          setAllProjects([...liveProjects, ...DUMMY_PROJECTS]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch live projects, using fallback", err);
      });
  }, []);

  const filteredProjects = allProjects.filter(project => {
    const matchesCategory = activeCategory === "All Projects" || project.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !searchQuery || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="lg:col-span-9 flex flex-col gap-10">

      {/* Filters & Search */}
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-4">

        {/* Category Pills */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 md:gap-4 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                  activeCategory === cat
                    ? "bg-accent text-white border-accent"
                    : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Widget */}
        <div className="relative group w-full lg:w-auto lg:min-w-65 shrink-0">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-full pl-4 pr-10 py-2.5 text-sm font-light text-foreground focus:outline-none focus:border-accent/50 transition-colors shadow-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <Link
            href={project.href}
            key={project.id}
            className="group flex flex-col bg-background border border-border/50 rounded-xl overflow-hidden hover:border-border transition-colors duration-300"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-4/3 overflow-hidden bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="tracking-widest text-xs text-foreground">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col grow">
              <h4 className=" text-foreground mb-3 line-clamp-2">
                {project.title}
              </h4>

              <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 line-clamp-3 grow">
                {project.description}
              </p>

              {/* Meta & CTA */}
              <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-light">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {project.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {project.readTime}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-300">
                Read full study
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center w-full">
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50" disabled>
            &lt; Previous
          </button>
          {[1, 2, 3, 4, '...', 8].map((page, i) => (
            <button
              key={i}
              className={cn(
                "w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors",
                page === 1
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {page}
            </button>
          ))}
          <button className="px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Next &gt;
          </button>
        </div>
      </div>

    </div>
  );
}
