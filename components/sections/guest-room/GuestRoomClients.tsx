import React from 'react';

const HOSPITALITY_BRANDS = [
  'ITC', 'Marriott', 'Four Seasons', 'Taj', 'Hilton', 'Hyatt', 'Oberoi', 'IHG'
];

export function GuestRoomClients() {
  return (
    <section className="py-12 md:py-16 relative w-full bg-background px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl w-full mx-auto">
        <div className="w-full bg-accent/[0.03] border border-accent/10 rounded-[2rem] py-12 md:py-16 overflow-hidden flex flex-col items-center">
          <span className="tracking-[0.2em] text-accent mb-8 md:mb-12 text-sm font-medium">
            Trusted Hospitality Brands
          </span>
          <div className="w-[150%] md:w-[120%] flex overflow-hidden opacity-80 group">
            <div className="flex gap-16 md:gap-24 items-center whitespace-nowrap animate-marquee-left">
              {[...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS, ...HOSPITALITY_BRANDS].map((brand, i) => (
                <span key={i} className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-foreground hover:text-accent transition-colors duration-300">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-left {
          animation: marquee-left 30s linear infinite;
        }
        .group:hover .animate-marquee-left {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
