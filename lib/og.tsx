import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
 * Share image (1200 × 630) in the brand's deep violet: the academy logo, an eyebrow,
 * the page's headline and a supporting line. Rendered once at build time per route.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export async function ogImage({ eyebrow, title, line }: { eyebrow: string; title: string; line: string }) {
  const logo = await readFile(join(process.cwd(), "public/assets/brand/academy-horizontal-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", color: "#fff",
        background: "radial-gradient(70% 90% at 85% 0%, #3B2E8F 0%, transparent 60%), linear-gradient(160deg, #221A5C 0%, #120E33 65%, #0E0A26 100%)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={206} height={72} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#B3A9EA", marginBottom: 22 }}>{eyebrow}</div>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 700, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#D6D1F2", marginTop: 26, maxWidth: 980 }}>{line}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#B3A9EA" }}>nunnari.academy · English & Tamil</div>
      </div>
    ),
    ogSize,
  );
}
