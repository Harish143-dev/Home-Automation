"use client";

import { ContactHero } from "../../components/sections/contact/ContactHero";
import { ContactExperience } from "../../components/sections/contact/ContactExperience";
import { ExperienceCentersMap } from "../../components/sections/contact/ExperienceCentersMap";
import { InquiryForm } from "../../components/sections/contact/InquiryForm";

export default function ContactPage() {
  return (
    <main className="relative bg-background overflow-hidden w-full text-foreground min-h-screen">
      <ContactHero />
      <ContactExperience />
      <ExperienceCentersMap />
      <InquiryForm />
    </main>
  );
}
