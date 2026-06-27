import CareersHero from "@/components/sections/careers/CareersHero";
import CareersBenefits from "@/components/sections/careers/CareersBenefits";
import CareersGallery from "@/components/sections/careers/CareersGallery";
import CareersOpenings from "@/components/sections/careers/CareersOpenings";
import CareersApplicationForm from "@/components/sections/careers/CareersApplicationForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Anusha Technovision",
  description: "Join a team that's shaping intelligent homes, hospitality, and commercial spaces through cutting-edge automation, innovation, and engineering excellence.",
};

export default function CareersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <CareersHero />
      <CareersBenefits />
      <CareersGallery />
      <CareersOpenings />
      <CareersApplicationForm />
    </main>
  );
}
