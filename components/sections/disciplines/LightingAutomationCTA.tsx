"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LightingAutomationCTA() {
  return (
    <section
      className="py-24 md:py-32 relative w-full px-5 sm:px-8 md:px-16 lg:px-24 bg-panel text-foreground overflow-hidden border-t border-black/5"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        
        <div className="flex flex-col items-center">
          <span className="inline-block text-sm md:text-base tracking-[0.3em] text-accent mb-6 font-light">
            Start Your Project
          </span>
          
          <h2 className="text-foreground mb-8 text-balance">
            Ready to Make Your Space More Intelligent?
          </h2>
          
          <p className="text-muted-foreground font-light text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
            Whether you're automating a luxury residence, hospitality environment, or commercial space, our experts can design a lighting solution around your requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="interactive" size="lg" className="w-full sm:w-auto">
                Talk to a Lighting Automation Expert
              </Button>
            </Link>
            
            <Link href="/contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-black/20 hover:bg-black/5">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
