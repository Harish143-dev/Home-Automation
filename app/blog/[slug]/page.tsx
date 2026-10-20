import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getApiBaseUrl } from "@/lib/api";
import { BlogItem, transformBackendBlog, slugify } from "@/lib/blogUtils";
import BlogDetailHeader from "@/components/sections/blog/BlogDetailHeader";
import BlogDetailContent from "@/components/sections/blog/BlogDetailContent";
import BlogDetailSidebar from "@/components/sections/blog/BlogDetailSidebar";

export const dynamicParams = true;

async function getPost(slug: string): Promise<BlogItem | null> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/blogs`, { cache: "no-store" });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const dbMatch = data.data.find(
        (b: any) =>
          String(b.id) === slug ||
          slugify(b.title) === slug ||
          b.title.toLowerCase() === decodeURIComponent(slug).toLowerCase()
      );

      if (dbMatch) {
        return transformBackendBlog(dbMatch);
      }
    }
  } catch (err) {
    console.error("Failed to fetch blog post from backend", err);
  }

  return null;
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${getApiBaseUrl()}/blogs`, { cache: "no-store" });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      return data.data.map((b: any) => ({
        slug: slugify(b.title) || String(b.id),
      }));
    }
  } catch (err) {
    console.error("Failed to generate static params for blogs", err);
  }
  return [];
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | AT Smart Living",
    };
  }

  return {
    title: `${post.title} | Blog | AT Smart Living`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const post = await getPost(params.slug);

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
        <BlogDetailSidebar currentPostId={post.id} />
      </div>
    </main>
  );
}
