import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinalCTA({ cinematic = false }: { cinematic?: boolean }) {
  return (
    <section className={(cinematic ? "cine-final " : "") + "relative overflow-hidden bg-navy-950 py-14 text-white sm:py-16 lg:py-20"}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(7,17,31,0.85)_70%)]" />
        <svg className="absolute inset-0 size-full opacity-30" aria-hidden>
          <circle cx="50%" cy="50%" r="120" fill="none" stroke="#12c98c" strokeOpacity="0.25" />
          <circle cx="50%" cy="50%" r="180" fill="none" stroke="#0f9aa8" strokeOpacity="0.2" />
          <circle cx="50%" cy="50%" r="240" fill="none" stroke="#ffffff" strokeOpacity="0.08" />
        </svg>
      </div>
      <Container className="kx-final-panel relative text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-soft">
          Next step
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          {cinematic ? <>Ready to power<br />your business?</> : "Ready to run your business differently?"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/65 sm:text-lg">
          Explore purpose-built business software for sales, people, finance, and commerce — built under the KAIONEX brand by Techloom.ai.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/book-demo" size="lg" withArrow>
            Book a Demo
          </Button>
          <Button href="/contact" size="lg" variant="outline">
            Talk to Our Team
          </Button>
        </div>
        {cinematic && <div className="cine-final-network" aria-hidden><span>POS</span><span>FMS</span><strong>KAIONEX</strong><span>E-Commerce</span><span>EMS</span></div>}
      </Container>
    </section>
  );
}
