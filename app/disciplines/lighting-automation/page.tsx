import type { Metadata } from "next";
import LightingAutomationHero from "@/components/sections/disciplines/LightingAutomationHero";
import { LightingAutomationTrust } from "@/components/sections/disciplines/LightingAutomationTrust";
import { LightingAutomationClients } from "@/components/sections/disciplines/LightingAutomationClients";
import { LightingAutomationCredentials } from "@/components/sections/disciplines/LightingAutomationCredentials";
import { LightingAutomationFeatures } from "@/components/sections/disciplines/LightingAutomationFeatures";
import { LightingAutomationSystem } from "@/components/sections/disciplines/LightingAutomationSystem";
import { LightingAutomationNeeds } from "@/components/sections/disciplines/LightingAutomationNeeds";
import { LightingAutomationEnvironments } from "@/components/sections/disciplines/LightingAutomationEnvironments";
import { LightingAutomationWhyATPL } from "@/components/sections/disciplines/LightingAutomationWhyATPL";
import { LightingAutomationProjects } from "@/components/sections/disciplines/LightingAutomationProjects";
import { LightingAutomationProcess } from "@/components/sections/disciplines/LightingAutomationProcess";
import { LightingAutomationCTA } from "@/components/sections/disciplines/LightingAutomationCTA";

export const metadata: Metadata = {
  title: "Lighting Automation Solutions | AT Smart Living",
  description: "Transform the way spaces look, feel, and operate with intelligent lighting control designed for homes, hospitality environments, offices, and commercial spaces.",
};

export default function LightingAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <LightingAutomationHero />
      <LightingAutomationTrust />
      <LightingAutomationClients />
      <LightingAutomationCredentials />
      <LightingAutomationFeatures />
      <LightingAutomationSystem />
      <LightingAutomationNeeds />
      <LightingAutomationEnvironments />
      <LightingAutomationWhyATPL />
      <LightingAutomationProjects />
      <LightingAutomationProcess />
      <LightingAutomationCTA />
    </main>
  );
}
