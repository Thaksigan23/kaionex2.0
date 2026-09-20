import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { DemoForm } from "@/components/forms/DemoForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Book a Demo",
  description:
    "Book a KAIONEX demo tailored to your industry. Tell us about your business and the products you want to explore.",
  path: "/book-demo",
});

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="See KAIONEX connected to your operations."
        description="Tell us about your business and the KAIONEX products you want to explore. The team can then coordinate a walkthrough with you."
      />
      <section className="bg-white py-14 lg:py-20">
        <Container wide className="grid items-start gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <div className="rounded-2xl border border-black/5 bg-paper p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-semibold text-navy-900">What happens next</h2>
            <ol className="mt-5 space-y-5 text-sm leading-relaxed text-slate-600">
              <li><span className="font-semibold text-brand">01 · </span>Choose the products and share the business context you want to discuss.</li>
              <li><span className="font-semibold text-brand">02 · </span>Submit the form. If automated delivery is unavailable, continue through the email or WhatsApp handoff shown.</li>
              <li><span className="font-semibold text-brand">03 · </span>Once your request reaches the team, they can follow up to arrange a walkthrough.</li>
            </ol>
          </div>
          <div className="min-w-0"><DemoForm /></div>
        </Container>
      </section>
    </>
  );
}
