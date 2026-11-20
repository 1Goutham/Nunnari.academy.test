import type { Metadata } from "next";
import { site } from "./site";

/**
 * One place for page metadata: a keyword-led title, a 140–160 character description,
 * a self-referencing canonical, and matching Open Graph / Twitter tags.
 * Share images come from the file-based opengraph-image routes.
 */
// routes that render their own share image (app/**/opengraph-image.tsx); every other page uses the site image
const OWN_IMAGE = new Set(["/programs", "/programs/genai-essentials", "/programs/ai-engineering", "/programs/advanced-genai-leadership", "/partner/institutions", "/partner/corporates", "/explore"]);
const shareImageFor = (path: string, alt: string) => ({ url: OWN_IMAGE.has(path) ? `${path}/opengraph-image` : "/opengraph-image", width: 1200, height: 630, alt });

export function pageMeta({ title, description, path, absoluteTitle, type = "website" }: {
  title: string; description: string; path: string; absoluteTitle?: boolean; type?: "website" | "article";
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const shareImage = shareImageFor(path, fullTitle);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    // a page's own openGraph replaces the inherited one, so the site share image is the fallback here;
    // routes with their own opengraph-image file override it
    openGraph: { type, siteName: site.name, locale: "en_IN", url: path, title: fullTitle, description, images: [shareImage] },
    twitter: { card: "summary_large_image", site: "@NunnariLabs", title: fullTitle, description, images: [shareImage.url] },
  };
}
