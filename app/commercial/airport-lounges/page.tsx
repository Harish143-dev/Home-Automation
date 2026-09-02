import { AirportLoungesHero } from "@/components/sections/airport-lounges/AirportLoungesHero";
import { AirportLoungesTrust } from "@/components/sections/airport-lounges/AirportLoungesTrust";
import { AirportLoungesCredentials } from "@/components/sections/airport-lounges/AirportLoungesCredentials";
import { AirportLoungesBenefits } from "@/components/sections/airport-lounges/AirportLoungesBenefits";
import { AirportLoungesSolutions } from "@/components/sections/airport-lounges/AirportLoungesSolutions";
import { AirportLoungesControl } from "@/components/sections/airport-lounges/AirportLoungesControl";
import { AirportLoungesEnvironments } from "@/components/sections/airport-lounges/AirportLoungesEnvironments";
import { AirportLoungesScale } from "@/components/sections/airport-lounges/AirportLoungesScale";
import { AirportLoungesWhyATPL } from "@/components/sections/airport-lounges/AirportLoungesWhyATPL";
import { AirportLoungesProjects } from "@/components/sections/airport-lounges/AirportLoungesProjects";
import { AirportLoungesCommercialProcess } from "@/components/sections/airport-lounges/AirportLoungesCommercialProcess";
import { AirportLoungesCTA } from "@/components/sections/airport-lounges/AirportLoungesCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Airport Lounges Automation Solutions | AT Smart Living",
  description: "Create premium airport lounge experiences with intelligent control of lighting, climate, audio, visual systems, networking, and security—all managed seamlessly for greater passenger comfort and operational efficiency.",
};

export default function AirportLoungesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <AirportLoungesHero />
      <AirportLoungesTrust />
      <AirportLoungesCredentials />
      <AirportLoungesBenefits />
      <AirportLoungesSolutions />
      <AirportLoungesControl />
      <AirportLoungesEnvironments />
      <AirportLoungesScale />
      <AirportLoungesProjects />
      <AirportLoungesWhyATPL />
      <AirportLoungesCommercialProcess />
      <AirportLoungesCTA />
    </main>
  );
}
