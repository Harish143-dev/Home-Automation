import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hospitality & Hotel Automation Solutions",
  description: "Luxury guest room environmental controls, public area architectural illumination, banquet hall automation, and acoustic integration for hotels and resorts.",
  openGraph: {
    title: "Hospitality Automation | AT Smart Living",
    description: "Luxury guest room automation and environmental control systems tailored for premier hotels and resorts.",
  },
};

export default function HospitalityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
