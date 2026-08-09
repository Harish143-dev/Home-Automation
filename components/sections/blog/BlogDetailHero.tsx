"use client";

import { useRef } from "react";
import NextImage from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BlogPost } from "@/lib/blogData";

interface BlogDetailHeroProps {
  post: BlogPost;
}

export default function BlogDetailHero({ post }: BlogDetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Subtle parallax on the background image
    gsap.to(".detail-hero-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.fromTo(
      ".post-meta-anim",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-[70vh] min-h-[600px] flex justify-end overflow-hidden bg-secondary px-6 sm:px-12 md:px-24 flex-col justify-end"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 detail-hero-bg will-change-transform">
        <NextImage
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 flex flex-col items-start justify-end flex-grow pb-16 md:pb-24 pointer-events-none select-none">
        <div className="post-meta-anim flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs tracking-[0.2em] text-white/70">
          <span className="text-accent">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>{post.readTime}</span>
        </div>
        
        <h1 className="hero-element text-white text-balance mb-6 max-w-4xl">  {post.title}
        </h1>
      </div>
    </section>
  );
}
