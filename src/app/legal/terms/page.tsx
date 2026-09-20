import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "Terms of service for the KAIONEX marketing website.",
  path: "/legal/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        tone="light"
        eyebrow="Legal"
        title="Terms of Service"
        description="Terms governing use of the KAIONEX marketing website."
      />
      <section className="bg-white py-16">
        <Container className="max-w-3xl text-sm leading-relaxed text-slate-600">
          <p>
            By using this website, you agree to use it for lawful purposes and
            not to misuse forms, content, or branding. Product availability,
            pricing, and features described on this site may change and should
            be confirmed during a demo or commercial discussion.
          </p>
          <p className="mt-4">
            Software subscriptions and implementation services are governed by
            separate commercial agreements with KAIONEX / Techloom.ai.
          </p>
          <p className="mt-4">
            Questions? Email{" "}
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
