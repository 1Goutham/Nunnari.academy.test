"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { programs } from "@/lib/programs";
import { partners } from "@/lib/partners";
import { toolIcons } from "@/lib/toolIcons";
import Globe from "./Globe";

/**
 * Illustration panels as small, real-looking scenes of the thing itself (a lesson player, a week-by-week
 * tracker, partner figures, a calendar), built in HTML from the site's own facts.
 *
 * Interaction: the scene tilts toward the pointer and its layers move at different depths;
 * each scene has one quiet live detail. Everything is decorative (aria-hidden on the panel),
 * holds still off screen and under reduced motion.
 */

type L = { z?: number; i?: number; className: string; children: ReactNode };
const Layer = ({ z = 0, i = 0, className, children }: L) => (
  <div className={`vg__layer ${className}`} style={{ "--z": z, "--i": i } as CSSProperties}>{children}</div>
);

function Stage({ name, children }: { name: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // state lives in data attributes, so a re-render of the scene never resets it
    const io = new IntersectionObserver(([e]) => { el.toggleAttribute("data-on", e.isIntersecting); if (e.isIntersecting) el.setAttribute("data-seen", ""); }, { threshold: 0.25 });
    io.observe(el);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover)").matches) return () => io.disconnect();
    const host = el.parentElement ?? el;
    const s = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0;
    const tick = () => {
      s.x += (s.tx - s.x) * 0.1; s.y += (s.ty - s.y) * 0.1;
      el.style.setProperty("--px", s.x.toFixed(3)); el.style.setProperty("--py", s.y.toFixed(3));
      raf = Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => { const r = host.getBoundingClientRect(); s.tx = ((e.clientX - r.left) / r.width - 0.5) * 2; s.ty = ((e.clientY - r.top) / r.height - 0.5) * 2; go(); };
    const leave = () => { s.tx = 0; s.ty = 0; go(); };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => { io.disconnect(); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className={`vg vg--${name}`}><div className="vg__scene">{children}</div></div>;
}

/* ---------- programmes ---------- */

function Recorded() {
  const p = programs.recorded;
  return (
    <Stage name="recorded">
      <Layer z={6} i={0} className="vg-card vg-player">
        <div className="vg-player__screen">
          <span className="vg-play" />
          <span className="vg-player__lang"><b>English</b><b lang="ta">தமிழ்</b></span>
        </div>
        <div className="vg-player__meta">
          <strong>{p.outcomes[0].title}</strong>
          <span>{p.facts[2].sub}</span>
        </div>
        <div className="vg-bar"><i /></div>
      </Layer>
      <Layer z={16} i={1} className="vg-card vg-list">
        {p.outcomes.map((o, k) => <span key={o.title} className={k === 0 ? "is-now" : undefined}><em>{k + 1}</em>{o.title}</span>)}
      </Layer>
      <Layer z={24} i={2} className="vg-card vg-chip">
        <strong>{p.facts[1].title}</strong><span>{p.facts[1].sub}</span>
      </Layer>
    </Stage>
  );
}

function Regular() {
  const p = programs.regular;
  const weeks = parseInt(p.facts[1].title, 10) || 4;
  return (
    <Stage name="regular">
      <Layer z={6} i={0} className="vg-card vg-weeks">
        <div className="vg-head"><strong>{p.facts[1].title}</strong><span>{p.facts[1].sub}</span></div>
        {/* one cell per week of the program (from its duration fact, e.g. "4 Weeks") */}
        <div className="vg-weeks__grid" style={{ "--n": weeks, "--cols": Math.min(weeks, 6) } as CSSProperties}>
          {Array.from({ length: weeks }, (_, k) => <span key={k} style={{ "--k": k } as CSSProperties}>W{k + 1}</span>)}
        </div>
        <div className="vg-steps">{p.outcomes.map((o) => <span key={o.title}>{o.title}</span>)}</div>
      </Layer>
      <Layer z={20} i={1} className="vg-card vg-live">
        <span className="vg-live__dot" /><strong>{p.facts[2].title}</strong><span>{p.facts[2].sub}</span>
      </Layer>
      <Layer z={14} i={2} className="vg-card vg-tools">
        {p.tools.slice(0, 4).map((k) => <span key={k}>{toolIcons[k]?.title ?? k}</span>)}
      </Layer>
    </Stage>
  );
}

function Premium() {
  const p = programs.premium;
  return (
    <Stage name="premium">
      <Layer z={6} i={0} className="vg-card vg-level">
        <div className="vg-head"><strong>Advanced</strong><span>Experienced</span></div>
        <div className="vg-level__meter"><span>Essentials</span><span>Engineering</span><span className="is-on">Advanced</span></div>
        <div className="vg-level__rows">{p.outcomes.map((o) => <span key={o.title}>{o.title}</span>)}</div>
      </Layer>
      <Layer z={22} i={1} className="vg-card vg-seal">
        <span className="vg-seal__mark" />
        <strong>C-Suite</strong><span>Leadership</span>
      </Layer>
      <Layer z={14} i={2} className="vg-card vg-chip">
        <strong>{p.facts[1].title}</strong><span>{p.facts[1].sub}</span>
      </Layer>
    </Stage>
  );
}

/* ---------- partners ---------- */

const Stat = ({ s }: { s: [number, string, string] }) => (
  <><strong>{s[0].toLocaleString("en-IN")}{s[1]}</strong><span>{s[2]}</span></>
);

function Institutions() {
  const p = partners.institutions;
  const logos = p.logos.filter((l) => l.src).slice(0, 4);
  return (
    <Stage name="institutions">
      <Layer z={6} i={0} className="vg-card vg-logos">
        <div className="vg-head"><strong>Partner institutions</strong></div>
        {logos.map((l, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <span key={l.name} style={{ "--k": k } as CSSProperties}><img src={l.src} alt="" width={40} height={40} loading="lazy" /><em>{l.name}</em></span>
        ))}
      </Layer>
      <Layer z={22} i={1} className="vg-card vg-stat"><Stat s={p.stats[0]} /></Layer>
      <Layer z={14} i={2} className="vg-card vg-stat vg-stat--2"><Stat s={p.stats[1]} /></Layer>
    </Stage>
  );
}

function Corporates() {
  const p = partners.corporates;
  const d: [string, number][] = [["Generative AI & LLMs", 38], ["AI for Productivity", 32], ["Data Analytics & ML", 28], ["Prompt Engineering", 24]];
  return (
    <Stage name="corporates">
      <Layer z={6} i={0} className="vg-card vg-bars">
        <div className="vg-head"><strong>Training by domain</strong></div>
        {d.map(([n, v], k) => <span key={n} style={{ "--w": `${(v / 38) * 100}%`, "--k": k } as CSSProperties}><em>{n}</em><i /><b>{v}</b></span>)}
      </Layer>
      <Layer z={22} i={1} className="vg-card vg-stat"><Stat s={p.stats[0]} /></Layer>
      <Layer z={14} i={2} className="vg-card vg-stat vg-stat--2"><Stat s={p.stats[3]} /></Layer>
    </Stage>
  );
}

/* ---------- community and the Saturday session ---------- */

function Community() {
  // the community panel only appears in the dark closing band
  return <Globe dark />;
}

function Saturday() {
  // the month is the visitor's own, so it is drawn after mount (no server/client mismatch)
  const [cal, setCal] = useState<{ month: string; lead: number; days: number; today: number; next: number } | null>(null);
  useEffect(() => {
    const now = new Date(), y = now.getFullYear(), m = now.getMonth();
    const lead = (new Date(y, m, 1).getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
    const next = now.getDate() + ((6 - now.getDay() + 7) % 7);
    setCal({ month: now.toLocaleString("en-IN", { month: "long", year: "numeric" }), lead, days, today: now.getDate(), next: next <= days ? next : -1 });
  }, []);
  return (
    <Stage name="saturday">
      <Layer z={6} i={0} className="vg-card vg-cal">
        <div className="vg-head"><strong>{cal?.month ?? " "}</strong></div>
        <div className="vg-cal__grid">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, k) => <b key={k} className={k === 5 ? "is-sat" : undefined}>{d}</b>)}
          {cal && Array.from({ length: cal.lead }, (_, k) => <span key={`l${k}`} />)}
          {cal && Array.from({ length: cal.days }, (_, k) => {
            const day = k + 1, sat = (cal.lead + k) % 7 === 5;
            return <span key={day} className={[sat && "is-sat", day === cal.next && "is-next", day === cal.today && "is-today"].filter(Boolean).join(" ") || undefined}>{day}</span>;
          })}
        </div>
      </Layer>
      <Layer z={22} i={1} className="vg-card vg-invite">
        <strong>Free community session</strong><span>Every Saturday</span><em>Add to Calendar</em>
      </Layer>
    </Stage>
  );
}

const scenes: Record<string, () => ReactNode> = { recorded: Recorded, regular: Regular, premium: Premium, institutions: Institutions, corporates: Corporates, community: Community, saturday: Saturday };

export default function Vignette({ name }: { name: string }) {
  const S = scenes[name];
  return S ? <S /> : null;
}
