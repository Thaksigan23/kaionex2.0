import "./cinematic.css";
import dynamic from "next/dynamic";
import { HomeHero } from "@/components/hero/HomeHero";
import { ProductFamilyIntro } from "@/components/sections/ProductFamilyIntro";
import { HomePosSpotlight } from "@/components/sections/HomePosSpotlight";
import { WhyKaionex } from "@/components/sections/WhyKaionex";
import { HomeEmsSpotlight } from "@/components/sections/HomeEmsSpotlight";
import { HomeFmsSpotlight } from "@/components/sections/HomeFmsSpotlight";
import { HomeEcommerceSpotlight } from "@/components/sections/HomeEcommerceSpotlight";
import { HomeCrmTeaser } from "@/components/sections/HomeCrmTeaser";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { faqs } from "@/content/faq";

const IndustrySelector = dynamic(
  () =>
    import("@/components/sections/IndustrySelector").then(
      (m) => m.IndustrySelector,
    ),
  { ssr: true },
);
const PricingSection = dynamic(
  () =>
    import("@/components/sections/PricingSection").then((m) => m.PricingSection),
  { ssr: true },
);
const FAQSection = dynamic(
  () => import("@/components/sections/FAQSection").then((m) => m.FAQSection),
  { ssr: true },
);

export default function HomePage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="kx-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. DARK HERO: Refined Editorial Scale & Clean Software Product Visualization */}
      <HomeHero />

      {/* 2. LIGHT SECTION: Product Family Introduction (Built for the way your business works) */}
      <ProductFamilyIntro />

      {/* 3. DARK PRODUCT SPOTLIGHT: Large POS Counter Workstation Visual (~60% width) */}
      <HomePosSpotlight />

      {/* 4. LIGHT SECTION: Business Value & Why KAIONEX (Less fragmentation. More focus.) */}
      <WhyKaionex />

      {/* 5. DARK PRODUCT SPOTLIGHT: Large EMS Workforce Shift Console (~60% width, alternating) */}
      <HomeEmsSpotlight />

      {/* 6. DARK PRODUCT SPOTLIGHT: Large FMS General Ledger Cockpit (~60% width) */}
      <HomeFmsSpotlight />

      {/* 7. DARK PRODUCT SPOTLIGHT: Large E-Commerce Storefront & Fulfillment Bridge (~60% width) */}
      <HomeEcommerceSpotlight />

      {/* 8. CRM COMING SOON: Distinct, Elegant Future-Facing Teaser */}
      <HomeCrmTeaser />

      {/* 9. LIGHT SECTION: Industry Business Fit */}
      <IndustrySelector />

      {/* 10. LIGHT SECTION: Transparent Pricing Preview */}
      <PricingSection compact />

      {/* 11. LIGHT SECTION: Essential Questions (FAQ) */}
      <FAQSection />

      {/* 12. DARK CINEMATIC CLOSING: Final Call to Action */}
      <FinalCTA cinematic />
    </div>
  );
}
