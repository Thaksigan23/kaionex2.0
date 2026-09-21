import "./cinematic.css";
import dynamic from "next/dynamic";
import { EcosystemReveal } from "@/components/cinematic/EcosystemReveal";
import { ProductChapters } from "@/components/cinematic/ProductChapters";
import { CinematicOpening } from "@/components/cinematic/CinematicOpening";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyKaionex } from "@/components/sections/WhyKaionex";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { faqs } from "@/content/faq";

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
    <div className="kx-home kx-cinematic">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CinematicOpening />
      <ProductChapters />
      <EcosystemReveal />
      <TrustStrip />
      <WhyKaionex />
      <IndustrySelector />
      <DashboardPreview />
      <PricingSection compact />
      <FAQSection />
      <FinalCTA cinematic />
    </div>
  );
}
