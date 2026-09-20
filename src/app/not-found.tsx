import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="gradient-hero py-28 text-white">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
          This page is outside the ecosystem.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-white/65">
          The page you requested does not exist. Head back to KAIONEX or explore
          products and pricing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" withArrow>
            Back home
          </Button>
          <Button href="/products" variant="outline">
            Explore products
          </Button>
        </div>
        <p className="mt-8 text-sm text-white/45">
          Need help?{" "}
          <Link href="/contact" className="text-brand-soft hover:underline">
            Contact support
          </Link>
        </p>
      </Container>
    </section>
  );
}
