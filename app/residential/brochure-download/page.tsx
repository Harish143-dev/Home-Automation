"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '../../../components/ui/button';

export default function BrochureDownloadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    newsletter: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Submit data to the API route
      const response = await fetch('/api/brochure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // 2. Trigger the automatic download of the PDF
      const link = document.createElement('a');
      link.href = '/AT_Smart_Living_Residential_Brochure.pdf';
      link.download = 'AT_Smart_Living_Residential_Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 3. Redirect to the Thank You page
      router.push('/thank-you');
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-background flex flex-col pt-24 md:pt-32">


      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 py-12 md:py-20">
        <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 sm:p-12 shadow-xl shadow-black/5">

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-foreground mb-4">
              Download Brochure
            </h1>
            <p className="text-muted text-sm sm:text-base font-light">
              Please provide your details below to access the AT Smart Living Residential Brochure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground/80">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground/80">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                placeholder="john@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="city" className="text-sm font-medium text-foreground/80">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-border bg-background px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-shadow"
                placeholder="Delhi"
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="w-5 h-5 accent-accent cursor-pointer"
              />
              <label htmlFor="newsletter" className="text-sm text-muted cursor-pointer select-none">
                Yes, I would like to receive updates and news.
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="accent"
              size="lg"
              className="mt-4 w-full h-14 text-sm font-medium tracking-widest uppercase disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Download Brochure'}
            </Button>
          </form>

        </div>
      </div>


    </main>
  );
}
