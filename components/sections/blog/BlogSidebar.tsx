"use client";

import { Search, Share2, Link as LinkIcon, Mail } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { BLOG_POSTS, FEATURED_POST } from "@/lib/blogData";

export default function BlogSidebar() {
  const featuredBlogs = [FEATURED_POST, BLOG_POSTS[0]].filter(Boolean);
  const latestArticles = BLOG_POSTS.slice(1, 4);

  return (
    <aside className="lg:col-span-3 flex flex-col gap-12 lg:sticky lg:top-32">

      {/* Social Sharing Icons */}
      <div className="bg-transparent border border-border/60 rounded-xl p-6">
        <h3 className=" text-foreground mb-4 flex items-center gap-2">
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

      {/* Featured Blogs */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h3 className=" text-foreground">Featured Blogs</h3>
          <div className="h-[1px] flex-grow bg-border" />
        </div>
        <div className="flex flex-col gap-6">
          {featuredBlogs.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
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
                <h5 className="!text-[10px] text-white/70 mb-1 block">
                  {post.category}
                </h5>
                <h4 className="text-white text-sm font-medium leading-snug group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Latest Articles */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <h3 className=" text-foreground">Latest Articles</h3>
          <div className="h-[1px] flex-grow bg-border" />
        </div>
        <div className="flex flex-col gap-5">
          {latestArticles.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group flex items-center gap-4 hover:bg-muted/30 p-2 -ml-2 rounded-lg transition-colors"
            >
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-border/50">
                <NextImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <h4 className=" text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h4>
                <span className="text-xs text-muted-foreground font-light mt-1">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </aside>
  );
}
