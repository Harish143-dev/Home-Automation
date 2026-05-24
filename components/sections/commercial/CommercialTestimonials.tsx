'use client';

import TestimonialV2 from '../../ui/testimonial-v2';

const COMMERCIAL_TESTIMONIALS = [
  {
    name: "Rajesh M.",
    text: "Implementing Anusha's building management system cut our operational energy costs by 30% within the first quarter.",
    role: "Facilities Director, Tech Park"
  },
  {
    name: "Anita S.",
    text: "The centralized control for our multi-floor corporate office is incredibly intuitive. It’s transformed how our IT team manages resources.",
    role: "Operations Head, FinTech HQ"
  },
  {
    name: "Vikram K.",
    text: "From boardroom presentations to building-wide security lockdowns, the automation is robust and flawlessly reliable.",
    role: "CTO, Global Enterprise"
  },
  {
    name: "Meera D.",
    text: "Our boutique hotel guests constantly rave about the smart room features. The unified lighting and climate controls set us apart.",
    role: "General Manager, Luxury Hotel"
  },
  {
    name: "Sanjay P.",
    text: "We wanted a scalable solution for our retail chain. The automated lighting scenes across all our branches have ensured brand consistency.",
    role: "Retail Operations Manager"
  },
  {
    name: "Priya L.",
    text: "The ability to monitor real-time energy usage across our entire campus from a single dashboard is an absolute game-changer.",
    role: "Sustainability Officer"
  }
];

export function CommercialTestimonials() {
  return (
    <TestimonialV2 
      testimonials={COMMERCIAL_TESTIMONIALS}
      title="Trusted by Enterprises"
      subtitle="Client Success Stories"
    />
  );
}
