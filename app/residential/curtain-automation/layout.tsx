import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motorized Shades & Curtain Automation",
  description: "Silent motorized drapery and architectural shading systems tailored to luxury residences. Precision control via keypads, mobile apps, and schedule automation.",
  openGraph: {
    title: "Motorized Shades & Curtain Automation | AT Smart Living",
    description: "Silent motorized drapery and architectural shading systems tailored to luxury residences.",
  },
};

export default function CurtainLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
