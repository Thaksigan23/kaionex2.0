import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyKaionex } from "@/components/sections/WhyKaionex";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { faqs } from "@/content/faq";

const ProductEcosystem = dynamic(
  () =>
    import("@/components/sections/ProductEcosystem").then(
      (m) => m.ProductEcosystem,
    ),
  { ssr: true },
);
const ProductShowcase = dynamic(
  () =>
    import("@/components/sections/ProductShowcase").then(
      (m) => m.ProductShowcase,
    ),
  { ssr: true },
);
const WorkflowStory = dynamic(
  () =>
    import("@/components/sections/WorkflowStory").then((m) => m.WorkflowStory),
  { ssr: true },
);
const IndustrySelector = dynamic(
  () =>
    import("@/components/sections/IndustrySelector").then(
      (m) => m.IndustrySelector,
    ),
  { ssr: true },
);
const DashboardPreview = dynamic(
  () =>
    import("@/components/sections/DashboardPreview").then(
      (m) => m.DashboardPreview,
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
      <Hero />
      <TrustStrip />
      <ProductEcosystem />
      <ProductShowcase />
      <WorkflowStory />
      <IndustrySelector />
      <DashboardPreview />
      <WhyKaionex />
      <PricingSection compact />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}
