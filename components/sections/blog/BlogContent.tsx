"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { BlogPost } from "@/lib/blogData";

interface BlogContentProps {
  post: BlogPost;
}

export default function BlogContent({ post }: BlogContentProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-background text-foreground py-24 md:py-32 px-6 sm:px-12 md:px-24"
    >
      <div className="max-w-3xl mx-auto prose-anim text-lg md:text-xl font-light leading-relaxed text-muted-foreground">
        {/* We use standard styling for the raw HTML content injected from the mock data */}
        <div 
          className="[&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-light [&>h2]:tracking-wide [&>h2]:text-foreground [&>h2]:mt-16 [&>h2]:mb-6 [&>p]:mb-8 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </section>
  );
}
