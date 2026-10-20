import { BlogItem } from "@/lib/blogUtils";
import { ChevronRight, Mail, Link as LinkIcon, Share2 } from "lucide-react";

interface BlogDetailContentProps {
  post: BlogItem;
}

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  // Extract key takeaways list if present
  const takeawaysList = post.keyTakeaways
    ? post.keyTakeaways
        .split("\n")
        .map((s: string) => s.replace(/^[-*•\d.]\s*/, "").trim())
        .filter(Boolean)
    : [];

  // Extract headings from content for dynamic TOC
  const contentHeadings = Array.from(
    (post.content || "").matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)
  )
    .map((m) => m[1].replace(/<[^>]*>/g, "").trim())
    .filter(Boolean);

  const hasTOC = takeawaysList.length > 0 || contentHeadings.length > 0;

  return (
    <div className="w-full flex flex-col gap-12 lg:gap-16">
      {/* Content Grid (TOC + Main Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Sidebar: Table of Contents */}
        {hasTOC && (
          <div className="lg:col-span-3 lg:sticky lg:top-32 hidden md:block">
            <div className="bg-transparent border border-border rounded-2xl p-6">
              <h4 className="text-foreground mb-6">Table of Contents</h4>
              <ul className="flex flex-col gap-4 text-sm font-light text-muted-foreground">
                {takeawaysList.length > 0 && (
                  <li className="flex items-center gap-2 text-accent cursor-pointer transition-colors hover:text-accent">
                    <ChevronRight className="w-3 h-3" />
                    Key Takeaways
                  </li>
                )}
                {contentHeadings.map((heading, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 cursor-pointer transition-colors hover:text-accent line-clamp-1"
                  >
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    <span className="truncate">{heading}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`${
            hasTOC ? "lg:col-span-9" : "lg:col-span-12"
          } flex flex-col gap-10 min-w-0`}
        >
          {/* Key Takeaways (only if present in post) */}
          {takeawaysList.length > 0 && (
            <div className="bg-transparent border border-border rounded-2xl p-8">
              <h4 className="text-foreground mb-4 font-normal text-lg">
                Key Takeaways
              </h4>
              <ul className="flex flex-col gap-3 text-muted-foreground font-light text-sm md:text-base leading-relaxed list-disc list-inside">
                {takeawaysList.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Contextual Section (Blog Body) */}
          <article
            className="prose max-w-none prose-h2:!text-3xl prose-h2:md:!text-4xl prose-h2:!font-light prose-h2:!tracking-wide prose-h2:!mb-6 prose-h2:!mt-12 prose-headings:font-light prose-headings:tracking-wide prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-accent hover:prose-a:text-accent/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Divider */}
          <div className="w-full h-[1px] bg-border/50 my-4" />

          {/* Bottom Social Share */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h5 className="text-foreground !mb-0">Share this article</h5>
            <div className="flex items-center gap-3">
              {[LinkIcon, Mail, Share2].map((Icon, idx) => (
                <button
                  key={idx}
                  className="w-10 h-10 rounded-full border border-border bg-background shadow-sm flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:bg-accent/5 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Author Bio Section */}
          <div className="bg-transparent border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-4">
            <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 text-accent font-light text-2xl">
              {(post.author || "ATPL")
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h4 className="text-foreground mb-2">
                {post.author || "ATPL Team"}
              </h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed">
                Contributing insights on intelligent living, luxury architectural
                automation, and thoughtful technology integration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
