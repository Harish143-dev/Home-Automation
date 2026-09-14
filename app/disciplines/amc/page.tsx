import AMCHero from "@/components/sections/disciplines/AMCHero";
import AMCStats from "@/components/sections/disciplines/amc/AMCStats";
import AMCClients from "@/components/sections/disciplines/amc/AMCClients";
import AMCCredentials from "@/components/sections/disciplines/amc/AMCCredentials";
import AMCComparison from "@/components/sections/disciplines/amc/AMCComparison";
import AMCHighlights from "@/components/sections/disciplines/amc/AMCHighlights";
import AMCCoverage from "@/components/sections/disciplines/amc/AMCCoverage";
import AMCEnvironments from "@/components/sections/disciplines/amc/AMCEnvironments";
import AMCFeatures from "@/components/sections/disciplines/amc/AMCFeatures";
import AMCProcess from "@/components/sections/disciplines/amc/AMCProcess";
import AMCCTA from "@/components/sections/disciplines/amc/AMCCTA";

export const metadata = {
  title: "AMC & Support - Anusha Technovision",
  description: "Keep your automation, audio-video, lighting, networking, security, HVAC and smart technology systems performing at their best with reliable annual maintenance and expert technical support.",
};

export default function AMCPage() {
  return (
    <main className="relative w-full bg-background min-h-screen">
      <AMCHero />
      <AMCStats />
      <AMCClients />
      <AMCCredentials />
      <AMCFeatures />
      <AMCCoverage />
      <AMCEnvironments />
      <AMCProcess />
      <AMCComparison />
      <AMCHighlights />
      <AMCCTA />
    </main>
  );
}
