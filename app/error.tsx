"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[SmartHome OS] Client Runtime Error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 sm:px-12 py-24 text-center relative overflow-hidden">
      <div className="max-w-lg flex flex-col items-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-border" />
          <span className="text-xs tracking-[0.3em] uppercase text-destructive font-medium">
            System Notice
          </span>
          <div className="h-px w-8 bg-border" />
        </div>

        <h2 className="text-foreground text-3xl sm:text-4xl font-light mb-4 leading-tight">
          An Unexpected Exception Occurred.
        </h2>

        <p className="text-muted text-sm sm:text-base font-light leading-relaxed mb-8">
          The smart interface encountered an unexpected state while loading this view. You can reload the component or return to the main dashboard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button
            variant="accent"
            size="lg"
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reload Interface
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
