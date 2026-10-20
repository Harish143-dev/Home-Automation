"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getApiBaseUrl } from "@/lib/api";
import { BlogItem, transformBackendBlog } from "@/lib/blogUtils";

interface BlogDetailSidebarProps {
  currentPostId?: string;
}

export default function BlogDetailSidebar({ currentPostId }: BlogDetailSidebarProps) {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let isMounted = true;
    fetch(`${getApiBaseUrl()}/blogs`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.data)) {
          setBlogs(data.data.map(transformBackendBlog));
        }
      })
      .catch((err) => {
        console.error("Failed to load sidebar blogs", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const otherBlogs = blogs.filter((b) => b.id !== currentPostId);
  const featuredBlogs = otherBlogs.slice(0, 2);
  const recentBlogs = otherBlogs.slice(2, 5);

  const categories = [
    "All Categories",
    ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))),
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <aside className="lg:col-span-3 flex flex-col gap-10 lg:sticky lg:top-32">
      {/* Search Widget */}
      <div className="bg-transparent border border-border/60 rounded-xl p-6">
        <h4 className="text-foreground mb-4 flex items-center gap-2">Search</h4>
        <form onSubmit={handleSearchSubmit} className="relative group">
          <input
            type="text"
            placeholder="Keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-lg pl-4 pr-10 py-3 text-sm font-light text-foreground focus:outline-none focus:border-accent/50 transition-colors shadow-sm"
          />
          <button type="submit" aria-label="Search">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
          </button>
        </form>
      </div>

      {/* Categories Dropdown/List */}
      {categories.length > 1 && (
        <div className="bg-transparent border border-border/60 rounded-xl p-6">
          <h4 className="text-foreground mb-4 flex items-center gap-2">
            Categories
          </h4>
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value !== "All Categories") {
                  router.push(`/blog?category=${encodeURIComponent(e.target.value)}`);
                } else {
                  router.push(`/blog`);
                }
              }}
              className="w-full appearance-none bg-background border border-border rounded-lg px-4 py-3 text-sm font-light text-foreground focus:outline-none focus:border-accent/50 transition-colors shadow-sm cursor-pointer"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      )}

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h4 className="text-foreground">Featured Blogs</h4>
            <div className="h-[1px] flex-grow bg-border" />
          </div>
          <div className="flex flex-col gap-6">
            {featuredBlogs.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group relative w-full aspect-16/9 rounded-xl overflow-hidden block border border-border/50"
              >
                <NextImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h4 className="text-white group-hover:text-accent transition-colors line-clamp-2 text-sm font-medium leading-snug">
                    {post.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Blogs */}
      {recentBlogs.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h4 className="text-foreground">Recent Blogs</h4>
            <div className="h-[1px] flex-grow bg-border" />
          </div>
          <div className="flex flex-col gap-5">
            {recentBlogs.map((post) => (
              <div
                key={post.id}
                className="group flex flex-col gap-2 hover:bg-accent/5 p-4 -ml-4 rounded-xl transition-colors border border-transparent hover:border-border/50"
              >
                <h4 className="text-foreground line-clamp-2 transition-colors font-light text-base">
                  {post.title}
                </h4>
                <p className="text-xs font-light text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-accent text-xs font-medium tracking-widest hover:underline mt-1"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
