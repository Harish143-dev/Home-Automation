"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CATEGORIES = [
  "All Insights",
  "Smart Living",
  "Lighting Design",
  "Home Automation",
  "Hospitality",
  "Architectural Technology"
];

export default function BlogCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All Insights");

  useGSAP(() => {
    gsap.fromTo(
      ".category-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 w-full bg-background text-foreground px-6 sm:px-12 md:px-24"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap gap-x-8 gap-y-4">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="category-item group relative text-sm md:text-base font-light tracking-wide transition-colors duration-300"
            >
              <span className={isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}>
                {category}
              </span>
              
              {/* Subtle underline for active state */}
              <div 
                className={`absolute -bottom-2 left-0 h-[1px] bg-accent transition-all duration-500 ease-out ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'}`} 
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
