import { BlogPost } from "@/lib/blogData";
import { ChevronRight, Mail, Link as LinkIcon, Share2 } from "lucide-react";
import Image from "next/image";

interface BlogDetailContentProps {
  post: BlogPost;
}

export default function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <div className="w-full flex flex-col gap-12 lg:gap-16">
      
      {/* Content Grid (TOC + Main Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Sidebar: Table of Contents */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 hidden md:block">
          <div className="bg-transparent border border-border rounded-2xl p-6">
            <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-6">
              Table of Contents
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-light text-muted-foreground">
              <li className="flex items-center gap-2 text-accent cursor-pointer transition-colors hover:text-accent">
                <ChevronRight className="w-3 h-3" />
                Key Takeaways
              </li>
              <li className="flex items-center gap-2 cursor-pointer transition-colors hover:text-accent">
                <ChevronRight className="w-3 h-3" />
                The Shift to Human-Centric Lighting
              </li>
              <li className="flex items-center gap-2 cursor-pointer transition-colors hover:text-accent">
                <ChevronRight className="w-3 h-3" />
                Invisible Integration
              </li>
              <li className="flex items-center gap-2 cursor-pointer transition-colors hover:text-accent">
                <ChevronRight className="w-3 h-3" />
                Conclusion
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Key Takeaways */}
          <div className="bg-transparent border border-border rounded-2xl p-8">
            <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-4">Key Takeaways</h3>
            <ul className="flex flex-col gap-3 text-muted-foreground font-light text-sm md:text-base leading-relaxed list-disc list-inside">
              <li>Lighting is a fundamental architectural element, not just functional.</li>
              <li>Human-centric lighting aligns indoor environments with circadian rhythms.</li>
              <li>True luxury is invisible integration, hiding the source and emphasizing the effect.</li>
            </ul>
          </div>

          {/* Contextual Section (Blog Body) */}
          <article 
            className="prose prose-invert max-w-none prose-headings:font-light prose-headings:tracking-wide prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-accent hover:prose-a:text-accent/80"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Divider */}
          <div className="w-full h-[1px] bg-border/50 my-4" />

          {/* FAQ Section */}
          <div className="flex flex-col gap-6">
            <h3 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground">Frequently Asked Questions</h3>
            <div className="flex flex-col gap-4">
              {[
                { q: "How does human-centric lighting work?", a: "It adjusts color temperature and intensity throughout the day to mimic natural sunlight, supporting your natural circadian rhythm." },
                { q: "Can these systems be retrofitted?", a: "Yes, many modern automation systems offer wireless or minimally invasive retrofit options for existing homes." }
              ].map((faq, idx) => (
                <div key={idx} className="bg-transparent border border-border rounded-xl p-6">
                  <h4 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">{faq.q}</h4>
                  <p className="text-sm font-light text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-border/50 my-4" />

          {/* Bottom Social Share */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="tracking-[0.3em] text-xs sm:text-sm md:text-base text-foreground">Share this article</span>
            <div className="flex items-center gap-3">
              {[LinkIcon, Mail, Share2].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 rounded-full border border-border bg-background shadow-sm flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:bg-accent/5 transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Author Bio Section */}
          <div className="bg-transparent border border-border rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mt-4">
            <div className="w-20 h-20 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0 text-accent font-light text-2xl">
              AT
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h4 className="font-light leading-[1.2] tracking-wide text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">ATPL Team</h4>
              <p className="text-sm font-light text-muted-foreground leading-relaxed mb-4">
                The ATPL Team consists of industry-leading architectural technologists, lighting designers, and luxury automation engineers dedicated to redefining modern living spaces.
              </p>
              <button className="text-accent text-sm font-medium hover:underline self-center sm:self-start">
                View all articles by ATPL Team
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
