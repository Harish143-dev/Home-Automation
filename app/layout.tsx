import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { SmoothScrollProvider } from "../components/layout/SmoothScrollProvider";
import { Footer } from "../components/layout/Footer";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/layout/NavBar";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://atsmartliving.com'),
  title: {
    default: "AT Smart Living — Luxury Home Automation & Intelligent Spaces",
    template: "%s | AT Smart Living",
  },
  description:
    "For over 25 years, AT Smart Living (ATPL) has engineered bespoke smart home automation, architectural lighting control, and AV integration across India.",
  keywords: [
    "smart home automation",
    "luxury home automation India",
    "architectural lighting control",
    "Lutron India partner",
    "motorized shades automation",
    "home theatre integration Delhi Mumbai Bangalore",
  ],
  authors: [{ name: "AT Smart Living" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://atsmartliving.com",
    siteName: "AT Smart Living",
    title: "AT Smart Living — Luxury Home Automation & Intelligent Spaces",
    description: "Intelligent automation for luxury living, hospitality, and commercial spaces across India.",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "AT Smart Living Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AT Smart Living — Luxury Home Automation & Intelligent Spaces",
    description: "Intelligent automation for luxury living, hospitality, and commercial spaces across India.",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans")}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body>

        <SmoothScrollProvider>
          <NavBar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
