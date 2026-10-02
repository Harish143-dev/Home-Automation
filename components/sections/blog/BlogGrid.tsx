"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BLOG_POSTS, FEATURED_POST } from "@/lib/blogData";
import { getApiBaseUrl } from "@/lib/api";

const CATEGORIES = ["All Categories", "Smart Living", "Hospitality", "Home Automation", "Lighting Design"];

const ALL_POSTS = [FEATURED_POST, ...BLOG_POSTS].map((post, i) => ({
  ...post,
  id: `grid-post-${i}`,
  author: "ATPL Team"
}));

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState(ALL_POSTS);

  useEffect(() => {
    fetch(`${getApiBaseUrl()}/blogs`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const liveBlogs = data.data.map((b: any) => {
            const slug = b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `post-${b.id}`;
            const plain = b.content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
            return {
              id: `db-blog-${b.id}`,
              slug: slug,
              category: "Smart Living",
              date: new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              title: b.title,
              excerpt: plain.slice(0, 140) + '...',
              image: "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
              readTime: `${Math.max(2, Math.ceil(plain.split(/\s+/).length / 200))} Min Read`,
              content: b.content,
              author: b.author || "ATPL Team"
            };
          });
          setArticles(liveBlogs);
        }
      })
      .catch(err => {
        console.error("Failed to load live blogs, using fallback", err);
      });
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "All Categories" || article.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !searchQuery || 
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
        {filteredArticles.map((article) => (
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
              />
              <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-black/10">
                <span className="mb-0! text-[8px]! text-foreground">
                  {article.category}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col grow">
              <h4 className=" text-foreground mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300">
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
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center w-full">
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="px-3 sm:px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50" disabled>
            &lt; Previous
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
            <button
              key={page}
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
