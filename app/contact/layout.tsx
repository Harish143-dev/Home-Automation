import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & System Consultation",
  description: "Connect with AT Smart Living automation engineers and lighting designers. Schedule a private consultation or showroom walkthrough for your project.",
  openGraph: {
    title: "Contact Us | AT Smart Living",
    description: "Connect with our automation engineers and designers for bespoke consultation.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
