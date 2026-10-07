import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | AT Smart Living',
  description: 'Privacy policy and data protection standards for AT Smart Living (Anusha Technovision Pvt. Ltd.).',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-background pt-32 pb-24 px-5 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto w-full">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] text-accent uppercase">
              Legal & Compliance
            </span>
            <div className="h-px w-12 bg-border" />
          </div>
          <h1 className="text-foreground text-balance">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted font-light mt-3">
            Last Updated: October 2026 • Anusha Technovision Pvt. Ltd. (ATPL)
          </p>
          <div className="w-full h-px bg-foreground/10 mt-8" />
        </header>

        <article className="text-base md:text-lg font-light leading-relaxed text-foreground/80 space-y-10">
          <section className="space-y-3">
            <h3 className="text-foreground text-xl md:text-2xl font-normal">1. Introduction</h3>
            <p>
              AT Smart Living (“ATPL”, “we”, “our”, or “us”) respects your privacy and is dedicated to safeguarding the personal data you share with us. This Privacy Policy describes how we collect, store, utilize, and protect your information when you visit our website, submit project inquiries, visit our experience centres, or engage our architectural automation services.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-foreground text-xl md:text-2xl font-normal">2. Information We Collect</h3>
            <p>We may collect personal and technical information including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contact Information:</strong> Full name, email address, phone number, and physical or site address.</li>
              <li><strong>Project Specifics:</strong> Architectural blueprints, residence or commercial space type, scope of automation, and aesthetic preferences.</li>
              <li><strong>Career Submissions:</strong> Resumes, employment history, portfolios, and job role preferences.</li>
              <li><strong>Technical Data:</strong> Browser user agent, IP address, general geographic location, and interaction events via session analytics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-foreground text-xl md:text-2xl font-normal">3. How We Use Your Data</h3>
            <p>We process your data strictly for legitimate business and client-service operations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Scheduling private walkthroughs at our experience centres in Delhi, Mumbai, and Bengaluru.</li>
              <li>Preparing bespoke engineering proposals, technical quotations, and system architecture plans.</li>
              <li>Fulfilling warranties, defect liability services, and ongoing maintenance contracts (AMC).</li>
              <li>Sending curated editorial publications, architectural case studies, and corporate announcements (only with opt-in consent).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-foreground text-xl md:text-2xl font-normal">4. Data Sharing & Third Parties</h3>
            <p>
              We do not sell, rent, or lease your personal information to third parties. We may share relevant project details solely with authorized OEM equipment partners (such as Lutron, Crestron, or architectural lighting specialists) strictly to the extent necessary to procure, program, or commission your customized systems.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-foreground text-xl md:text-2xl font-normal">5. Security Standards</h3>
            <p>
              We enforce multi-tiered organizational and technical safeguards, including TLS encryption in transit, strict database access controls, and parameterized API handling, to prevent unauthorized access, alteration, or disclosure of your data.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-foreground text-xl md:text-2xl font-normal">6. Your Rights</h3>
            <p>
              Under applicable Indian data privacy regulations and international guidelines, you have the right to request access to, correction of, or deletion of your personal records stored in our systems. You may opt out of our email communications at any time.
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-border">
            <h3 className="text-foreground text-xl md:text-2xl font-normal">7. Contact the Privacy Concierge</h3>
            <p>
              For questions concerning this Privacy Policy, please contact our legal and administrative team:
            </p>
            <div className="bg-panel p-6 rounded-2xl border border-border space-y-2 text-sm md:text-base">
              <p><strong>Anusha Technovision Pvt. Ltd. (ATPL)</strong></p>
              <p>Okhla Industrial Area, Phase 2, New Delhi, DL 110020</p>
              <p>Email: <a href="mailto:privacy@atsmartliving.com" className="text-accent underline">privacy@atsmartliving.com</a></p>
              <p>Phone: <a href="tel:+911141610000" className="text-accent underline">+91 11 4161 0000</a></p>
            </div>
          </section>
        </article>

        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between text-sm text-muted">
          <Link href="/terms" className="hover:text-foreground transition-colors underline">
            View Terms and Conditions
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors underline">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
