"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";
import { scheduleScrollRefresh } from "@/lib/scrollRefresh";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATIC_OPENINGS = [
  {
    id: "sales-head",
    title: "Sales Head",
    location: "New Delhi, India",
    experience: "5+ Years",
    type: "Full Time",
    description: "We are looking for a strategic leader to drive our business growth and manage client relationships. In this role, you will lead the sales team, identify market opportunities, and oversee commercial strategies for our high-end automation solutions.",
  },
  {
    id: "service-engineer",
    title: "Service Engineer",
    location: "New Delhi, India",
    experience: "2-4 Years",
    type: "Full Time",
    description: "We are seeking a technical professional to manage system maintenance, troubleshooting, and support. In this role, you will work closely with clients to resolve technical issues and ensure the optimal performance of our integrated automation setups.",
  }
];

export default function CareersOpenings() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openings, setOpenings] = useState(STATIC_OPENINGS);

  useEffect(() => {
    fetch(`${getApiBaseUrl()}/careers`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const active = data.data.filter((c: any) => c.isActive !== false);
          if (active.length > 0) {
            setOpenings(active.map((c: any) => ({
              id: String(c.id),
              title: c.title,
              location: c.location || "New Delhi, India",
              experience: "Open Opportunity",
              type: c.type || "Full Time",
              description: c.description
            })));
          }
        }
      })
      .catch(err => {
        console.error("Failed to load live careers, using fallback", err);
      });
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current || !listRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        onRefresh: () => scheduleScrollRefresh(),
      }
    });

    // Animate Header Elements
    const headerElements = gsap.utils.toArray(".co-header-el", headerRef.current);
    tl.fromTo(headerElements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.reveal,
        ease: EASE.reveal,
      }
    );

    // Fade up mobile controls if visible
    const mobileControls = document.querySelector(".co-mobile-controls");
    if (mobileControls) {
      tl.fromTo(mobileControls,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION.normal, ease: EASE.reveal },
        "-=0.4"
      );
    }

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  const scrollNext = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="open-positions"
      ref={sectionRef}
      className="py-16 md:py-24 relative w-full bg-background overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        {/* Header Section with Navigation Buttons */}
        <div ref={headerRef} className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h5 className="co-header-el text-accent mb-4!">
              Openings
            </h5>
            <h2 className=" co-header-el text-foreground">
              Current Openings
            </h2>
            <p className="co-header-el text-sm sm:text-base md:text-lg text-muted font-light leading-relaxed mt-4">
              Explore opportunities to become part of the Anusha team. We are always looking for passionate individuals to drive innovation.
            </p>
          </div>

          {/* Slider Navigation Controls (Desktop) */}
          <div className="co-header-el hidden md:flex items-center gap-4 shrink-0 pb-2">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-sm bg-white"
              aria-label="Previous job"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-sm bg-white"
              aria-label="Next job"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Job Listings Slider (Full bleed right side) */}
      <div className="w-full relative pl-5 sm:pl-8 md:pl-16 lg:pl-24 xl:pl-[calc(50vw-36rem)]">
        <div
          ref={listRef}
          className="flex gap-6 md:gap-8 w-full overflow-x-auto snap-x snap-mandatory pb-8 pr-5 sm:pr-8 md:pr-16 lg:pr-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {openings.map((job) => (
            <div
              key={job.id}
              className="co-card snap-start group relative bg-white rounded-2xl p-8 border border-border shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col w-[85vw] sm:w-[320px] md:w-95 shrink-0 min-h-100"
            >
              <div className="flex-1">
                <h3 className=" text-foreground mb-6">
                  {job.title}
                </h3>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <MapPin className="w-4 h-4 text-accent/70 shrink-0" />
                    <span className="font-light">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Briefcase className="w-4 h-4 text-accent/70 shrink-0" />
                    <span className="font-light">{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Clock className="w-4 h-4 text-accent/70 shrink-0" />
                    <span className="font-light">{job.type}</span>
                  </div>
                </div>

                <p className="text-sm text-muted font-light leading-relaxed line-clamp-3">
                  {job.description}
                </p>
              </div>

              <div className="pt-6 border-t border-border mt-6">
                <Link href="#application-form" className="w-full">
                  <Button variant="interactive" size="lg" className="w-full">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Controls below slider */}
      <div className="co-mobile-controls flex md:hidden items-center justify-center gap-4 mt-4 px-5">
        <button
          onClick={scrollPrev}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-sm bg-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 shadow-sm bg-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
