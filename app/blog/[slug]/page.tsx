import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BLOG_POSTS, FEATURED_POST } from "@/lib/blogData";
import BlogDetailHeader from "@/components/sections/blog/BlogDetailHeader";
import BlogDetailContent from "@/components/sections/blog/BlogDetailContent";
import BlogDetailSidebar from "@/components/sections/blog/BlogDetailSidebar";

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

  return (
    <main className="relative bg-background text-foreground min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 px-6 sm:px-10 lg:px-20 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Main Content Column (Left) */}
        <div className="lg:col-span-9 flex flex-col">
          <BlogDetailHeader post={post} />
          <BlogDetailContent post={post} />
        </div>

        {/* Sidebar Column (Right) */}
        <BlogDetailSidebar />
        
      </div>
    </main>
  );
}
