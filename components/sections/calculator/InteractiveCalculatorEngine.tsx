'use client';

import React, { useState, useId, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Home,
  Building2,
  Hotel,
  Zap,
  Sliders,
  DollarSign,
  TrendingDown,
  Percent,
  Clock,
  Download,
  PhoneCall,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  ShieldCheck,
  Sun,
  Flame,
  Power
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CalculatorType } from './ChooseCalculatorSection';
import { gsap, useGSAP } from '@/lib/gsapSetup';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Currency = 'INR' | 'USD' | 'EUR' | 'AED';

interface CurrencyConfig {
  symbol: string;
  rate: number; // Multiplier relative to INR
  format: (val: number) => string;
}

const CURRENCIES: Record<Currency, CurrencyConfig> = {
  INR: {
    symbol: '₹',
    rate: 1,
    format: (val) => `₹${Math.round(val).toLocaleString('en-IN')}`,
  },
  USD: {
    symbol: '$',
    rate: 1 / 85,
    format: (val) => `$${Math.round(val).toLocaleString('en-US')}`,
  },
  EUR: {
    symbol: '€',
    rate: 1 / 92,
    format: (val) => `€${Math.round(val).toLocaleString('en-US')}`,
  },
  AED: {
    symbol: 'AED ',
    rate: 1 / 23,
    format: (val) => `AED ${Math.round(val).toLocaleString('en-US')}`,
  },
};

// Automation Systems in Step 2
interface SystemOption {
  id: string;
  name: string;
  description: string;
  techDetail: string;
  icon: React.ComponentType<{ className?: string }>;
  contributionPercent: number; // typical share of total savings
}

const SYSTEMS: SystemOption[] = [
  {
    id: 'lighting',
    name: 'Intelligent Architectural Lighting',
    description: 'Astronomical timeclock scheduling, automated dimming, daylight harvesting & occupancy-based scenes.',
    techDetail: 'DALI-2 / 0-10V protocols with Lutron & KNX',
    icon: Sun,
    contributionPercent: 0.28,
  },
  {
    id: 'hvac',
    name: 'Smart HVAC & Climate Automation',
    description: 'Occupancy-triggered temperature setbacks, motorized zone control & VRV/VRF centralized logic.',
    techDetail: 'BACnet / Modbus integration with active sensors',
    icon: Flame,
    contributionPercent: 0.42,
  },
  {
    id: 'shades',
    name: 'Motorized Architectural Shades',
    description: 'Solar angle tracking to reject thermal radiation while preserving natural daylight and sightlines.',
    techDetail: 'Lutron Sivoia / Somfy ultra-quiet motors',
    icon: Layers,
    contributionPercent: 0.16,
  },
  {
    id: 'energy',
    name: 'Energy Management & Smart Circuits',
    description: 'Automated cutoff of vampire loads, real-time circuit sub-metering & vacant-zone master isolation.',
    techDetail: 'CT-clamp smart sub-metering & power relays',
    icon: Power,
    contributionPercent: 0.14,
  },
];

interface InteractiveCalculatorEngineProps {
  activeCalculator: CalculatorType;
  onChangeCalculator: (type: CalculatorType) => void;
}

