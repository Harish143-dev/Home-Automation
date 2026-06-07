import { Metadata } from "next";
import BlogHero from "@/components/sections/blog/BlogHero";
import BlogLayout from "@/components/sections/blog/BlogLayout";
import BlogGrid from "@/components/sections/blog/BlogGrid";
import BlogSidebar from "@/components/sections/blog/BlogSidebar";
import { ConsultationForm } from "@/components/sections/projects/ConsultationForm";
import { NewsletterSignup } from "@/components/sections/projects/NewsletterSignup";

export const metadata: Metadata = {
  title: "Insights | AT Smart Living",
  description: "Thought leadership in intelligent living, luxury automation, and architectural technology.",
};

export default function BlogPage() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">
      {/* Centered Banner Hero */}
      <BlogHero />
      
      {/* Main Grid + Sidebar Layout */}
      <BlogLayout>
        <BlogGrid />
        <BlogSidebar />
      </BlogLayout>

      {/* Get Free Consultant Form Section */}
      <ConsultationForm />

      {/* Sign up for newsletter */}
      <NewsletterSignup />
    </main>
  );
}
