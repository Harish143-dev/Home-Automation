'use client';

import TestimonialV2 from '../../ui/testimonial-v2';

const RESIDENTIAL_TESTIMONIALS = [
  {
    name: "Vikram S.",
    text: "The lighting control in our living room is absolutely seamless. We love how the mood shifts effortlessly as evening sets in.",
    role: "Homeowner, Mumbai"
  },
  {
    name: "Neha R.",
    text: "Waking up to the shades automatically opening to let in the morning light is a game-changer. It feels like the house is alive.",
    role: "Resident, Delhi"
  },
  {
    name: "Arjun K.",
    text: "The home theater setup is beyond our expectations. The integration of audio, video, and lighting creates a true cinematic experience.",
    role: "Homeowner, Bangalore"
  },
  {
    name: "Priya M.",
    text: "I was initially worried about the complexity, but the interface is so intuitive. Even my parents use the whole-home controls easily.",
    role: "Resident, Hyderabad"
  },
  {
    name: "Rohan D.",
    text: "Having complete control over the climate and security from my phone gives me incredible peace of mind when traveling.",
    role: "Homeowner, Mumbai"
  },
  {
    name: "Aisha T.",
    text: "The customized wellness scenes for our yoga room are perfect. The temperature and lighting adjust exactly how we want them.",
    role: "Resident, Delhi"
  },
  {
    name: "Karan V.",
    text: "We wanted a minimal aesthetic, and the team hid all the technology perfectly. You only see the beautiful keypads.",
    role: "Homeowner, Pune"
  },
  {
    name: "Simran C.",
    text: "The automated energy savings have been fantastic. Our home feels incredibly efficient without us ever having to think about it.",
    role: "Resident, Bangalore"
  }
];

export function ResidentialTestimonials() {
  return (
    <TestimonialV2 
      testimonials={RESIDENTIAL_TESTIMONIALS}
      title="Stories From Our Homes"
      subtitle="Resident Experiences"
    />
  );
}
