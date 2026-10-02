"use client";

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background hover:bg-foreground/90 shadow-sm",
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm",
        accent:
          "bg-accent text-white hover:bg-accent-soft shadow-sm active:scale-95",
        outline:
          "border-border bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-foreground",
        ghost:
          "bg-transparent hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground",
        glass:
          "bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/20 shadow-sm active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        link:
          "text-foreground underline-offset-4 hover:underline hover:text-accent bg-transparent p-0 h-auto",
        interactive:
          "group/btn bg-accent hover:bg-transparent relative w-auto cursor-pointer overflow-hidden border border-accent p-2 px-6 text-center tracking-wide",
        shiny:
          "relative bg-white/10 text-white border border-white/20 backdrop-blur-md transition-shadow duration-300 ease-in-out hover:bg-white/20 hover:shadow-md active:scale-95 overflow-hidden",
        green:
          "bg-[#2A3222] text-[#F1EBD9] hover:bg-[#3B4434] shadow-sm",
      },
      size: {
        default: "h-11 px-6 py-2 text-[15px]",
        xs: "h-7 px-3 text-xs",
        sm: "h-9 px-4 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "size-11",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-xl",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  }
)

const Button = React.forwardRef<HTMLButtonElement, ButtonPrimitive.Props & VariantProps<typeof buttonVariants>>((
  { className, variant = "default", size = "default", shape = "default", children, ...props },
  ref
) => {

  const internalRef = React.useRef<HTMLButtonElement>(null);

  const setRefs = React.useCallback(
    (node: HTMLButtonElement) => {
      internalRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }
    },
    [ref]
  );

  useGSAP(() => {
    // Only handling interactive scale animation if needed, shiny is pure CSS now
  }, { dependencies: [variant] });

  // Custom DOM structure for the interactive hover button
  if (variant === "interactive") {
    return (
      <ButtonPrimitive
        ref={setRefs}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, shape, className }))}
        {...props}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="bg-background h-2 w-2 rounded-full transition-all duration-500 group-hover/btn:scale-[100] origin-center z-0" />
          <span className="relative z-10 inline-block transition-all duration-300 group-hover/btn:translate-x-12 group-hover/btn:opacity-0 text-white font-medium">
            {children}
          </span>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 opacity-0 translate-x-12 transition-all duration-300 group-hover/btn:-translate-x-1 group-hover/btn:opacity-100 text-accent font-medium">
          <span>{children}</span>
          <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </div>
      </ButtonPrimitive>
    )
  }
  
  // Custom DOM structure for the glassy shiny button
  if (variant === "shiny") {
    return (
      <ButtonPrimitive
        ref={setRefs}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, shape, className }), "group")}
        {...props}
      >
        <span
          className="relative z-10 flex h-full w-full items-center justify-center tracking-wide inherit-text-color"
        >
          {children}
        </span>
        <span
          className="absolute inset-0 z-20 block rounded-[inherit] pointer-events-none overflow-hidden"
          style={{
            padding: "1px",
            mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            WebkitMask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
          }}
        >
          <span className="absolute inset-0 block h-full w-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] skew-x-[-20deg] transition-transform duration-[1200ms] ease-in-out group-hover:translate-x-[150%]" />
        </span>
      </ButtonPrimitive>
    )
  }

  // Default DOM structure for all other button variants
  return (
    <ButtonPrimitive
      ref={setRefs}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, shape, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }
