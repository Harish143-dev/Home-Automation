import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience Centres — Delhi, Mumbai, Bengaluru",
  description: "Visit AT Smart Living immersive experience centres in Delhi, Mumbai, and Bengaluru. Walk through live architectural lighting scenes, motorized shading, and integrated control systems.",
  openGraph: {
    title: "Experience Centres | AT Smart Living",
    description: "Visit AT Smart Living immersive experience centres in Delhi, Mumbai, and Bengaluru.",
  },
};

export default function ExperienceCenterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
