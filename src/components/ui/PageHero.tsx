import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  tone?: "dark" | "light";
  children?: React.ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  badge,
  tone = "dark",
  children,
  className,
}: PageHeroProps) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "relative overflow-hidden py-16 lg:py-24",
        dark ? "gradient-hero text-white" : "bg-paper text-navy-900",
        className,
      )}
    >
      <Container wide className="relative">
        {badge ? (
          <Badge tone={dark ? "soft" : "brand"} className="mb-4">
            {badge}
          </Badge>
        ) : null}
        {eyebrow ? (
          <p
            className={cn(
              "mb-3 text-xs font-semibold uppercase tracking-[0.18em]",
              dark ? "text-brand-soft" : "text-brand",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-relaxed sm:text-lg",
              dark ? "text-white/70" : "text-slate-500",
            )}
          >
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </Container>
    </section>
  );
}
