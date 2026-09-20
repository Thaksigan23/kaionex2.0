import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DemoChrome({
  title,
  subtitle,
  tone = "light",
  badge,
  children,
  className,
  footer,
}: {
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border shadow-kx-md",
        dark
          ? "border-white/12 bg-navy-900 text-white shadow-[0_18px_50px_rgba(7,17,31,0.45)]"
          : "border-black/[0.07] bg-white text-navy-900",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b px-3.5 py-2.5",
          dark ? "border-white/10 bg-white/[0.03]" : "border-black/5 bg-paper/60",
        )}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">{title}</p>
          {subtitle ? (
            <p
              className={cn(
                "text-[10px] uppercase tracking-wide",
                dark ? "text-white/40" : "text-slate-400",
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {badge}
          <span
            className={cn(
              "rounded-md px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide",
              dark ? "bg-white/10 text-white/55" : "bg-slate-100 text-slate-500",
            )}
          >
            Demo UI
          </span>
        </div>
      </div>
      {children}
      {footer ? (
        <div
          className={cn(
            "border-t px-3.5 py-2 text-[11px]",
            dark
              ? "border-white/10 text-white/45"
              : "border-black/5 text-slate-500",
          )}
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}
