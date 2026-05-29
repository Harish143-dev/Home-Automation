import { Metadata } from "next";
import BlogHero from "@/components/sections/blog/BlogHero";
import BlogCategories from "@/components/sections/blog/BlogCategories";
import FeaturedArticle from "@/components/sections/blog/FeaturedArticle";
import ArticleGrid from "@/components/sections/blog/ArticleGrid";

export const metadata: Metadata = {
  title: "Insights | AT Smart Living",
  description: "Thought leadership in intelligent living, luxury automation, and architectural technology.",
};

export default function BlogPage() {
  return (
    <main className="relative bg-background text-foreground min-h-screen">
      {/* Cinematic dark hero */}
      <BlogHero />
      
      {/* Light theme editorial content */}
      <BlogCategories />
      <FeaturedArticle />
      <ArticleGrid />
    </main>
  );
}
