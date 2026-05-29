"use client";

import React, { useState, useRef } from "react";
import { gsap, useGSAP } from "../../../lib/gsapSetup";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

// Types
type Tier = "basic" | "advanced" | "premium";
type Currency = "USD" | "EUR";

interface TierData {
  name: string;
  savingsPercent: number;
  costPerRoom: number;
}

const TIERS: Record<Tier, TierData> = {
  basic: { name: "Basic", savingsPercent: 0.15, costPerRoom: 600 },
  advanced: { name: "Advanced", savingsPercent: 0.30, costPerRoom: 1500 },
  premium: { name: "Premium", savingsPercent: 0.40, costPerRoom: 2500 }
};

const ROOM_OPTIONS = [50, 100, 250, 500, 1000];
const BILL_OPTIONS = [5000, 10000, 25000, 50000, 100000];

export function CommercialRoiCalculator() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // State
  const [currency, setCurrency] = useState<Currency>("USD");
  const [rooms, setRooms] = useState<number>(100);
  const [monthlyBill, setMonthlyBill] = useState<number>(10000);
  const [selectedTier, setSelectedTier] = useState<Tier>("advanced");

  const currencySymbol = currency === "USD" ? "$" : "€";

  // Calculations
  const tier = TIERS[selectedTier];
  const annualEnergySpend = monthlyBill * 12;
  const annualSavings = annualEnergySpend * tier.savingsPercent;
  const totalInvestment = rooms * tier.costPerRoom;
  const paybackYears = annualSavings > 0 ? totalInvestment / annualSavings : 0;
  const roi5Year = totalInvestment > 0 ? (((annualSavings * 5) - totalInvestment) / totalInvestment) * 100 : 0;

  // Refs for animated big number
  const savingsRef = useRef<HTMLSpanElement>(null);

  // Animations
  useGSAP(
    () => {
      if (!containerRef.current || prefersReducedMotion) return;

      const elements = containerRef.current.querySelectorAll(".animate-item");
      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          }
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  useGSAP(() => {
    if (prefersReducedMotion || !savingsRef.current) return;

    gsap.to(savingsRef.current, {
      innerHTML: Math.round(annualSavings),
      duration: 1,
      ease: "power2.out",
      snap: { innerHTML: 1 },
      onUpdate: function () {
        if (savingsRef.current) {
          savingsRef.current.innerHTML = currencySymbol + Number(this.targets()[0].innerHTML).toLocaleString();
        }
      }
    });
  }, { scope: containerRef, dependencies: [annualSavings, currency, prefersReducedMotion] });

  // Helper for formatting bills in the buttons
  const formatBillOption = (val: number) => {
    return val >= 1000 ? `${currencySymbol}${val / 1000}k` : `${currencySymbol}${val}`;
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background py-24 sm:py-32 text-foreground flex justify-center"
    >
      <div className="max-w-4xl w-full mx-6 px-6 sm:px-12 py-12 bg-surface-darker rounded-[32px] border border-white/5 shadow-2xl">

        {/* Header Title */}
        <div className="animate-item text-center mb-10 border-b border-white/5 pb-6">
          <h2 className="text-2xl font-medium tracking-wide">ROI Calculator</h2>
        </div>

        {/* Currency Toggle */}
        <div className="animate-item flex flex-col items-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted font-mono">
            <CheckCircle2 className="w-4 h-4 text-accent" /> Currency
          </div>
          <div className="flex p-1 bg-black/20 rounded-full border border-white/5">
            <button
              onClick={() => setCurrency("USD")}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                currency === "USD" ? "bg-white text-black" : "text-muted hover:text-white"
              )}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency("EUR")}
              className={clsx(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                currency === "EUR" ? "bg-white text-black" : "text-muted hover:text-white"
              )}
            >
              EUR (€)
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="animate-item grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">

          {/* Rooms */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted font-mono">
              <CheckCircle2 className="w-4 h-4 text-accent" /> Number of Rooms
            </div>
            <div className="flex flex-wrap gap-2">
              {ROOM_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRooms(opt)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300",
                    rooms === opt
                      ? "border-accent text-accent bg-accent/10"
                      : "border-white/10 text-muted hover:border-white/30 hover:text-white"
                  )}
                >
                  {opt}{opt === 1000 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Bill */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted font-mono">
              <CheckCircle2 className="w-4 h-4 text-accent" /> Monthly Energy Bill
            </div>
            <div className="flex flex-wrap gap-2">
              {BILL_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setMonthlyBill(opt)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300",
                    monthlyBill === opt
                      ? "border-accent text-accent bg-accent/10"
                      : "border-white/10 text-muted hover:border-white/30 hover:text-white"
                  )}
                >
                  {formatBillOption(opt)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Full width Tier row */}
        <div className="animate-item flex flex-col gap-4 mb-16 pb-12 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted font-mono">
            <CheckCircle2 className="w-4 h-4 text-accent" /> Automation Package
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.entries(TIERS) as [Tier, TierData][]).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedTier(key)}
                className={clsx(
                  "flex-1 min-w-[140px] px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-300",
                  selectedTier === key
                    ? "border-accent text-accent bg-accent/10"
                    : "border-white/10 text-muted hover:border-white/30 hover:text-white"
                )}
              >
                {data.name}
              </button>
            ))}
          </div>
        </div>

        {/* Big Result Section */}
        <div className="animate-item flex flex-col items-center text-center gap-2">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted mb-2">
            Opportunity Cost This Year
          </h3>
          <div className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1]">
            You're leaving <br className="sm:hidden" />
            <span ref={savingsRef} className="text-accent mx-2 block sm:inline mt-2 sm:mt-0">
              {currencySymbol}{annualSavings.toLocaleString()}
            </span>
            <br className="sm:hidden" /> on the table.
          </div>

          <p className="text-muted text-sm max-w-2xl mt-8 leading-relaxed">
            At a {tier.savingsPercent * 100}% energy savings rate on a {currencySymbol}{monthlyBill.toLocaleString()} monthly bill.
            That's {currencySymbol}{(annualSavings * 5).toLocaleString()} in savings over 5 years.
            With an estimated initial investment of {currencySymbol}{totalInvestment.toLocaleString()},
            the system pays for itself in roughly <span className="text-accent font-medium">{paybackYears.toFixed(1)} years</span>,
            yielding a 5-year ROI of <span className="text-accent font-medium">{roi5Year.toFixed(0)}%</span>.
          </p>
        </div>

      </div>
    </section>
  );
}
