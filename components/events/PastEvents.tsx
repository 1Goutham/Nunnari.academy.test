"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

type Item = { slug: string; title: string; start: string; end: string; mode: string; type: string; youtube?: string };

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/**
 * Past events as a quiet ledger: date, title, and on the right how it ran (or a link to the recording).
 * The cut-off is the visitor's own clock, so a session moves here once it has ended.
 */
export default function PastEvents({ items, builtAt, limit = 6 }: { items: Item[]; builtAt: number; limit?: number }) {
  const [now, setNow] = useState(builtAt);
  useEffect(() => setNow(Date.now()), []);
  const past = items.filter((w) => new Date(w.end || w.start).getTime() < now).sort((a, b) => +new Date(b.start) - +new Date(a.start)).slice(0, limit);
  if (!past.length) return null;
  return (
    <div className="past">
      <p className="past__label">Past events</p>
      <ul className="past__list">
        {past.map((w) => (
          <li key={w.slug}>
            <Link href={`/workshops/${w.slug}`} className="past__row">
              <span className="past__date">{fmt(w.start)}</span>
              <span className="past__title">{w.title}</span>
              <span className="past__meta">{w.youtube ? <>Watch the recording <Icon name="arrow-ur" /></> : <>{[w.type, w.mode].filter(Boolean).join(" · ")} <Icon name="arrow-ur" /></>}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
