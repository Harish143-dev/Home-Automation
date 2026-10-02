"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getApiBaseUrl } from "@/lib/api";

export function NewsletterSignup() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      try {
        await fetch(`${getApiBaseUrl()}/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Newsletter Subscriber',
            email,
            inquiryType: 'Newsletter',
            message: 'Subscribed to newsletter updates from website'
          })
        });
      } catch (err) {
        console.error("Newsletter submission failed", err);
      }
      setEmail("");
    }
  };

  return (
    <section className="py-12 md:py-16 relative w-full px-6 sm:px-10 lg:px-20 bg-background border-t border-border flex items-center justify-center text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">

        <div className="flex items-center gap-4 overflow-hidden mb-6">
          <div className="h-px w-8 sm:w-12 bg-border" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-muted-foreground">
            Newsletter
          </span>
          <div className="h-px w-8 sm:w-12 bg-border" />
        </div>

        <h2 className=" text-foreground mb-4">
          Stay Ahead of the Curve
        </h2>

        <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed mb-10 max-w-lg">
          Subscribe to our newsletter for the latest insights in architectural automation, product launches, and exclusive project showcases.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="w-full relative max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-border py-4 pl-2 pr-12 text-center text-foreground font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/40"
            />
            <button
              type="submit"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3 text-accent animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-base font-light tracking-wide text-foreground">You've successfully subscribed.</span>
          </div>
        )}

      </div>
    </section>
  );
}
