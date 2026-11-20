import { site } from "@/lib/site";
import { programList, programPath } from "@/lib/programs";
import { partners } from "@/lib/partners";
import { getWorkshops } from "@/lib/workshops";
import { fmtDate } from "@/lib/format";

/*
 * /llms.txt: a plain-text brief of the academy for AI assistants and answer engines
 * (the llmstxt.org convention). Built from the same data as the pages, so it never drifts.
 */
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${site.url}${p}`;
  const programs = programList.map((p) => {
    const facts = p.facts.map((f) => [f.title, f.sub].filter(Boolean).join(" (") + (f.sub ? ")" : "")).join("; ");
    const faq = p.faq.slice(0, 3).map((f) => `  - ${f.q} ${f.a}`).join("\n");
    return `### [${p.name}](${u(programPath(p.key))})\n${p.lead}\n- Facts: ${facts}\n- Outcomes: ${p.outcomes.map((o) => o.title).join(", ")}\n${faq}`;
  }).join("\n\n");
  const workshops = getWorkshops().map((w) => `- [${w.title}](${u(`/workshops/${w.slug}`)}): ${w.type}, ${fmtDate(w.start)}, ${w.mode}${w.description ? `. ${w.description}` : ""}`).join("\n");
  const body = `# ${site.name}

> ${site.name} (நுண்ணறி Academy) is a school of AI offering practical, hands-on AI programs in English and Tamil, from first steps for school and college students to Generative AI, Agentic AI and AI leadership. It is backed by Nunnari Labs (Coimbatore, India) and DeepWeaver (Sydney, Australia).

Key facts:
- Three programs: GenAI Essentials (4 weeks), AI Engineering (4 weeks) and Advanced GenAI & Leadership (8 weeks).
- Taught in English and Tamil; online, and online or offline for AI Engineering and Advanced GenAI & Leadership.
- Every learner gets one year of access to the learning platform (LMS) and a completion certificate.
- 10,000+ learners trained, 85+ universities and colleges, 25+ corporate and government organisations.
- Community: 10,000+ members with AI Tamil Nadu and ML.Cbe; a free community session every Saturday.
- Contact: ${site.phone.label}, ${site.email}. The team responds within 24 to 48 hours.

## Programs

${programs}

## Partner with us

- [Institutional collaboration](${u("/partner/institutions")}): ${partners.institutions.lead}
- [Corporate AI training](${u("/partner/corporates")}): ${partners.corporates.lead}

## Workshops

${workshops}

## Other pages

- [All programs](${u("/programs")}): compare the three programs.
- [Explore](${u("/explore")}): workshops, recordings, testimonials and community.
- [Help & contact](${u("/help")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
