import Link from "next/link";
import Icon from "@/components/Icon";
import Art from "@/components/ui/Art";
import AddToCalendar from "./AddToCalendar";
import { fmtDate, fmtDay, fmtTime } from "@/lib/format";
import { whenOf } from "@/lib/when";
import type { WorkshopCard } from "./EventCard";

/** Big workshop card at the top of /explore. */
export default function Spotlight({ w }: { w: WorkshopCard }) {
  return (
    <article className="featured" data-date={w.start} data-end={w.end} data-when={whenOf(w.start, w.end)} data-reveal="">
      <div className="featured__copy">
        <span className="tag tag--live" data-show="live" role="status">Happening now</span>
        <h3>{w.title}</h3>
        {w.description && <p>{w.description}</p>}
        <dl className="facts">
          <div><dt>{fmtDate(w.start)}</dt><dd>{fmtDay(w.start)}</dd></div>
          <div><dt>{fmtTime(w.start, w.end)}</dt><dd>{w.language ? `In ${w.language}` : "Live session"}</dd></div>
          <div><dt>{w.mode}</dt><dd>{w.type}</dd></div>
        </dl>
        <div className="actions">
          <span data-show="upcoming" style={{ display: "contents" }}>
            {w.register
              ? <a className="btn btn--primary btn--lg" href={w.register} target="_blank" rel="noopener">Register Now <Icon name="arrow-ur" className="i--ur" /></a>
              : <button className="btn btn--primary btn--lg" type="button" data-enquire={`Register: ${w.title}`}>Register Now <Icon name="arrow" className="i--arrow" /></button>}
            <AddToCalendar title={w.title} description={w.description} start={w.start} end={w.end} />
          </span>
          <Link data-show="past live" className="btn btn--ghost btn--lg" href={`/workshops/${w.slug}`}>{w.youtube ? "Watch the recording" : "Read the summary"} <Icon name="arrow" className="i--arrow" /></Link>
        </div>
      </div>
      <Art name={w.art} />
    </article>
  );
}
