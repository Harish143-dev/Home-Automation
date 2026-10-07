import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audio Video Integration & Smart Entertainment",
  description: "Architectural multi-room audio, reference-grade private home cinemas, and video distribution systems integrated seamlessly into luxury living spaces.",
  openGraph: {
    title: "Audio Video Integration | AT Smart Living",
    description: "Architectural multi-room audio and reference-grade private cinema integration for luxury homes.",
  },
};

export default function AudioVideoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
