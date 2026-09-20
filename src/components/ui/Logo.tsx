import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Official full lockup aspect ratio from kaionex-logo.svg viewBox */
const LOGO_ASPECT = 2521.339 / 354.547;

type LogoProps = {
  className?: string;
  href?: string;
  /** Kept for API compatibility — official asset colors are not altered. */
  tone?: "light" | "dark";
  /** Kept for API compatibility — official lockup always includes the wordmark. */
  showWordmark?: boolean;
  /**
   * Desktop visual height in pixels.
   * Mobile uses a slightly smaller CSS height for navbar breathing room.
   */
  height?: number;
  priority?: boolean;
};

export function Logo({
  className,
  href = "/",
  height = 28,
  priority = false,
}: LogoProps) {
  const width = Math.round(height * LOGO_ASPECT);
  const mobileHeight = Math.max(22, height - 4);

  return (
    <Link
      href={href}
      aria-label="KAIONEX home"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src="/brand/kaionex-logo.svg"
        alt="KAIONEX"
        width={width}
        height={height}
        priority={priority}
        unoptimized
        className="w-auto"
        style={{
          height: `clamp(${mobileHeight}px, 3.6vw, ${height}px)`,
          width: "auto",
        }}
      />
    </Link>
  );
}
