import { getApiBaseUrl } from "@/lib/api";

export interface BlogItem {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  content: string;
  author: string;
  keyTakeaways?: string | null;
}

export function slugify(text: string): string {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function stripHtml(html: string): string {
  return (html || "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export function resolveBlogImageUrl(url?: string | null): string {
  if (!url) {
    return "/assets/residential/project/delhi-residence/delhi-residence-1.jpg";
  }
  if (url.startsWith("/uploads/")) {
    const apiBase = getApiBaseUrl().replace(/\/api\/?$/, "");
    return `${apiBase}${url}`;
  }
  return url;
}

export function transformBackendBlog(b: any): BlogItem {
  const plain = stripHtml(b.content || "");
  const dateStr = b.publishedAt || b.createdAt;
  const wordCount = plain.split(/\s+/).filter(Boolean).length;
  const readMinutes = Math.max(2, Math.ceil(wordCount / 200));

  return {
    id: String(b.id),
    slug: slugify(b.title) || `post-${b.id}`,
    category: b.category || "Smart Living",
    date: dateStr
      ? new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Recent",
    title: b.title,
    excerpt: b.description || (plain ? `${plain.slice(0, 140)}...` : ""),
    image: resolveBlogImageUrl(b.imageUrl),
    readTime: `${readMinutes} Min Read`,
    content: b.content || "",
    author: b.author || "ATPL Team",
    keyTakeaways: b.keyTakeaways || null,
  };
}
