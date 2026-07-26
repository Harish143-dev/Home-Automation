"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { EASE, DURATION, STAGGER } from "@/lib/animation.config";
import { Button } from "@/components/ui/button";
import { ArrowRight, UploadCloud, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CareersApplicationForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    if (!isReady || prefersReducedMotion || !sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    const elements = gsap.utils.toArray(".ca-el", sectionRef.current);
    tl.fromTo(elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: DURATION.normal,
        stagger: STAGGER.reveal,
        ease: EASE.reveal,
      }
    );

  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative w-full px-6 sm:px-8 md:px-16 lg:px-24 bg-background overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="ca-el inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-6">
          Apply Now
        </span>
        <h2 className="ca-el text-foreground mb-6">
          Don't See the Right Opportunity?
        </h2>
        <p className="ca-el text-sm sm:text-base md:text-lg text-muted font-light leading-relaxed mb-12 md:mb-16 max-w-2xl">
          We're always looking for talented professionals who are passionate about technology and design. Upload your resume, and we'll contact you when a suitable role becomes available.
        </p>

        <form 
          ref={formRef} 
          onSubmit={handleSubmit}
          className="ca-el w-full bg-panel rounded-3xl p-8 md:p-12 shadow-sm border border-border flex flex-col gap-6 text-left"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium tracking-wide text-foreground/80">Name *</label>
              <input 
                type="text" 
                id="name" 
                required 
                className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium tracking-wide text-foreground/80">Email *</label>
              <input 
                type="email" 
                id="email" 
                required 
                className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium tracking-wide text-foreground/80">Phone</label>
              <input 
                type="tel" 
                id="phone" 
                className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="experience" className="text-sm font-medium tracking-wide text-foreground/80">Experience *</label>
              <select 
                id="experience" 
                required 
                defaultValue=""
                className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light appearance-none"
              >
                <option value="" disabled className="text-muted">Select Experience</option>
                <option value="fresher" className="bg-background">Fresher</option>
                <option value="1-3" className="bg-background">1-3 Years</option>
                <option value="3-5" className="bg-background">3-5 Years</option>
                <option value="5+" className="bg-background">5+ Years</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="position" className="text-sm font-medium tracking-wide text-foreground/80">Position Interested In *</label>
            <input 
              type="text" 
              id="position" 
              required 
              className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50"
              placeholder="e.g. Automation Engineer, UI Designer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium tracking-wide text-foreground/80">Message / Cover Letter</label>
            <textarea 
              id="message" 
              rows={4}
              className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50 resize-none"
              placeholder="Tell us a bit about yourself and why you'd like to join Anusha..."
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-sm font-medium tracking-wide text-foreground/80">Resume Upload *</label>
            <div className="w-full border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer group">
              <UploadCloud className="w-8 h-8 text-muted mb-4 group-hover:text-accent transition-colors" />
              <p className="text-sm font-medium text-foreground mb-1">Click to upload or drag and drop</p>
              <p className="text-xs font-light text-muted">PDF, DOCX up to 10MB</p>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </div>
          </div>

          <div className="pt-6 flex justify-center md:justify-end">
            <Button 
              type="submit"
              variant="interactive"
              size="xl"
              disabled={isSubmitted}
              className="w-full md:w-auto"
            >
              {isSubmitted ? (
                <>
                  <span>Application Sent</span>
                  <CheckCircle2 className="ml-2 w-5 h-5" />
                </>
              ) : (
                <span>Submit Resume</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
