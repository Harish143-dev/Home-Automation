import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Automation & Smart Infrastructure",
  description: "Enterprise building automation, boardroom AV, architectural lighting grids, and energy management for offices, hotels, retail, and institutions.",
  openGraph: {
    title: "Commercial Automation | AT Smart Living",
    description: "Enterprise building automation, boardroom AV, architectural lighting grids, and energy management for modern architectures.",
  },
};

export default function CommercialLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
