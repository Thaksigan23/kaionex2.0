import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "KAIONEX — One ecosystem to run your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoSvg = await readFile(
    join(process.cwd(), "public/brand/kaionex-logo.svg"),
  );
  const logoSrc = `data:image/svg+xml;base64,${logoSvg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(160deg, #07111f 0%, #0b1728 48%, #12233a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#ffffff",
            borderRadius: 12,
            padding: "14px 20px",
            width: 420,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={380} height={54} alt="KAIONEX" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: 920,
            }}
          >
            Run your entire business with KAIONEX.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.72)",
              maxWidth: 820,
            }}
          >
            POS · EMS · FMS · E-Commerce available · CRM coming soon — connected
            business software by Techloom.ai
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#5ee0b0" }}>kaionex.app</div>
      </div>
    ),
    { ...size },
  );
}
