import { InstitutesHero } from "@/components/sections/institutes/InstitutesHero";
import { InstitutesTrust } from "@/components/sections/institutes/InstitutesTrust";
import { InstitutesCredentials } from "@/components/sections/institutes/InstitutesCredentials";
import { InstitutesOverview } from "@/components/sections/institutes/InstitutesOverview";
import { InstitutesSpaces } from "@/components/sections/institutes/InstitutesSpaces";
import { InstitutesSolutions } from "@/components/sections/institutes/InstitutesSolutions";
import { InstitutesBenefits } from "@/components/sections/institutes/InstitutesBenefits";
import { InstitutesWhyChooseUs } from "@/components/sections/institutes/InstitutesWhyChooseUs";
import { InstitutesProcess } from "@/components/sections/institutes/InstitutesProcess";
import { InstitutesWhyATPL } from "@/components/sections/institutes/InstitutesWhyATPL";
import { InstitutesProjects } from "@/components/sections/institutes/InstitutesProjects";
import { InstitutesCommercialProcess } from "@/components/sections/institutes/InstitutesCommercialProcess";
import { InstitutesCTA } from "@/components/sections/institutes/InstitutesCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Automation for Educational Institutes | AT Smart Living",
  description: "Create intelligent, secure, and energy-efficient learning environments with integrated automation solutions for schools, colleges, universities, and coaching institutes.",
};

export default function InstitutesAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <InstitutesHero />
      <InstitutesTrust />
      <InstitutesCredentials />
      <InstitutesOverview />
      <InstitutesSpaces />
      <InstitutesSolutions />
      <InstitutesBenefits />
      <InstitutesWhyChooseUs />
      <InstitutesProcess />
      <InstitutesWhyATPL />
      <InstitutesProjects />
      <InstitutesCommercialProcess />
      <InstitutesCTA />
    </main>
  );
}
