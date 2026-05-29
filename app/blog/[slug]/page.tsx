import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BLOG_POSTS, FEATURED_POST } from "@/lib/blogData";
import BlogDetailHero from "@/components/sections/blog/BlogDetailHero";
import BlogContent from "@/components/sections/blog/BlogContent";
import RelatedArticles from "@/components/sections/blog/RelatedArticles";

export async function generateStaticParams() {
  const posts = [...BLOG_POSTS, FEATURED_POST];
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const posts = [...BLOG_POSTS, FEATURED_POST];
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found | AT Smart Living",
    };
  }

  return {
    title: `${post.title} | The Journal | AT Smart Living`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const posts = [...BLOG_POSTS, FEATURED_POST];
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Get 3 related articles (just excluding current for demo purposes)
  const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <main className="relative bg-background text-foreground min-h-screen">
      <BlogDetailHero post={post} />
      <BlogContent post={post} />
      {relatedPosts.length > 0 && <RelatedArticles posts={relatedPosts} />}
    </main>
  );
}
