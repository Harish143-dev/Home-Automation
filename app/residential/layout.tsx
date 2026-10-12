import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential Smart Automation & Luxury Living",
  description: "Bespoke residential home automation solutions across India. Intelligent lighting, motorized shades, climate control, and audio-video integration for luxury villas and estates.",
  openGraph: {
    title: "Residential Smart Automation | AT Smart Living",
    description: "Bespoke residential home automation solutions across India. Intelligent lighting, motorized shades, climate control, and audio-video integration for luxury residences.",
  },
};

export default function ResidentialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
