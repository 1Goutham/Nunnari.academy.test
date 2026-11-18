import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/*
 * Everything public is crawlable, including by AI search crawlers (named so the intent is explicit).
 * The form endpoint and the internal poster test page stay out of the index.
 */
const ai = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];
const disallow = ["/api/", "/testworkshop"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }, { userAgent: ai, allow: "/", disallow }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
