"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays, Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { getApiBaseUrl } from "@/lib/api";
import { BlogCardSkeleton } from "@/components/ui/skeleton";
import { BlogItem, transformBackendBlog } from "@/lib/blogUtils";

const BASE_CATEGORIES = ["All Categories", "Smart Living", "Hospitality", "Home Automation", "Lighting Design"];

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetch(`${getApiBaseUrl()}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.data)) {
          const liveBlogs = data.data.map(transformBackendBlog);
          setArticles(liveBlogs);
        } else {
          setArticles([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load backend blogs:", err);
        if (isMounted) {
          setArticles([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute available categories dynamically from backend blogs + base categories
  const dynamicCategories = Array.from(
    new Set([
      ...BASE_CATEGORIES,
      ...articles.map((a) => a.category).filter(Boolean),
    ])
  );

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "All Categories" ||
      article.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.author && article.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="lg:col-span-9 flex flex-col gap-10">
      {/* Filters & Search */}
      <div className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b border-border pb-4">
        {/* Category Pills */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {dynamicCategories.map((cat) => (
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
        <div className="relative group w-full xl:w-auto xl:min-w-70 shrink-0">
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border border-border/80 rounded-full pl-4 pr-10 py-2.5 text-sm font-light text-foreground focus:outline-none focus:border-accent transition-colors"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <Link
              href={`/blog/${article.slug}`}
              key={article.id}
              className="group flex flex-col bg-background border border-border/50 rounded-xl overflow-hidden hover:border-border transition-colors duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-4/3 overflow-hidden bg-muted">
                <NextImage
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-black/10">
                  <span className="mb-0 text-[10px] text-foreground font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex flex-col grow">
                <h4 className="text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300 font-light text-xl">
                  {article.title}
                </h4>

                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 line-clamp-3 grow">
                  {article.excerpt}
                </p>

                {/* Meta & CTA */}
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-light w-full flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="hidden sm:inline text-border">•</span>
                    <span>By {article.author}</span>
                    <span className="hidden sm:inline text-border">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent transition-colors duration-300">
                  Read more
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center border border-border/50 rounded-2xl p-8 bg-panel/30">
            <BookOpen className="w-10 h-10 text-muted-foreground/40 mb-3" />
            <h4 className="text-foreground text-lg mb-2">No Blog Posts Found</h4>
            <p className="text-sm text-muted-foreground font-light max-w-md">
              {searchQuery || activeCategory !== "All Categories"
                ? "No articles matched your search or category filter. Try clearing filters or searching for different keywords."
                : "No articles have been published yet in the backend. New articles will appear here automatically."}
            </p>
          </div>
        )}
      </div>

      {/* Pagination (only when multiple pages exist) */}
      {!isLoading && filteredArticles.length > 9 && (
        <div className="mt-12 flex justify-center w-full">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              className="px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              disabled
            >
              &lt; Previous
            </button>
            <button className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-foreground text-background">
              1
            </button>
            <button
              className="px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              disabled
            >
              Next &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
