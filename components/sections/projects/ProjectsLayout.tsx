"use client";

import { ReactNode } from "react";

interface ProjectsLayoutProps {
  children: ReactNode;
}

export function ProjectsLayout({ children }: ProjectsLayoutProps) {
  return (
    <section className="py-12 md:py-16 relative w-full px-6 sm:px-10 lg:px-20 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Main Content Area (8 cols) and Sidebar (4 cols) are passed as children */}
        {children}
      </div>
    </section>
  );
}
