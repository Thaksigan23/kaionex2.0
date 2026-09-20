import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact the KAIONEX team in Jaffna for demos, pricing, onboarding, and support.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team"
        description="Ask about KAIONEX products, pricing, demos, and onboarding. Reach the team by phone, email, or WhatsApp."
      />
      <section className="bg-white py-16 lg:py-24">
        <Container wide className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-black/5 bg-paper p-6">
            <h2 className="font-display text-2xl font-semibold text-navy-900">
              Contact details
            </h2>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address)}`}
              className="block text-slate-600 hover:text-navy-900"
            >
              {siteConfig.contact.address}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block text-slate-600 hover:text-navy-900"
            >
              {siteConfig.contact.email}
            </a>
            {siteConfig.contact.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="block text-slate-600 hover:text-navy-900"
              >
                {phone.label}
              </a>
            ))}
            <p className="text-slate-600">{siteConfig.contact.hours}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href="/book-demo" withArrow>
                Book a Demo
              </Button>
              <Button href={siteConfig.contact.whatsapp} external variant="secondary">
                Chat on WhatsApp
              </Button>
            </div>
          </div>
          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold text-navy-900">
              Send a message
            </h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}
