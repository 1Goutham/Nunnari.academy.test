import type { QA } from "@/components/ui/Accordion";
import { site } from "./site";
import { programs, programPath, programList, type ProgramKey } from "./programs";
import { toolIcons } from "./toolIcons";

/*
 * schema.org builders. Every value comes from the site's own content (lib/site, lib/programs,
 * the workshop files), so the structured data always matches what the page says.
 */
const abs = (path: string) => new URL(path, site.url).toString();
export const ORG_ID = `${site.url}/#organization`;
export const SITE_ID = `${site.url}/#website`;

export const organization = {
  "@type": ["EducationalOrganization", "Organization"],
  "@id": ORG_ID,
  name: site.name,
  alternateName: ["Nunnari Academy — School of AI", "நுண்ணறி Academy"],
  url: site.url,
  logo: { "@type": "ImageObject", url: abs("/assets/logos/academy-logo.png"), width: 339, height: 396 },
  image: abs("/opengraph-image"),
  description: site.description,
  slogan: "Your School of AI for the Skills of Tomorrow",
  email: site.email,
  telephone: site.phone.label.replace(/\s/g, ""),
  contactPoint: [{ "@type": "ContactPoint", contactType: "admissions", telephone: site.phone.label.replace(/\s/g, ""), email: site.email, availableLanguage: ["English", "Tamil"], areaServed: "IN" }],
  areaServed: { "@type": "Country", name: "India" },
  knowsLanguage: ["en", "ta"],
  knowsAbout: ["Artificial Intelligence", "Generative AI", "Agentic AI", "Machine Learning", "Deep Learning", "AI for business", "AI leadership"],
  parentOrganization: { "@type": "Organization", name: "Nunnari Labs", url: "https://nunnarilabs.com/", address: { "@type": "PostalAddress", addressLocality: "Coimbatore", addressRegion: "Tamil Nadu", addressCountry: "IN" } },
  sameAs: site.socials.map((s) => s.href),
};

export const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqPage = (items: QA[], path: string) => ({
  "@type": "FAQPage",
  "@id": `${abs(path)}#faq`,
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const level: Record<ProgramKey, string> = { recorded: "Beginner", regular: "Beginner to Intermediate", premium: "Advanced" };
const mode: Record<ProgramKey, string[]> = { recorded: ["Online"], regular: ["Online", "Onsite"], premium: ["Online", "Onsite"] };

export const course = (key: ProgramKey) => {
  const p = programs[key];
  return {
    "@type": "Course",
    "@id": `${abs(programPath(key))}#course`,
    name: p.name,
    url: abs(programPath(key)),
    description: p.lead,
    provider: { "@id": ORG_ID },
    inLanguage: ["en", "ta"],
    educationalLevel: level[key],
    timeRequired: "P12W",
    audience: { "@type": "EducationalAudience", audienceType: p.facts[0].title },
    teaches: [...p.outcomes.map((o) => o.title), ...p.tools.concat(p.packages).map((k) => toolIcons[k]?.title).filter(Boolean)],
    hasCourseInstance: mode[key].map((m) => ({ "@type": "CourseInstance", courseMode: m, courseWorkload: "P12W", inLanguage: ["en", "ta"] })),
  };
};

export const programItemList = () => ({
  "@type": "ItemList",
  name: "Nunnari Academy AI programs",
  itemListElement: programList.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(programPath(p.key)), name: p.name })),
});

export type EventInput = { slug: string; title: string; description: string; type: string; start: string; end: string; mode: string; speaker?: string; language?: string; register?: string; youtube?: string };

export const educationEvent = (w: EventInput, ytId?: string | null) => {
  const url = abs(`/workshops/${w.slug}`);
  const online = /online|webinar|virtual/i.test(`${w.mode} ${w.type}`);
  const free = /free/i.test(w.mode);
  const [speakerName, ...speakerRole] = (w.speaker ?? "").split(",");
  return {
    "@type": "EducationEvent",
    "@id": `${url}#event`,
    name: w.title,
    description: w.description || `${w.type} by ${site.name}.`,
    url,
    startDate: w.start,
    endDate: w.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: online ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
    location: online ? { "@type": "VirtualLocation", url } : { "@type": "Place", name: w.mode, address: { "@type": "PostalAddress", addressLocality: w.mode, addressCountry: "IN" } },
    image: [abs("/opengraph-image")],
    organizer: { "@id": ORG_ID },
    inLanguage: w.language === "Tamil" ? "ta" : "en",
    ...(w.speaker ? { performer: { "@type": "Person", name: speakerName.trim(), ...(speakerRole.length ? { jobTitle: speakerRole.join(",").trim() } : {}) } } : {}),
    ...(free ? { isAccessibleForFree: true, offers: { "@type": "Offer", price: 0, priceCurrency: "INR", availability: "https://schema.org/InStock", url: w.register || url } } : {}),
    ...(ytId ? { recordedIn: { "@type": "VideoObject", name: w.title, description: w.description || w.title, thumbnailUrl: `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`, uploadDate: w.end, embedUrl: `https://www.youtube.com/embed/${ytId}`, contentUrl: `https://www.youtube.com/watch?v=${ytId}` } } : {}),
  };
};
