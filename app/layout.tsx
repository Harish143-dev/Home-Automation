import type { Metadata } from "next";
import "../styles/globals.css";
import { SmoothScrollProvider } from "../components/layout/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "AT - Intelligent Automation for Luxury Living & Smart Spaces",
  description:
    "We design and engineer bespoke smart home experiences - where light, sound, climate, and security respond to your life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
