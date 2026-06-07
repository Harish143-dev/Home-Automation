import { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/projects/ProjectsHero";
import { ProjectsLayout } from "@/components/sections/projects/ProjectsLayout";
import { ProjectGrid } from "@/components/sections/projects/ProjectGrid";
import { ProjectsSidebar } from "@/components/sections/projects/ProjectsSidebar";
import { ConsultationForm } from "@/components/sections/projects/ConsultationForm";
import { NewsletterSignup } from "@/components/sections/projects/NewsletterSignup";

export const metadata: Metadata = {
  title: "Proud Projects | AT Smart Living",
  description: "Explore our portfolio of luxury residential and commercial automation projects.",
};

export default function ProjectsPage() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">
      <ProjectsHero />

      <ProjectsLayout>
        <ProjectGrid />
        <ProjectsSidebar />
      </ProjectsLayout>

      <ConsultationForm />
      <NewsletterSignup />
    </main>
  );
}

