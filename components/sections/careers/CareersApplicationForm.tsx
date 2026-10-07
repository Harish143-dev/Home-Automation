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
import { getApiBaseUrl } from "@/lib/api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CareersApplicationForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const { isReady } = useBreakpoint();

  useGSAP(() => {
    // Intentionally leaving out heavy stagger animations on the form
    // to reduce motion fatigue on this page.
  }, { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage("File size exceeds 10MB limit.");
        return;
      }
      setSelectedFile(file);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    
    const formData = new FormData(e.currentTarget);
    const portfolioUrl = formData.get('portfolioUrl') as string;
    const resumeInfo = selectedFile 
      ? `File: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`
      : portfolioUrl || 'Submitted via web form';

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || null,
      experience: formData.get('experience') as string,
      position: formData.get('position') as string,
      message: (formData.get('message') as string) || null,
      resumeUrl: resumeInfo,
    };
    
    try {
      const res = await fetch(`${getApiBaseUrl()}/career-applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json().catch(() => null);

      if (res.ok) {
        setIsSubmitted(true);
        setSelectedFile(null);
        e.currentTarget.reset();
        setTimeout(() => setIsSubmitted(false), 6000);
      } else {
        setErrorMessage(result?.error || 'Unable to submit application. Please check your information and try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error. Please try again or reach out directly to careers@atsmartliving.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="application-form"
      className="py-16 md:py-24 relative w-full px-6 sm:px-8 md:px-16 lg:px-24 bg-background overflow-hidden scroll-mt-28"
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h5 className="ca-el text-accent mb-6!">
          Apply Now
        </h5>
        <h2 className=" ca-el text-foreground mb-6">
          Don't See the Right Opportunity?
        </h2>
        <p className="ca-el text-sm sm:text-base md:text-lg text-muted font-light leading-relaxed mb-12 md:mb-16 max-w-2xl">
          We're always looking for talented professionals who are passionate about technology and design. Upload your resume or share your portfolio, and our recruitment team will reach out.
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="ca-el w-full bg-panel rounded-3xl p-8 md:p-12 shadow-sm border border-border flex flex-col gap-6 text-left"
        >
          {errorMessage && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium tracking-wide text-foreground/80">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
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
                name="email"
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
                name="phone"
                className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="experience" className="text-sm font-medium tracking-wide text-foreground/80">Experience *</label>
              <select
                id="experience"
                name="experience"
                required
                defaultValue=""
                className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light appearance-none"
              >
                <option value="" disabled className="text-muted">Select Experience</option>
                <option value="Fresher" className="bg-background">Fresher</option>
                <option value="1-3 Years" className="bg-background">1-3 Years</option>
                <option value="3-5 Years" className="bg-background">3-5 Years</option>
                <option value="5+ Years" className="bg-background">5+ Years</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="position" className="text-sm font-medium tracking-wide text-foreground/80">Position Interested In *</label>
            <input
              type="text"
              id="position"
              name="position"
              required
              className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50"
              placeholder="e.g. Automation Engineer, UI Designer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium tracking-wide text-foreground/80">Message / Cover Letter</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50 resize-none"
              placeholder="Tell us a bit about yourself and why you'd like to join AT Smart Living..."
            />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-sm font-medium tracking-wide text-foreground/80">Resume Upload or Document</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center text-center hover:border-accent/50 hover:bg-accent/5 transition-all cursor-pointer group"
            >
              <UploadCloud className="w-8 h-8 text-muted mb-3 group-hover:text-accent transition-colors" />
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm font-medium text-accent">{selectedFile.name}</p>
                  <p className="text-xs text-muted font-light mt-1">{(selectedFile.size / 1024).toFixed(1)} KB — Click to change file</p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-foreground mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs font-light text-muted">PDF, DOC, DOCX up to 10MB</p>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="portfolioUrl" className="text-sm font-medium tracking-wide text-foreground/80">Portfolio or LinkedIn URL (Optional)</label>
            <input
              type="url"
              id="portfolioUrl"
              name="portfolioUrl"
              className="w-full bg-transparent border-b border-border py-3 px-1 text-foreground focus:outline-none focus:border-accent transition-colors font-light placeholder:text-muted/50"
              placeholder="https://linkedin.com/in/... or drive link"
            />
          </div>

          <div className="pt-6 flex justify-center md:justify-end">
            <Button
              type="submit"
              variant="interactive"
              size="xl"
              disabled={isSubmitting || isSubmitted}
              className="w-full md:w-auto disabled:opacity-70"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : isSubmitted ? (
                <>
                  <span>Application Sent</span>
                  <CheckCircle2 className="ml-2 w-5 h-5" />
                </>
              ) : (
                <span>Submit Application</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
