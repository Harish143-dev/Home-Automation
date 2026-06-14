"use client";

import NextImage from "next/image";
import { CalendarDays, Clock, Share2, Mail, Link as LinkIcon } from "lucide-react";
import { BlogPost } from "@/lib/blogData";

interface BlogDetailHeaderProps {
  post: BlogPost;
}

export default function BlogDetailHeader({ post }: BlogDetailHeaderProps) {
  return (
    <div className="w-full flex flex-col gap-6 lg:gap-8 mb-12">
      
      {/* Blog Title Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-wide text-foreground">
          {post.title}
        </h1>
      </div>

      {/* Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-border/50">
        <div className="flex flex-wrap items-center gap-3 text-xs font-light text-muted-foreground">
          <span className="flex items-center gap-1.5 uppercase tracking-widest text-accent">
            {post.category}
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5" />
            Published: {post.date}
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="flex items-center gap-1.5">
            Updated: {post.date}
          </span>
          <span className="hidden sm:inline text-border">•</span>
          <span>By ATPL Team</span>
          <span className="hidden sm:inline text-border">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        {/* Social Share Options */}
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground mr-2">Share</span>
          {[LinkIcon, Mail, Share2].map((Icon, idx) => (
            <button key={idx} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:bg-accent/5 transition-colors">
              <Icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Blog Banner Section */}
      <div className="relative w-full aspect-[16/9] md:aspect-[2/1] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-muted">
        <NextImage
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

    </div>
  );
}
