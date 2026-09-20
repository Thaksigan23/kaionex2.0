import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "brand" | "neutral" | "warning" | "dark" | "soft";
};

const tones = {
  brand: "bg-brand/15 text-brand border-brand/20",
  soft: "bg-white/10 text-white/85 border-white/15",
  neutral: "bg-slate-100 text-slate-700 border-black/5",
  warning: "bg-amber/15 text-amber border-amber/20",
  dark: "bg-navy-900 text-white border-white/10",
};

export function Badge({ children, className, tone = "brand" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
