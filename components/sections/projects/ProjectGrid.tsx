"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays, Search, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { getApiBaseUrl } from "@/lib/api";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";

const CATEGORIES = ["All Projects", "Residential", "Hospitality", "Commercial", "Restaurant"];

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  date: string;
  readTime: string;
  href: string;
}

function detectCategory(imageUrl?: string | null, title?: string): string {
  const text = `${imageUrl || ""} ${title || ""}`.toLowerCase();
  if (
    text.includes("hospitality") ||
    text.includes("hotel") ||
    text.includes("resort") ||
    text.includes("palace") ||
    text.includes("villas") ||
    text.includes("hyatt") ||
    text.includes("ritz") ||
    text.includes("oberoi") ||
    text.includes("taj") ||
    text.includes("westin") ||
    text.includes("chola")
  ) {
    return "Hospitality";
  }
  if (
    text.includes("restaurant") ||
    text.includes("dining") ||
    text.includes("lounge") ||
    text.includes("akina") ||
    text.includes("nox") ||
    text.includes("rue du liban") ||
    text.includes("thai naam") ||
    text.includes("unico")
  ) {
    return "Restaurant";
  }
  if (
    text.includes("commercial") ||
    text.includes("office") ||
    text.includes("campus") ||
    text.includes("showroom") ||
    text.includes("bank") ||
    text.includes("studio") ||
    text.includes("metro") ||
    text.includes("tiffany") ||
    text.includes("nvidia") ||
    text.includes("meta") ||
    text.includes("ey")
  ) {
    return "Commercial";
  }
  return "Residential";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    fetch(`${getApiBaseUrl()}/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const liveProjects: ProjectItem[] = data.data.map((p: any) => {
            const category = p.type || detectCategory(p.imageUrl, p.title);
            const slug = slugify(p.title) || `project-${p.id}`;
            return {
              id: `project-${p.id}`,
              slug,
              title: p.title,
              category,
              image: p.imageUrl || "/images/projects/residential/anubhav-jain-farmhouse/1.jpg",
              description: p.description,
              date: new Date(p.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              readTime: "4 min read",
              href: `/projects/${slug}`,
            };
          });
          setAllProjects(liveProjects);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch live projects from backend", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Filter projects by category and search
  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "All Projects" ||
      project.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reset to first page when filtering
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
                onClick={() => handleCategoryChange(cat)}
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
            placeholder="Search our work..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full bg-background border border-border rounded-full pl-4 pr-10 py-2.5 text-sm font-light text-foreground focus:outline-none focus:border-accent/50 transition-colors shadow-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
        ) : paginatedProjects.length === 0 ? (
          <div className="col-span-full py-16 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-panel rounded-full flex items-center justify-center mb-4 border border-border">
              <FolderKanban className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-xl font-light text-foreground mb-2">No projects found</h3>
            <p className="text-muted text-sm font-light max-w-md">
              {searchQuery
                ? `No projects matched "${searchQuery}". Try selecting another category or resetting the search.`
                : "No projects in this category yet."}
            </p>
          </div>
        ) : (
          paginatedProjects.map((project) => (
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
                  <span className="tracking-widest text-xs text-foreground font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col grow">
                <h4 className="text-foreground font-light text-lg mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>

                <p className="text-sm text-muted font-light leading-relaxed mb-6 line-clamp-3 grow">
                  {project.description}
                </p>

                {/* Meta & CTA */}
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted font-light">
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
                  View Project
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && !isLoading && (
        <div className="mt-12 flex justify-center w-full">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              &lt; Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={cn(
                    "w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors",
                    currentPage === pageNum
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
