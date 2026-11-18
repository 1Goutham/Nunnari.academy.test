import localFont from "next/font/local";

/*
 * Self-hosted variable fonts via next/font: the Latin files are preloaded, and next/font generates
 * a size-adjusted fallback so the swap from the system font does not shift the layout (CLS).
 * Latin-ext (₹ and accented names) loads only when a page uses those glyphs.
 */
export const inter = localFont({ src: "../app/fonts/inter-latin-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--f-inter", adjustFontFallback: "Arial" });
export const interExt = localFont({ src: "../app/fonts/inter-latin-ext-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--f-inter-ext", preload: false, adjustFontFallback: false });
export const interTight = localFont({ src: "../app/fonts/inter-tight-latin-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--f-tight", adjustFontFallback: "Arial" });
export const interTightExt = localFont({ src: "../app/fonts/inter-tight-latin-ext-wght-normal.woff2", weight: "100 900", display: "swap", variable: "--f-tight-ext", preload: false, adjustFontFallback: false });
