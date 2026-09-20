import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { AnalyticsBeacon } from "@/components/analytics/AnalyticsBeacon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "KAIONEX pricing plans for startups, SMEs, and enterprises. Monthly or yearly billing in USD or LKR.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <AnalyticsBeacon name="pricing_view" props={{ location: "pricing" }} />
      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="Choose scalable plans designed for startups, SMEs, and enterprises. Pay for the modules and users your business needs."
      >
        <Button href="/book-demo" withArrow>
          Book a Demo
        </Button>
      </PageHero>
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
