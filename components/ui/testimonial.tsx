import * as React from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/lib/gsapSetup";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number | string;
  name: string;
  description: string;
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  showArrows?: boolean;
  showDots?: boolean;
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { className, testimonials, showArrows = true, showDots = true, ...props },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Provide a combined ref
    const setRefs = React.useCallback(
      (node: HTMLDivElement) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement>).current = node;
        }
      },
      [ref]
    );

    const dragStartX = React.useRef<number | null>(null);
    const isDragging = React.useRef(false);

    const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useGSAP(
      () => {
        if (!containerRef.current) return;
        const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card", containerRef.current);
        if (!cards.length) return;

        // Apply GSAP properties based on whether they are current, prev, next
        testimonials.forEach((_, index) => {
          const card = containerRef.current?.querySelector(`[data-index="${index}"]`) as HTMLElement;
          if (!card) return;

          const isCurrent = index === currentIndex;
          const isPrev = index === (currentIndex + 1) % testimonials.length;

          if (isCurrent) {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              y: 0,
              rotate: 0,
              zIndex: 3,
              duration: 0.5,
              ease: "back.out(1.2)",
              pointerEvents: "auto",
            });
          } else if (isPrev) {
            gsap.to(card, {
              scale: 0.95,
              opacity: 0.6,
              y: 8,
              rotate: -2,
              zIndex: 2,
              duration: 0.5,
              ease: "back.out(1.2)",
              pointerEvents: "none",
            });
          } else {
            // Further back
            gsap.to(card, {
              scale: 0.9,
              opacity: 0,
              y: 16,
              rotate: -4,
              zIndex: 1,
              duration: 0.5,
              ease: "power2.out",
              pointerEvents: "none",
            });
          }
        });
      },
      { scope: containerRef, dependencies: [currentIndex, testimonials] }
    );

    // Pointer Event Handlers for simple dragging
    const onPointerDown = (e: React.PointerEvent) => {
      isDragging.current = true;
      dragStartX.current = e.clientX;
    };

    const onPointerMove = (e: React.PointerEvent) => {
      if (!isDragging.current || dragStartX.current === null) return;

      const currentCard = containerRef.current?.querySelector(`[data-index="${currentIndex}"]`) as HTMLElement;
      if (!currentCard) return;

      const deltaX = e.clientX - dragStartX.current;
      gsap.to(currentCard, { x: deltaX, rotate: deltaX / 20, duration: 0.1, ease: "power1.out" });
    };

    const onPointerUp = (e: React.PointerEvent) => {
      if (!isDragging.current || dragStartX.current === null) return;
      isDragging.current = false;

      const deltaX = e.clientX - dragStartX.current;
      const currentCard = containerRef.current?.querySelector(`[data-index="${currentIndex}"]`) as HTMLElement;

      dragStartX.current = null;

      if (Math.abs(deltaX) > 100) {
        // Swipe away!
        if (currentCard) {
          gsap.to(currentCard, {
            x: deltaX > 0 ? 300 : -300,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              // Reset X immediately when hidden
              gsap.set(currentCard, { x: 0 });
              if (deltaX > 0) handlePrev();
              else handleNext();
            }
          });
        }
      } else {
        // Snap back
        if (currentCard) {
          gsap.to(currentCard, { x: 0, rotate: 0, duration: 0.4, ease: "back.out(1.5)" });
        }
      }
    };

    const onPointerLeave = (e: React.PointerEvent) => {
      if (isDragging.current) onPointerUp(e);
    };

    return (
      <div
        ref={setRefs}
        className={cn("h-[400px] w-full flex items-center justify-center", className)}
        {...props}
      >
        <div className="relative w-full max-w-sm h-80">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-index={index}
              onPointerDown={index === currentIndex ? onPointerDown : undefined}
              onPointerMove={index === currentIndex ? onPointerMove : undefined}
              onPointerUp={index === currentIndex ? onPointerUp : undefined}
              onPointerLeave={index === currentIndex ? onPointerLeave : undefined}
              className={cn(
                "testimonial-card absolute inset-0 rounded-2xl",
                "bg-card text-card-foreground border border-border shadow-2xl flex flex-col justify-between",
                index === currentIndex ? "cursor-grab active:cursor-grabbing" : ""
              )}
              style={{
                userSelect: "none",
                touchAction: "none"
              }}
            >
              {showArrows && index === currentIndex && (
                <div className="absolute inset-x-0 top-4 flex justify-between px-4 z-20">
                  <div
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center cursor-pointer hover:bg-accent transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-background" />
                  </div>
                  <div
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="w-8 h-8 rounded-full bg-accent/80 flex items-center justify-center cursor-pointer hover:bg-accent transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-background" />
                  </div>
                </div>
              )}

              <div className="p-8 flex flex-col items-center gap-6 text-center h-full pt-12">

                <p className="text-sm md:text-base text-muted-foreground font-medium italic leading-relaxed pointer-events-none select-none">
                  "{testimonial.description}"
                </p>
                <div className="mt-auto pointer-events-none select-none">
                  <h4 className="text-card-foreground">
                    {testimonial.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}

          {showDots && (
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer",
                    index === currentIndex
                      ? "bg-accent scale-110"
                      : "bg-muted hover:bg-muted-foreground"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);
TestimonialCarousel.displayName = "TestimonialCarousel";

export { TestimonialCarousel, type Testimonial };
