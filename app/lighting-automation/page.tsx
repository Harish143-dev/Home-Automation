import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import LightingHero from "@/components/sections/lighting/LightingHero";
import LightingIntro from "@/components/sections/lighting/LightingIntro";
import LightingTrust from "@/components/sections/lighting/LightingTrust";
import LightingScenes from "@/components/sections/lighting/LightingScenes";
import LightingIntegration from "@/components/sections/lighting/LightingIntegration";

export const metadata = {
  title: "Lighting Automation | Anusha Technovision",
  description: "Transform the way you experience your home with intelligent lighting automation that creates the perfect ambiance, enhances comfort, and improves energy efficiency.",
};

export default function LightingAutomationPage() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen bg-background pt-0">
        <LightingHero />
        <LightingTrust />
        <LightingIntro />
        <LightingScenes />
        <LightingIntegration />
      </main>
      <Footer />
    </>
  );
}
