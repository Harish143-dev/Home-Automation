"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const METRICS = [
  {
    value: "20+",
    label: "Years of Intelligent Automation",
    description: "Designing and engineering premium control systems since our founding.",
  },
  {
    value: "1000+",
    label: "Premium Installations Across India",
    description: "Delivering uncompromising quality to luxury residences and hospitality brands.",
  },
  {
    value: "15",
    label: "Cities with Active Projects",
    description: "Expanding the boundaries of architectural technology nationwide.",
  }
];

export default function LegacyExpertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".metric-item",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 80%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative w-full bg-background text-foreground px-6 sm:px-12 md:px-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {METRICS.map((metric, index) => (
            <div key={index} className="metric-item flex flex-col items-start gap-4">
              <span className="text-6xl lg:text-8xl font-light tracking-wide text-foreground">
                {metric.value}
              </span>
              <div className="h-[1px] w-full bg-border mt-4 mb-2" />
              <h3 className="text-foreground">
                {metric.label}
              </h3>
              <p className="text-sm md:text-base font-light text-muted-foreground mt-2 max-w-sm">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
