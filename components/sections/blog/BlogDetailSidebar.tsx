"use client";

import { Search, ChevronDown } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { BLOG_POSTS, FEATURED_POST } from "@/lib/blogData";

export default function BlogDetailSidebar() {
  // Demo data for the sidebar
  const featuredBlogs = [FEATURED_POST, BLOG_POSTS[0]].filter(Boolean);
  const recentBlogs = BLOG_POSTS.slice(1, 4);
  const categories = ["All Categories", "Smart Living", "Hospitality", "Home Automation", "Lighting Design"];

  return (
    <aside className="lg:col-span-3 flex flex-col gap-10 lg:sticky lg:top-32">

      {/* Search Widget */}
      <div className="bg-transparent border border-border/60 rounded-xl p-6">
        <h4 className=" text-foreground mb-4 flex items-center gap-2">
          Search
        </h4>
        <div className="relative group">
          <input
            type="text"
            placeholder="Keywords..."
            className="w-full bg-background border border-border rounded-lg pl-4 pr-10 py-3 text-sm font-light text-foreground focus:outline-none focus:border-accent/50 transition-colors shadow-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
        </div>
      </div>

      {/* Categories Dropdown/List */}
      <div className="bg-transparent border border-border/60 rounded-xl p-6">
        <h4 className=" text-foreground mb-4 flex items-center gap-2">
          Categories
        </h4>
        <div className="relative">
          <select className="w-full appearance-none bg-background border border-border rounded-lg px-4 py-3 text-sm font-light text-foreground focus:outline-none focus:border-accent/50 transition-colors shadow-sm cursor-pointer">
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Featured Blogs */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h4 className=" text-foreground">Featured Blogs</h4>
          <div className="h-[1px] flex-grow bg-border" />
        </div>
        <div className="flex flex-col gap-6">
          {featuredBlogs.map((post, idx) => (
            <Link
              href={`/blog/${post.slug}`}
              key={`feat-${idx}`}
              className="group relative w-full aspect-[16/9] rounded-xl overflow-hidden block border border-border/50"
            >
              <NextImage
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-4">
                <h4 className=" text-white group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Blogs */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h4 className=" text-foreground">Recent Blogs</h4>
          <div className="h-[1px] flex-grow bg-border" />
        </div>
        <div className="flex flex-col gap-5">
          {recentBlogs.map((post, idx) => (
            <div key={`rec-${idx}`} className="group flex flex-col gap-2 hover:bg-accent/5 p-4 -ml-4 rounded-xl transition-colors border border-transparent hover:border-border/50">
              <h4 className=" text-foreground line-clamp-2 transition-colors">
                {post.title}
              </h4>
              <p className="text-xs font-light text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
              <Link href={`/blog/${post.slug}`} className="text-accent text-xs font-medium tracking-widest hover:underline mt-1">
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}
