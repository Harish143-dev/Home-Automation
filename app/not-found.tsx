import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass, PhoneCall } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 sm:px-12 py-24 text-center relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-accent/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-xl flex flex-col items-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-border" />
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-medium">
            Error 404
          </span>
          <div className="h-px w-8 bg-border" />
        </div>

        {/* Headline */}
        <h1 className="text-foreground text-4xl sm:text-5xl md:text-6xl font-light mb-6 tracking-tight leading-[1.1]">
          Dimension Unfound.
        </h1>

        {/* Description */}
        <p className="text-muted text-base sm:text-lg font-light leading-relaxed mb-10 max-w-md">
          The architectural space or page you are seeking has been moved, reconfigured, or does not exist within our system index.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="accent" size="lg" className="w-full sm:w-auto group">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Return Home
            </Button>
          </Link>

          <Link href="/projects" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Compass className="w-4 h-4 mr-2 text-accent" />
              Explore Projects
            </Button>
          </Link>

          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto text-muted hover:text-foreground">
              <PhoneCall className="w-4 h-4 mr-2" />
              Concierge
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
