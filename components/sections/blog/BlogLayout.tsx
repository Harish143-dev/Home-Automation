"use client";

import { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <section className="py-16 md:py-24 relative w-full px-6 sm:px-10 lg:px-20 max-w-[1600px] mx-auto bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Main Content Area (9 cols) and Sidebar (3 cols) are passed as children */}
        {children}
      </div>
    </section>
  );
}
