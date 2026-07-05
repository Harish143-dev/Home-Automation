import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import LightingHero from "@/components/sections/lighting/LightingHero";
import LightingIntro from "@/components/sections/lighting/LightingIntro";
import LightingTrust from "@/components/sections/lighting/LightingTrust";
import LightingFeatures from "@/components/sections/lighting/LightingFeatures";
import LightingScenes from "@/components/sections/lighting/LightingScenes";
import LightingBenefits from "@/components/sections/lighting/LightingBenefits";
import LightingIntegration from "@/components/sections/lighting/LightingIntegration";
import LightingControls from "@/components/sections/lighting/LightingControls";
import LightingProjects from "@/components/sections/lighting/LightingProjects";
import LightingPartners from "@/components/sections/lighting/LightingPartners";

export const metadata = {
  title: "Lighting Automation | Anusha Technovision",
  description: "Transform the way you experience your home with intelligent lighting automation that creates the perfect ambiance, enhances comfort, and improves energy efficiency.",
};

export default function LightingAutomationPage() {
  return (
    <>
      <main className="flex flex-col min-h-screen bg-background pt-0">
        <LightingHero />
        <LightingTrust />
        <LightingFeatures />
        <LightingIntro />
        <LightingScenes />
        <LightingBenefits />
        <LightingIntegration />
        <LightingControls />
        <LightingProjects />
        <LightingPartners />
      </main>
    </>
  );
}
