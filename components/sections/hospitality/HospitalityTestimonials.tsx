'use client';

import TestimonialV2 from '../../ui/testimonial-v2';

const HOSPITALITY_TESTIMONIALS = [
  {
    name: "Rajiv S.",
    text: "The automated climate and lighting control has drastically reduced our energy costs without compromising guest comfort.",
    role: "General Manager, Luxury Resort"
  },
  {
    name: "Anita M.",
    text: "Integrating the smart systems with our property management software was seamless. Our staff is now much more efficient.",
    role: "Operations Director, Boutique Hotel"
  },
  {
    name: "Vikram K.",
    text: "Guests are consistently amazed by the one-touch room controls. It adds a true premium feel to our executive suites.",
    role: "Hotel Owner, City Center"
  },
  {
    name: "Pooja D.",
    text: "Maintenance requests have dropped significantly since the system proactively alerts us to any HVAC anomalies before guests even notice.",
    role: "Chief Engineer, Heritage Property"
  },
  {
    name: "Sanjay R.",
    text: "The seamless integration of AV and lighting in our conference halls has made hosting corporate events effortlessly impressive.",
    role: "Events Director, Metropolitan Hotel"
  },
  {
    name: "Meera P.",
    text: "The ability to manage multiple properties from a single centralized dashboard gives us unprecedented control and visibility.",
    role: "VP of Operations, Hospitality Group"
  },
  {
    name: "Karan T.",
    text: "Our guests absolutely love the personalized welcome scenes. The automated sheer and blackout blinds are a huge hit.",
    role: "Guest Relations Manager, Resort & Spa"
  },
  {
    name: "Divya N.",
    text: "The return on investment was apparent within the first year, purely from the intelligent energy management in unoccupied rooms.",
    role: "Director of Finance, Luxury Chain"
  }
];

export function HospitalityTestimonials() {
  return (
    <TestimonialV2 
      testimonials={HOSPITALITY_TESTIMONIALS}
      title="What Our Partners Say"
      subtitle="Hospitality Success Stories"
    />
  );
}
