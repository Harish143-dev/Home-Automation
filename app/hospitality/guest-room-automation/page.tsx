import { GuestRoomHero } from "@/components/sections/guest-room/GuestRoomHero";
import { GuestRoomIntro } from "@/components/sections/guest-room/GuestRoomIntro";
import { GuestRoomFeatures } from "@/components/sections/guest-room/GuestRoomFeatures";
import { GuestRoomJourney } from "@/components/sections/guest-room/GuestRoomJourney";
import { GuestRoomBenefits } from "@/components/sections/guest-room/GuestRoomBenefits";
import { GuestRoomWhyChooseUs } from "@/components/sections/guest-room/GuestRoomWhyChooseUs";
import { GuestRoomWhyATPL } from "@/components/sections/guest-room/GuestRoomWhyATPL";
import { GuestRoomProjects } from "@/components/sections/guest-room/GuestRoomProjects";
import { GuestRoomProcess } from "@/components/sections/guest-room/GuestRoomProcess";
import { GuestRoomCTA } from "@/components/sections/guest-room/GuestRoomCTA";
import { GuestRoomClients } from "@/components/sections/guest-room/GuestRoomClients";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Room Automation & GRMS | AT Smart Living",
  description: "Deliver exceptional guest experiences while optimizing energy efficiency with intelligent guest room automation solutions designed for modern hospitality.",
};

export default function GuestRoomAutomationPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      <GuestRoomHero />
      <GuestRoomWhyATPL />
      <GuestRoomClients />
      <GuestRoomIntro />
      <GuestRoomFeatures />
      <GuestRoomJourney />
      <GuestRoomBenefits />
      <GuestRoomWhyChooseUs />
      <GuestRoomProjects />
      <GuestRoomProcess />
      <GuestRoomCTA />
    </main>
  );
}
