'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger } from '../../lib/gsapSetup';
import { Quote } from 'lucide-react';

interface Testimonial {
  text: string;
  name: string;
  role?: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "DFI",
    text: "The experience centre and all the technology installed here is very cool, thanks for inviting us. It was a lovely experience.",
  },
  {
    name: "Fabinteriors",
    text: "I am very impressed with the experience center and think that the way automation is shown by their team makes it easier and even entertaining for customers to understand the options today, I wish them all the best.",
  },
  {
    name: "QDP",
    text: "The experience centre tour was very informative and energizing. We enjoyed everything that was shown to us, we surely would like to connect with ATPL and look forward to work with them.",
  },
  {
    name: "Design Matrix",
    text: "We are happy with the performance of the lighting control system and the services provided by ATPL.",
  },
  {
    name: "Apeejay Surrendra",
    text: "I am already working with the company from last 13 years. This experience center will make the difference in their profile.",
  },
  {
    name: "Sanjeet Bhasin",
    text: "The team has been extremely proactive and patient with the handover. They’ve always send their team whenever and wherever the support is needed. There are still some teething issues, but we’ve always managed to seek their support - they’ve maintained great relationships and post installation services are on point.",
  },
  {
    name: "Ujjwal Munjal",
    role: "Hero",
    text: "We’ve consistently received prompt, efficient support from Anusha—every query was handled swiftly and professionally. Paras, in particular, demonstrated exceptional patience and flexibility, going the extra mile to accommodate our requests. I’m truly grateful for such dedicated and supportive service.",
  },
  {
    name: "Abhimanyu Dalal",
    role: "ADA",
    text: "We are happy with the performance of the lighting control system and the services provided by ATPL.",
  },
  {
    name: "Rajan Mittal",
    role: "Airtel",
    text: "Overall Performance was very Good.",
  },
  {
    name: "Kanav Mehra",
    role: "Jaguar",
    text: "Thorough Presentation and involvement in the project. Always Supportive for site issues. Great and timely installation of the whole project.",
  }
];

const firstColumn = [TESTIMONIALS[0], TESTIMONIALS[1], TESTIMONIALS[2], TESTIMONIALS[3]];
const secondColumn = [TESTIMONIALS[4], TESTIMONIALS[5], TESTIMONIALS[6]];
const thirdColumn = [TESTIMONIALS[7], TESTIMONIALS[8], TESTIMONIALS[9]];

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
              {props.testimonials.map(({ text, name, role }, i) => (
                <li
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  className="relative p-8 rounded-3xl border border-border shadow-lg shadow-black/5 max-w-xs w-full bg-panel backdrop-blur-xl transition-all duration-500 ease-out cursor-default select-none group hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-accent/30"
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-foreground/5 rotate-180 pointer-events-none transition-colors duration-500 group-hover:text-accent/10" />
                  <blockquote className="m-0 p-0 relative z-10">
                    <p className="text-muted leading-relaxed font-medium m-0 transition-colors duration-300">
                      &quot;{text}&quot;
                    </p>
                    <footer className="flex items-center gap-4 mt-8">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent font-bold text-lg ring-2 ring-border group-hover:ring-accent/30 transition-all duration-300 ease-in-out shrink-0">
                        {name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-foreground transition-colors duration-300">
                          {name}
                        </cite>
                        {role && (
                          <span className="text-xs font-medium leading-5 tracking-tight text-muted mt-0.5 transition-colors duration-300">
                            {role}
                          </span>
                        )}
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

export interface TestimonialV2Props {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

export default function TestimonialV2({
  testimonials = TESTIMONIALS,
  title = "What Our Clients Say",
  subtitle = "Client Experiences"
}: TestimonialV2Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Distribute testimonials evenly across 3 columns
  const firstColumn = testimonials.filter((_, i) => i % 3 === 0);
  const secondColumn = testimonials.filter((_, i) => i % 3 === 1);
  const thirdColumn = testimonials.filter((_, i) => i % 3 === 2);

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
      className="bg-[#fcfcfc] py-24 relative overflow-hidden border-t border-black/[0.03]"
    >
      <div
        ref={contentRef}
        className="container px-4 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto mb-16">


          <h2 id="testimonials-heading" className="text-foreground text-center">
            {title}
          </h2>
        </div>

        <div
          className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[600px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={35} />
          {secondColumn.length > 0 && <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={40} />}
          {thirdColumn.length > 0 && <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />}
        </div>
      </div>
    </section>
  );
}