export function InteractiveCalculatorEngine({
  activeCalculator,
  onChangeCalculator,
}: InteractiveCalculatorEngineProps) {
  const containerRef = useRef<HTMLElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Currencies
  const [currency, setCurrency] = useState<Currency>('INR');
  const currencyConf = CURRENCIES[currency];

  // Property configuration state
  // Smart Home
  const [homeSize, setHomeSize] = useState<'medium' | 'large' | 'estate' | 'mansion'>('large');
  const [homeMonthlyBill, setHomeMonthlyBill] = useState<number>(65000); // INR baseline
  
  // Office
  const [officeArea, setOfficeArea] = useState<number>(25000); // sq ft
  const [officeHours, setOfficeHours] = useState<'10h' | '16h' | '24h'>('10h');
  const [officeMonthlyBill, setOfficeMonthlyBill] = useState<number>(350000); // INR baseline

  // Hotel
  const [hotelRooms, setHotelRooms] = useState<number>(120);
  const [hotelTier, setHotelTier] = useState<'boutique' | '4star' | '5star'>('5star');
  const [hotelMonthlyBill, setHotelMonthlyBill] = useState<number>(850000); // INR baseline

  // Systems selected
  const [selectedSystems, setSelectedSystems] = useState<string[]>([
    'lighting',
    'hvac',
    'shades',
    'energy',
  ]);

  // Lead Modal / Report Download state
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState<boolean>(false);
  const [leadName, setLeadName] = useState('');
  const [leadContact, setLeadContact] = useState('');
  const [leadCity, setLeadCity] = useState('');

  // Toggle system selection
  const toggleSystem = (id: string) => {
    setSelectedSystems((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // At least one system must remain
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Base monthly spend in INR for active calculator
  const activeMonthlyBillINR =
    activeCalculator === 'home'
      ? homeMonthlyBill
      : activeCalculator === 'office'
      ? officeMonthlyBill
      : hotelMonthlyBill;

  // Active Monthly Bill converted to current currency
  const activeMonthlySpend = activeMonthlyBillINR * currencyConf.rate;
  const activeAnnualSpend = activeMonthlySpend * 12;

  // Calculate dynamic savings percentage based on selected systems & type
  let baseSavingsRate = 0.08; // Baseline minimum
  selectedSystems.forEach((sysId) => {
    const sys = SYSTEMS.find((s) => s.id === sysId);
    if (sys) {
      if (activeCalculator === 'home') {
        if (sysId === 'hvac') baseSavingsRate += 0.14;
        if (sysId === 'lighting') baseSavingsRate += 0.09;
        if (sysId === 'shades') baseSavingsRate += 0.05;
        if (sysId === 'energy') baseSavingsRate += 0.04;
      } else if (activeCalculator === 'office') {
        if (sysId === 'hvac') baseSavingsRate += 0.16;
        if (sysId === 'lighting') baseSavingsRate += 0.11;
        if (sysId === 'shades') baseSavingsRate += 0.04;
        if (sysId === 'energy') baseSavingsRate += 0.05;
      } else {
        // Hotel
        if (sysId === 'hvac') baseSavingsRate += 0.18;
        if (sysId === 'lighting') baseSavingsRate += 0.08;
        if (sysId === 'shades') baseSavingsRate += 0.05;
        if (sysId === 'energy') baseSavingsRate += 0.05;
      }
    }
  });

  // Cap at realistic maximum 38% - 42%
  const effectiveSavingsRate = Math.min(baseSavingsRate, 0.40);
  const effectiveSavingsPercentage = Math.round(effectiveSavingsRate * 100);

  // Annual and monthly cost savings
  const annualCostSavings = activeAnnualSpend * effectiveSavingsRate;
  const monthlyCostSavings = annualCostSavings / 12;

  // Estimated implementation investment
  let estimatedInvestment = 0;
  if (activeCalculator === 'home') {
    const sizeMultiplier = homeSize === 'medium' ? 1 : homeSize === 'large' ? 1.6 : homeSize === 'estate' ? 2.5 : 4.0;
    estimatedInvestment = (annualCostSavings * 2.8) * (selectedSystems.length / 4);
  } else if (activeCalculator === 'office') {
    estimatedInvestment = (annualCostSavings * 2.4) * (selectedSystems.length / 4);
  } else {
    estimatedInvestment = (annualCostSavings * 2.2) * (selectedSystems.length / 4);
  }

  // Payback period in years
  const paybackYears = annualCostSavings > 0 ? (estimatedInvestment / annualCostSavings) : 2.5;
  const fiveYearGrossSavings = annualCostSavings * 5;
  const fiveYearNetRoi = estimatedInvestment > 0 ? (((fiveYearGrossSavings - estimatedInvestment) / estimatedInvestment) * 100) : 100;

  // Category specific metrics
  const hotelSavingsPerRoom = activeCalculator === 'hotel' ? (annualCostSavings / Math.max(1, hotelRooms)) : 0;
  const officeSavingsPerSqFt = activeCalculator === 'office' ? (annualCostSavings / Math.max(1, officeArea)) : 0;

  // System contribution distribution
  const totalSystemWeights = selectedSystems.reduce((acc, sysId) => {
    const s = SYSTEMS.find((x) => x.id === sysId);
    return acc + (s ? s.contributionPercent : 0.25);
  }, 0);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadFormSubmitted(true);
    setTimeout(() => {
      // Keep state open with thank-you note
    }, 400);
  };

  const resetLeadForm = () => {
    setLeadFormSubmitted(false);
    setShowReportModal(false);
    setLeadName('');
    setLeadContact('');
    setLeadCity('');
  };

  return (
    <section
      ref={containerRef}
      id="calculator-tool"
      className="py-16 md:py-24 relative w-full bg-background text-foreground"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        
        {/* Top Header & Property Type Switcher */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-12">
          
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-black/20" />
            <span className="tracking-[0.3em] text-xs sm:text-sm uppercase text-accent font-light">
              Interactive Feasibility Tool
            </span>
            <div className="h-[1px] w-8 bg-black/20" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.2] tracking-wide text-foreground mb-4">
            {activeCalculator === 'home' && 'Smart Home Energy Savings Calculator'}
            {activeCalculator === 'office' && 'Office Automation Cost Savings Calculator'}
            {activeCalculator === 'hotel' && 'Hotel Energy & Cost Savings Calculator'}
          </h2>

          <p className="font-light text-base sm:text-lg leading-relaxed text-muted max-w-2xl mb-8">
            Adjust property parameters, choose automation subsystems, and inspect live indicative savings.
          </p>

          {/* Master Tabs: Home / Office / Hotel */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-black/[0.04] rounded-full border border-border/80 shadow-inner mb-6">
            <button
              onClick={() => onChangeCalculator('home')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCalculator === 'home'
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Home className="w-4 h-4 text-accent" />
              Smart Home / Villa
            </button>

            <button
              onClick={() => onChangeCalculator('office')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCalculator === 'office'
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Building2 className="w-4 h-4 text-accent" />
              Office / Commercial
            </button>

            <button
              onClick={() => onChangeCalculator('hotel')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCalculator === 'hotel'
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              <Hotel className="w-4 h-4 text-accent" />
              Hotel / Resort
            </button>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted">
            <span className="font-light">Currency:</span>
            <div className="inline-flex p-1 bg-black/[0.04] rounded-lg border border-border/60">
              {(Object.keys(CURRENCIES) as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                    currency === c
                      ? 'bg-white text-foreground shadow-xs'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Calculator Architecture: Left (Inputs Step 1 & 2) | Right (Step 3 Results Dashboard) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: STEP 1 & STEP 2 INPUTS */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* STEP 1: Tell Us About Your Project */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/80">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-semibold">
                    1
                  </span>
                  <h3 className="font-light text-xl sm:text-2xl tracking-wide text-foreground">
                    Tell Us About Your Project
                  </h3>
                </div>
                <span className="text-xs text-muted font-light">Property Profile</span>
              </div>

              {/* HOME INPUTS */}
              {activeCalculator === 'home' && (
                <div className="space-y-6">
                  {/* Property Scale */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted font-medium mb-3">
                      Property Configuration
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'medium', label: '3 BHK', sqft: '2,500 sq ft', defaultBill: 35000 },
                        { id: 'large', label: '4 BHK', sqft: '4,500 sq ft', defaultBill: 65000 },
                        { id: 'estate', label: '5+ BHK', sqft: '7,500 sq ft', defaultBill: 120000 },
                        { id: 'mansion', label: 'Luxury Villa', sqft: '12,000+ sq ft', defaultBill: 220000 },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setHomeSize(item.id as any);
                            setHomeMonthlyBill(item.defaultBill);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                            homeSize === item.id
                              ? 'border-accent bg-accent/5 ring-1 ring-accent'
                              : 'border-border hover:border-black/20'
                          }`}
                        >
                          <span className="block text-sm font-medium text-foreground">{item.label}</span>
                          <span className="block text-xs text-muted font-light mt-0.5">{item.sqft}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Energy Bill */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                        Current Monthly Electricity Bill
                      </label>
                      <span className="text-base font-medium text-accent">
                        {currencyConf.format(homeMonthlyBill * currencyConf.rate)} / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min={15000}
                      max={400000}
                      step={5000}
                      value={homeMonthlyBill}
                      onChange={(e) => setHomeMonthlyBill(Number(e.target.value))}
                      className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />

                    {/* Quick Preset Buttons */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {[30000, 60000, 100000, 180000, 300000].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setHomeMonthlyBill(preset)}
                          className={`px-3 py-1 rounded-full text-xs font-light transition-all ${
                            homeMonthlyBill === preset
                              ? 'bg-accent text-white'
                              : 'bg-black/[0.04] text-muted hover:text-foreground'
                          }`}
                        >
                          {currencyConf.format(preset * currencyConf.rate)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* OFFICE INPUTS */}
              {activeCalculator === 'office' && (
                <div className="space-y-6">
                  {/* Office Floor Area */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                        Floor Area (Sq. Ft)
                      </label>
                      <span className="text-base font-medium text-accent">
                        {officeArea.toLocaleString('en-US')} sq. ft
                      </span>
                    </div>

                    <input
                      type="range"
                      min={5000}
                      max={120000}
                      step={5000}
                      value={officeArea}
                      onChange={(e) => {
                        const newArea = Number(e.target.value);
                        setOfficeArea(newArea);
                        // Approximate bill proportional to area (approx ₹14/sq ft in commercial)
                        setOfficeMonthlyBill(Math.round(newArea * 14));
                      }}
                      className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />

                    <div className="flex flex-wrap gap-2 mt-3">
                      {[10000, 25000, 50000, 80000, 100000].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => {
                            setOfficeArea(preset);
                            setOfficeMonthlyBill(Math.round(preset * 14));
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-light transition-all ${
                            officeArea === preset
                              ? 'bg-accent text-white'
                              : 'bg-black/[0.04] text-muted hover:text-foreground'
                          }`}
                        >
                          {preset.toLocaleString('en-US')} sq ft
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Operational Hours */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted font-medium mb-3">
                      Facility Operating Hours
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: '10h', label: 'Standard', desc: '8-10 hrs / day' },
                        { id: '16h', label: 'Extended', desc: '14-16 hrs / day' },
                        { id: '24h', label: 'Continuous', desc: '24x7 Data/Ops' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setOfficeHours(item.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            officeHours === item.id
                              ? 'border-accent bg-accent/5 ring-1 ring-accent'
                              : 'border-border hover:border-black/20'
                          }`}
                        >
                          <span className="block text-sm font-medium text-foreground">{item.label}</span>
                          <span className="block text-xs text-muted font-light mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Energy Bill */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                        Monthly Operating Electricity Bill
                      </label>
                      <span className="text-base font-medium text-accent">
                        {currencyConf.format(officeMonthlyBill * currencyConf.rate)} / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min={80000}
                      max={2000000}
                      step={20000}
                      value={officeMonthlyBill}
                      onChange={(e) => setOfficeMonthlyBill(Number(e.target.value))}
                      className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                </div>
              )}

              {/* HOTEL INPUTS */}
              {activeCalculator === 'hotel' && (
                <div className="space-y-6">
                  {/* Number of Guest Rooms */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                        Number of Guest Rooms / Keys
                      </label>
                      <span className="text-base font-medium text-accent">
                        {hotelRooms} Rooms
                      </span>
                    </div>

                    <input
                      type="range"
                      min={30}
                      max={500}
                      step={10}
                      value={hotelRooms}
                      onChange={(e) => {
                        const rooms = Number(e.target.value);
                        setHotelRooms(rooms);
                        // Approximate commercial hotel electricity bill ~ ₹7,000 per room/mo
                        setHotelMonthlyBill(Math.round(rooms * 7000));
                      }}
                      className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />

                    <div className="flex flex-wrap gap-2 mt-3">
                      {[50, 100, 150, 250, 400].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => {
                            setHotelRooms(preset);
                            setHotelMonthlyBill(Math.round(preset * 7000));
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-light transition-all ${
                            hotelRooms === preset
                              ? 'bg-accent text-white'
                              : 'bg-black/[0.04] text-muted hover:text-foreground'
                          }`}
                        >
                          {preset} Rooms
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hotel Category */}
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-muted font-medium mb-3">
                      Hospitality Category
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'boutique', label: 'Boutique Stay', desc: 'Heritage / Eco' },
                        { id: '4star', label: '4-Star Business', desc: 'Urban Hotel' },
                        { id: '5star', label: '5-Star Luxury', desc: 'Resort / Palace' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setHotelTier(item.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            hotelTier === item.id
                              ? 'border-accent bg-accent/5 ring-1 ring-accent'
                              : 'border-border hover:border-black/20'
                          }`}
                        >
                          <span className="block text-sm font-medium text-foreground">{item.label}</span>
                          <span className="block text-xs text-muted font-light mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Energy Bill */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-[0.2em] text-muted font-medium">
                        Total Monthly Property Electricity Bill
                      </label>
                      <span className="text-base font-medium text-accent">
                        {currencyConf.format(hotelMonthlyBill * currencyConf.rate)} / mo
                      </span>
                    </div>

                    <input
                      type="range"
                      min={200000}
                      max={4000000}
                      step={50000}
                      value={hotelMonthlyBill}
                      onChange={(e) => setHotelMonthlyBill(Number(e.target.value))}
                      className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* STEP 2: Select Your Automation Requirements */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/80">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-semibold">
                    2
                  </span>
                  <h3 className="font-light text-xl sm:text-2xl tracking-wide text-foreground">
                    Select Your Automation Requirements
                  </h3>
                </div>
                <span className="text-xs text-muted font-light">Modular Systems</span>
              </div>

              <p className="font-light text-sm text-muted mb-6">
                Choose the systems you are considering, such as lighting, HVAC, shades or energy management.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SYSTEMS.map((sys) => {
                  const Icon = sys.icon;
                  const isChecked = selectedSystems.includes(sys.id);

                  return (
                    <button
                      key={sys.id}
                      type="button"
                      onClick={() => toggleSystem(sys.id)}
                      className={`relative flex flex-col justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                        isChecked
                          ? 'border-accent bg-accent/[0.03] ring-1 ring-accent'
                          : 'border-border/80 bg-black/[0.01] hover:border-black/20 opacity-70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            isChecked ? 'bg-accent/10 text-accent' : 'bg-black/5 text-muted'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isChecked ? 'bg-accent border-accent text-white' : 'border-border bg-white'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>

                        <span className="block text-sm font-medium text-foreground mb-1">
                          {sys.name}
                        </span>

                        <p className="font-light text-xs leading-relaxed text-muted mb-3">
                          {sys.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted font-light">
                        <span>{sys.techDetail}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 p-3 rounded-xl bg-[#F1EBD9]/60 border border-border/70 flex items-center gap-2.5 text-xs text-muted">
                <Info className="w-4 h-4 text-accent shrink-0" />
                <span>
                  All subsystems deploy industrial-grade architectural hardware (Lutron, KNX, Crestron) ensuring continuous uptime.
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: STEP 3 - SEE YOUR POTENTIAL SAVINGS (DASHBOARD) */}
          <div className="lg:col-span-5 sticky top-28">
            <div
              ref={resultRef}
              className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-accent/30 shadow-xl relative overflow-hidden"
            >
              {/* Subtle top brand ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-accent-soft to-accent" />

              {/* Step 3 Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/80">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-semibold">
                    3
                  </span>
                  <h3 className="font-light text-xl sm:text-2xl tracking-wide text-foreground">
                    See Your Potential Savings
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                  Live Estimate
                </span>
              </div>

              {/* Primary KPI Card */}
              <div className="p-6 rounded-2xl bg-[#F1EBD9] border border-border/70 text-center mb-6">
                <span className="block text-xs uppercase tracking-[0.25em] text-muted font-medium mb-1">
                  Estimated Annual Electricity Savings
                </span>
                
                <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-accent tracking-tight my-2">
                  {currencyConf.format(annualCostSavings)}
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-foreground/80 font-normal">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Approximately </span>
                  <strong className="font-semibold text-accent">{effectiveSavingsPercentage}% overall bill reduction</strong>
                </div>
              </div>

              {/* Secondary Metric Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-xl bg-black/[0.02] border border-border/70 text-left">
                  <span className="block text-xs text-muted font-light mb-1">
                    Monthly Savings
                  </span>
                  <span className="text-lg sm:text-xl font-light text-foreground">
                    {currencyConf.format(monthlyCostSavings)}
                  </span>
                  <span className="block text-[11px] text-muted/70 mt-0.5">Recurring cashflow</span>
                </div>

                <div className="p-4 rounded-xl bg-black/[0.02] border border-border/70 text-left">
                  <span className="block text-xs text-muted font-light mb-1">
                    Estimated Payback
                  </span>
                  <span className="text-lg sm:text-xl font-light text-accent">
                    {paybackYears.toFixed(1)} Years
                  </span>
                  <span className="block text-[11px] text-muted/70 mt-0.5">Capital recovery</span>
                </div>

                {activeCalculator === 'hotel' && (
                  <div className="p-4 rounded-xl bg-black/[0.02] border border-border/70 text-left col-span-2">
                    <span className="block text-xs text-muted font-light mb-1">
                      Annual Savings per Guest Room
                    </span>
                    <span className="text-lg sm:text-xl font-light text-foreground">
                      {currencyConf.format(hotelSavingsPerRoom)} / room / year
                    </span>
                    <span className="block text-[11px] text-muted/70 mt-0.5">
                      Direct operational margin boost across {hotelRooms} rooms
                    </span>
                  </div>
                )}

                {activeCalculator === 'office' && (
                  <div className="p-4 rounded-xl bg-black/[0.02] border border-border/70 text-left col-span-2">
                    <span className="block text-xs text-muted font-light mb-1">
                      Annual Operating Savings per Sq. Ft
                    </span>
                    <span className="text-lg sm:text-xl font-light text-foreground">
                      {currencyConf.format(officeSavingsPerSqFt)} / sq.ft / year
                    </span>
                    <span className="block text-[11px] text-muted/70 mt-0.5">
                      Direct facility OPEX reduction across {officeArea.toLocaleString('en-US')} sq.ft
                    </span>
                  </div>
                )}

                {activeCalculator === 'home' && (
                  <div className="p-4 rounded-xl bg-black/[0.02] border border-border/70 text-left col-span-2">
                    <span className="block text-xs text-muted font-light mb-1">
                      5-Year Cumulative Savings
                    </span>
                    <span className="text-lg sm:text-xl font-light text-foreground">
                      {currencyConf.format(fiveYearGrossSavings)}
                    </span>
                    <span className="block text-[11px] text-muted/70 mt-0.5">
                      Compounded savings over standard 5-year operating lifecycle
                    </span>
                  </div>
                )}
              </div>

              {/* Subsystem Contribution Breakdown */}
              <div className="mb-6 pt-4 border-t border-border">
                <span className="block text-xs uppercase tracking-[0.2em] text-foreground/80 font-medium mb-3">
                  Savings by Automation System:
                </span>
                
                <div className="space-y-3">
                  {selectedSystems.map((sysId) => {
                    const sys = SYSTEMS.find((s) => s.id === sysId);
                    if (!sys) return null;
                    const portionShare = sys.contributionPercent / totalSystemWeights;
                    const sysSavingsAmount = annualCostSavings * portionShare;

                    return (
                      <div key={sysId} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs font-light">
                          <span className="text-foreground">{sys.name}</span>
                          <span className="text-muted font-medium">
                            {currencyConf.format(sysSavingsAmount)}/yr
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all duration-500"
                            style={{ width: `${Math.round(portionShare * 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => setShowReportModal(true)}
                  className="w-full"
                >
                  <Button variant="interactive" size="lg" className="w-full justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download Indicative Summary
                  </Button>
                </button>

                <Link href="/contact" className="w-full">
                  <Button variant="outline" size="lg" className="w-full justify-center">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Book Engineered Audit
                  </Button>
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-muted font-light text-center mt-4 leading-relaxed">
                * Indicative estimate based on AT Smart Living historical field deployments across standard climatic baselines. Actual savings subject to structural solar orientation and MEP equipment specifications.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* REPORT / AUDIT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-border shadow-2xl relative">
            
            <button
              onClick={resetLeadForm}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-muted hover:text-foreground text-sm font-semibold"
              aria-label="Close"
            >
              ✕
            </button>

            {!leadFormSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2 text-accent text-xs uppercase tracking-[0.2em] font-light">
                  <Sparkles className="w-4 h-4" />
                  Engineering Report
                </div>

                <h3 className="font-light text-2xl text-foreground mb-3">
                  Receive Your Full Savings Breakdown
                </h3>

                <p className="font-light text-sm text-muted mb-6">
                  We'll prepare a structured project breakdown with subsystem specs, payback roadmap, and verified equipment lists for your property.
                </p>

                <div className="p-3 rounded-xl bg-background border border-border/80 mb-6 text-xs text-foreground flex justify-between">
                  <span>Project Model:</span>
                  <strong className="capitalize">{activeCalculator} Automation</strong>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5">
                      Phone Number or Email
                    </label>
                    <input
                      type="text"
                      required
                      value={leadContact}
                      onChange={(e) => setLeadContact(e.target.value)}
                      placeholder="+91 98765 43210 / vikram@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-muted mb-1.5">
                      City / Location
                    </label>
                    <input
                      type="text"
                      value={leadCity}
                      onChange={(e) => setLeadCity(e.target.value)}
                      placeholder="e.g. New Delhi, Mumbai, Bengaluru"
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="interactive" size="lg" className="w-full justify-center">
                      Generate & Email My Report
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="font-light text-2xl text-foreground mb-2">
                  Report Request Confirmed
                </h3>
                <p className="font-light text-sm text-muted mb-6 max-w-sm mx-auto">
                  Thank you, {leadName || 'Sir/Madam'}. Our systems engineering team has logged your {activeCalculator} parameters and will send the detailed indicative audit to {leadContact}.
                </p>
                <button onClick={resetLeadForm}>
                  <Button variant="outline" size="sm">
                    Close Window
                  </Button>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
