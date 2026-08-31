import { RestaurantHero } from "@/components/sections/restaurant/RestaurantHero";
import { RestaurantIntro } from "@/components/sections/restaurant/RestaurantIntro";
import { RestaurantSpaces } from "@/components/sections/restaurant/RestaurantSpaces";
import { RestaurantPlatform } from "@/components/sections/restaurant/RestaurantPlatform";
import { RestaurantBenefits } from "@/components/sections/restaurant/RestaurantBenefits";
import { RestaurantCredentials } from "@/components/sections/restaurant/RestaurantCredentials";
import { RestaurantTrust } from "@/components/sections/restaurant/RestaurantTrust";
import { RestaurantClients } from "@/components/sections/restaurant/RestaurantClients";
import { RestaurantProcess } from "@/components/sections/restaurant/RestaurantProcess";
import { RestaurantProjects } from "@/components/sections/restaurant/RestaurantProjects";
import { RestaurantPartners } from "@/components/sections/restaurant/RestaurantPartners";
import { RestaurantWhyATPL } from "@/components/sections/restaurant/RestaurantWhyATPL";
import { RestaurantCTA } from "@/components/sections/restaurant/RestaurantCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurant Automation Solutions | AT Smart Living",
  description: "Create the perfect dining atmosphere with intelligent lighting, immersive audio, and seamless automation designed to elevate guest experiences while improving operational efficiency.",
};

export default function RestaurantAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <RestaurantHero />
      <RestaurantTrust />
      <RestaurantCredentials />
      <RestaurantIntro />
      <RestaurantSpaces />
      <RestaurantPlatform />
      <RestaurantBenefits />
      <RestaurantProjects />
      <RestaurantPartners />
      <RestaurantWhyATPL />
      <RestaurantProcess />
      <RestaurantCTA />
    </main>
  );
}
