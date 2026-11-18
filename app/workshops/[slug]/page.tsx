import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, educationEvent } from "@/lib/schema";
import Icon from "@/components/Icon";
import AddToCalendar from "@/components/events/AddToCalendar";
import YouTube from "@/components/events/YouTube";
import { Cta, PageHero } from "@/components/ui/Blocks";
import { getWorkshop, getWorkshops } from "@/lib/workshops";
import { fmtDate, fmtDay, fmtTime, youtubeId } from "@/lib/format";
import { whenOf } from "@/lib/when";

export const dynamicParams = false;
export function generateStaticParams() {
  return getWorkshops().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const w = getWorkshop((await params).slug);
  if (!w) return {};
  // description: the workshop's own line, then the facts (type, date, mode, speaker) so every page has a full, unique snippet
  const facts = `${w.type} on ${fmtDate(w.start)}, ${w.mode}${w.speaker ? `, with ${w.speaker.split(",")[0]}` : ""}.`;
  const desc = w.description ? `${w.description.replace(/\.?$/, ".")} ${facts}` : `${w.title}: a Nunnari Academy ${facts} Watch the recording and read the summary.`;
  return pageMeta({ title: `${w.title} | ${w.type}`, description: desc.length > 160 ? `${desc.slice(0, 157).replace(/\s+\S*$/, "")}…` : desc, path: `/workshops/${w.slug}`, type: "article" });
}

export default async function WorkshopPage({ params }: { params: Promise<{ slug: string }> }) {
  const w = getWorkshop((await params).slug);
  if (!w) notFound();
  const yt = youtubeId(w.youtube);
  return (
    <div data-date={w.start} data-end={w.end} data-when={whenOf(w.start, w.end)}>
      <JsonLd data={[educationEvent(w, yt), breadcrumbs([{ name: "Explore", path: "/explore" }, { name: w.title, path: `/workshops/${w.slug}` }])]} />
      <PageHero
        crumbs={[{ href: "/explore", label: "Explore" }, { href: "/explore#workshops", label: "Workshops" }, { href: `/workshops/${w.slug}`, label: w.title }]}
        pill={w.type}
        title={w.title}
        lead={w.description}
        art={w.art}
        facts={[
          { icon: "calendar", title: fmtDate(w.start), sub: fmtDay(w.start) },
          { icon: "clock", title: fmtTime(w.start, w.end), sub: w.language ? `In ${w.language}` : "Live session" },
          { icon: "monitor", title: w.mode, sub: w.type },
          ...(w.speaker ? [{ icon: "user" as const, title: w.speaker.split(",")[0], sub: w.speaker.split(",").slice(1).join(",").trim() || "Speaker" }] : []),
        ]}
        actions={<>
          <span data-show="upcoming" style={{ display: "contents" }}>
            {w.register
              ? <a className="btn btn--primary btn--lg" href={w.register} target="_blank" rel="noopener">Register Now <Icon name="arrow-ur" className="i--ur" /></a>
              : <button className="btn btn--primary btn--lg" type="button" data-enquire={`Register: ${w.title}`}>Register Now <Icon name="arrow" className="i--arrow" /></button>}
            <AddToCalendar title={w.title} description={w.description} start={w.start} end={w.end} />
          </span>
          <span data-show="live" className="tag tag--live">Happening now, registration closed</span>
          <a data-show="past" className="btn btn--primary btn--lg" href="#recording">{yt ? "Watch the recording" : "Read the summary"} <Icon name="arrow" className="i--arrow" /></a>
        </>}
      />

      <section className="section" id="recording">
        <div className="container" style={{ display: "grid", gap: 40, maxWidth: 900 }}>
          <div data-show="past" style={{ display: "grid", gap: 16 }}>
            <span className="pill">Recording</span>
            {yt ? <YouTube id={yt} title={w.title} /> : (
              <div className="video video--empty"><p>The recording will be published here soon. <a className="link" href="https://www.youtube.com/@NunnariAcademy-v6y" target="_blank" rel="noopener">Visit our YouTube <Icon name="arrow-ur" /></a></p></div>
            )}
          </div>
          {w.summaryHtml && (
            <div style={{ display: "grid", gap: 16 }}>
              <span className="pill"><span data-show="past">Summary</span><span data-show="upcoming live">About this session</span></span>
              <div className="prose" dangerouslySetInnerHTML={{ __html: w.summaryHtml }} />
            </div>
          )}
        </div>
      </section>

      <Cta
        art={w.art}
        title={<>Don’t miss the <span className="grad">next one.</span></>}
        lead="See every upcoming workshop and join the community to hear about new sessions first."
        actions={<a className="btn btn--primary btn--lg" href="/explore#workshops">All workshops <Icon name="arrow" className="i--arrow" /></a>}
      />
    </div>
  );
}
