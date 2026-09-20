import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for KAIONEX and how we handle contact and demo requests.",
  path: "/legal/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Legal"
        title="Privacy Policy"
        description="How KAIONEX handles information submitted through this website."
      />
      <section className="bg-white py-16">
        <Container className="prose prose-slate max-w-3xl text-sm leading-relaxed text-slate-600">
          <p>
            This website is operated by KAIONEX / Techloom.ai. When you submit a
            demo, contact, or waitlist request, we collect the details you
            provide — such as name, business name, email, phone, industry,
            company size, product interest, and message content — so we can
            respond to your inquiry.
          </p>
          <p className="mt-4">
            We use this information only to communicate about KAIONEX products,
            demos, pricing, onboarding, and related support. We do not sell your
            personal information.
          </p>
          <p className="mt-4">
            For privacy questions, contact{" "}
            <a className="text-brand" href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
