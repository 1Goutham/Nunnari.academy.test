import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getWorkshops } from "@/lib/workshops";
import { programList, programPath } from "@/lib/programs";

/** Every indexable page, with the program and workshop URLs taken from their data. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("", 1, "weekly"),
    page("/programs", 0.9, "weekly"),
    ...programList.map((p) => page(programPath(p.key), 0.9, "weekly")),
    page("/partner/institutions", 0.8),
    page("/partner/corporates", 0.8),
    page("/explore", 0.8, "weekly"),
    ...getWorkshops().map((w) => ({ url: `${site.url}/workshops/${w.slug}`, lastModified: new Date(w.end || w.start), changeFrequency: "monthly" as const, priority: 0.6 })),
    page("/help", 0.5),
    page("/terms", 0.2, "yearly"),
    page("/privacy", 0.2, "yearly"),
    page("/refund", 0.2, "yearly"),
  ];
}
