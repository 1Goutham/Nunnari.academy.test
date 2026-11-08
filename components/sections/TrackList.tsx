"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { tracks } from "@/lib/programs";

/** 12-week tracks as rows: three shown, "Explore All Programmes" opens the rest. */
export default function TrackList() {
  const [all, setAll] = useState(false);
  return (
    <>
      <ul className="tracks" id="track-list">
        {(all ? tracks : tracks.slice(0, 3)).map((t, i) => (
          <li key={t.title} className={i >= 3 ? "is-new" : undefined} style={i >= 3 ? ({ "--i": i - 3 } as React.CSSProperties) : undefined}>
            <h3>{t.title}</h3>
            <span className="tag">{t.tag}</span>
            <p>{t.desc}</p>
            <span className="weeks">12 weeks</span>
          </li>
        ))}
      </ul>
      <div className="tracks__more">
        <button className="btn btn--ghost btn--lg" type="button" aria-expanded={all} aria-controls="track-list" onClick={() => setAll((v) => !v)}>
          {all ? "Show fewer" : "Explore All Programmes"} <Icon name="chevron" />
        </button>
      </div>
    </>
  );
}
