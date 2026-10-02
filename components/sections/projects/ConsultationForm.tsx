"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

export function ConsultationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      inquiryType: 'Consultation',
      message: formData.get('message') as string,
    };
    
    try {
      const res = await fetch(`${getApiBaseUrl()}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-16 relative w-full px-6 sm:px-10 lg:px-20 bg-background border-t border-border">
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* Text Content */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 overflow-hidden mb-6">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground">
              Expert Guidance
            </span>
            <div className="h-px w-12 bg-border" />
          </div>

          <h2 className=" text-foreground mb-6 text-balance">
            Get a Free Consultation for Your Space.
          </h2>

          <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed max-w-lg mb-10">
            Our automation architects will review your floor plans, understand your lifestyle requirements, and propose a bespoke technology framework tailored specifically to your project.
          </p>

          <div className="flex flex-col gap-4">
            {[
              "Personalized technology design roadmap",
              "Comprehensive Bill of Quantities (BOQ)",
              "Acoustic and lighting design consultation"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-sm font-light text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-transparent border border-border/60 rounded-2xl p-8 md:p-12 shadow-sm">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-[11px] tracking-widest text-muted-foreground">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:ring-0 focus:border-accent transition-colors placeholder:text-muted-foreground/30 shadow-none"
                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', boxShadow: 'none' }}
                    placeholder="John"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-[11px] tracking-widest text-muted-foreground">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:ring-0 focus:border-accent transition-colors placeholder:text-muted-foreground/30 shadow-none"
                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', boxShadow: 'none' }}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[11px] tracking-widest text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:ring-0 focus:border-accent transition-colors placeholder:text-muted-foreground/30 shadow-none"
                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', boxShadow: 'none' }}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[11px] tracking-widest text-muted-foreground">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:ring-0 focus:border-accent transition-colors placeholder:text-muted-foreground/30 shadow-none"
                    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', boxShadow: 'none' }}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="message" className="text-[11px] tracking-widest text-muted-foreground">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground font-light focus:outline-none focus:ring-0 focus:border-accent transition-colors placeholder:text-muted-foreground/30 resize-none shadow-none"
                  style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', boxShadow: 'none' }}
                  placeholder="Tell us a bit about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 group flex items-center justify-center gap-3 bg-foreground text-background py-4 px-8 rounded-full font-medium tracking-wide hover:bg-accent hover:text-white transition-all duration-300 w-full md:w-max disabled:opacity-70"
              >
                {isSubmitting ? 'Sending...' : 'Request Consultation'}
                {!isSubmitting && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 px-6 h-full">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className=" text-foreground mb-4">Request Received</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Thank you for reaching out. One of our system architects will be in touch with you shortly to schedule your consultation.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
