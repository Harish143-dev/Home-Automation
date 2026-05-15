'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsapSetup';
import { Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "James Carter",
    role: "Owner, The Glass Pavilion",
    text: "The level of integration is entirely invisible until you need it. The home anticipates our needs flawlessly.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sarah Lin",
    role: "Director, Aura Hotel",
    text: "Our guests demand absolute perfection, and this system delivers. It has redefined our standard for luxury.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Michael Torres",
    role: "Lead Architect",
    text: "From a design perspective, we never had to compromise. The environmental automation is simply brilliant.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Emma Richardson",
    role: "Resident",
    text: "The predictive HVAC and robust security perimeter give us absolute peace of mind. Truly exceptional.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "David Kelling",
    role: "GM, Lumina Resort",
    text: "The choreographed lighting seamlessly guides our guests. It creates an ambient, emotional connection.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Elena Rostova",
    role: "Interior Designer",
    text: "Integrating technology used to mean compromising aesthetics. This system proves otherwise. It's invisible and powerful.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  }
];

const firstColumn = [TESTIMONIALS[0], TESTIMONIALS[1]];
const secondColumn = [TESTIMONIALS[2], TESTIMONIALS[3]];
const thirdColumn = [TESTIMONIALS[4], TESTIMONIALS[5]];

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const columnRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (!columnRef.current) return;
    
    // Create infinite scrolling loop
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(columnRef.current, {
      yPercent: -50,
      ease: "none",
      duration: props.duration || 15
    });

    // Pause on hover
    const handleMouseEnter = () => tl.pause();
    const handleMouseLeave = () => tl.play();

    columnRef.current.addEventListener('mouseenter', handleMouseEnter);
    columnRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      columnRef.current?.removeEventListener('mouseenter', handleMouseEnter);
      columnRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: columnRef });

  return (
    <div className={props.className}>
      <ul
        ref={columnRef}
        className="flex flex-col gap-6 pb-6 list-none m-0 p-0 will-change-transform"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  className="relative p-10 rounded-3xl border border-border shadow-lg shadow-black/5 max-w-xs w-full bg-panel backdrop-blur-xl transition-all duration-500 ease-out cursor-default select-none group hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-accent/30" 
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-foreground/5 rotate-180 pointer-events-none transition-colors duration-500 group-hover:text-accent/10" />
                  <blockquote className="m-0 p-0 relative z-10">
                    <p className="text-muted leading-relaxed font-medium m-0 transition-colors duration-300">
                      &quot;{text}&quot;
                    </p>
                    <footer className="flex items-center gap-4 mt-8">
                      <img
                        width={48}
                        height={48}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-border group-hover:ring-accent/30 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-foreground transition-colors duration-300">
                          {name}
                        </cite>
                        <span className="text-xs font-medium leading-5 tracking-tight text-muted mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </li>
              ))}
            </React.Fragment>
          )),
        ]}
      </ul>
    </div>
  );
};

export default function TestimonialV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!contentRef.current) return;
    
    gsap.fromTo(contentRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="bg-background py-24 relative overflow-hidden"
    >
      <div 
        ref={contentRef}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="border border-border py-1.5 px-5 rounded-full text-xs font-bold tracking-[0.2em] uppercase text-accent bg-accent/5 backdrop-blur-sm">
              Client Experiences
            </div>
          </div>

          <h2 id="testimonials-heading" className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-center text-foreground leading-[1.1]">
            What Our Clients Say
          </h2>
          <p className="text-center mt-6 text-muted text-lg leading-relaxed max-w-md">
            Real experiences from homeowners, hospitality brands, and businesses who transformed their spaces.
          </p>
        </div>

        <div 
          className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[600px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={30} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={22} />
        </div>
      </div>
    </section>
  );
}
