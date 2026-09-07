"use client";

import { useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/blogData";

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  return (
    <section
      className="py-12 md:py-16 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <h5 className="text-accent !mb-0">
            Continue Reading
          </h5>
          <div className="h-[1px] w-12 bg-border" />
        </div>

        {/* Uniform Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((article) => (
            <Link
              href={`/blog/${article.slug}`}
              key={article.id}
              className="group cursor-pointer flex flex-col gap-6 block"
            >
              {/* Image Wrapper */}
              <div className="relative w-full overflow-hidden rounded-xl aspect-[4/3]">
                <div className="absolute inset-0 will-change-transform">
                  <NextImage
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/5 transition-opacity duration-700 group-hover:opacity-0" />
                </div>
              </div>

              {/* Content Block */}
              <div className="flex flex-col gap-4 pl-2 border-l border-transparent transition-colors duration-500 group-hover:border-accent flex-grow">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <h5 className="text-accent !mb-0">{article.category}</h5>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <h5>{article.date}</h5>
                </div>

                <h3 className=" text-foreground group-hover:text-accent transition-colors duration-500">
                  {article.title}
                </h3>

                <div className="mt-auto pt-2 flex items-center gap-3 text-sm font-light tracking-wide text-foreground opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
