"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import Icon from "@/components/Icon";
import Marquee from "@/components/ui/Marquee";

type ChapterId = "mission" | "community" | "learners";
type Chapter = { id: ChapterId; label: string; title: ReactNode; text: string; mv?: [string, string][]; stats?: [number, string][]; navy?: boolean; logos?: boolean; link: { href: string; label: string } };

const chapters: Chapter[] = [
  {
    id: "mission", label: "Mission & vision",
    title: <>Making AI learning accessible <span className="grad">for everyone.</span></>,
    text: "We empower students and professionals with real AI skills, whatever their background, language or location.",
    mv: [
      ["Mission", "We empower students and professionals with real AI skills, whatever their background, language or location."],
      ["Vision", "Practical, accessible, future-ready AI education, from India for global learners."],
    ],
    link: { href: "/programs", label: "Explore programs" },
  },
  {
    id: "community", label: "Community & events",
    title: <>A growing community of <span className="grad">AI builders.</span></>,
    text: "Hands-on workshops, hackathons, expert talks and networking, together with AI Tamil Nadu and ML.Cbe.",
    stats: [[10000, "Community members"], [50, "Workshops & events"], [100, "Experts & speakers"]],
    link: { href: "/explore", label: "View events" },
  },
  {
    id: "learners", label: "Learners & partners",
    title: <>Real people.<br /><span className="grad">Real progress.</span></>,
    text: "Our learners build projects, get placed, start ventures and work at leading companies.",
    stats: [[500, "Students trained"], [200, "Projects built"], [50, "Placements & internships"]],
    navy: true, logos: true,
    link: { href: "/partner/institutions", label: "Partner with us" },
  },
];

// the companies we work with (Nunnari Labs client strip), white artwork for the dark card
const partnerLogos = [
  ["landcom", "Landcom"], ["arb", "ARB Corporation"], ["martin-group", "Martin Group"], ["forge", "Forge Innovation & Ventures"], ["scaler", "Scaler"],
  ["icliniq", "iCliniq"], ["saasant", "Saasant"], ["2bfound", "2B Found"], ["tristha", "Tristha Global"], ["hearsight", "HearSight"],
].map(([f, name]) => ({ src: `/assets/clients/white/${f}.webp`, name }));

/*
 * The collage: our own photos, scattered on a plane larger than the frame.
 * x, y, w are % of the plane (desktop: the centre is kept clear for the card); d is depth (parallax);
 * ch lists the chapters a photo belongs to. Mobile uses its own staggered strip (see mobile()).
 */
type Photo = { src: string; w: number; h: number; alt: string; cap: string; ch: ChapterId[]; x: number; y: number; size: number; d: number };
const photos: Photo[] = [
  { src: "/assets/img/events/ai-session.webp", w: 1400, h: 933, alt: "An introductory AI session with students", cap: "An introductory AI session", ch: ["mission"], x: 7, y: 11, size: 15, d: 1.25 },
  { src: "/assets/img/events/nvidia-summit.webp", w: 1400, h: 1050, alt: "Our team at the NVIDIA AI Summit", cap: "NVIDIA AI Summit", ch: ["community"], x: 25.5, y: 3, size: 10.5, d: .8 },
  { src: "/assets/img/community/evening-meetup.webp", w: 1208, h: 468, alt: "Our community gathered for a group photo at an evening meetup", cap: "Community meetup", ch: ["community"], x: 39.5, y: 6, size: 18, d: 1.1 },
  { src: "/assets/img/events/devfest-talk.webp", w: 1400, h: 933, alt: "A talk on open models at DevFest", cap: "A talk on open models, DevFest", ch: ["community"], x: 66, y: 4.5, size: 12.5, d: .9 },
  { src: "/assets/img/events/tensorflow-meetup.webp", w: 1400, h: 1050, alt: "TensorFlow User Group Coimbatore meetup", cap: "TensorFlow User Group Coimbatore", ch: ["community"], x: 82, y: 17, size: 12.5, d: 1.3 },
  { src: "/assets/img/community/classroom.webp", w: 764, h: 330, alt: "A full classroom of learners with laptops", cap: "A full classroom", ch: ["mission"], x: 4, y: 41, size: 14, d: .85 },
  { src: "/assets/img/events/forge-launch.webp", w: 1400, h: 933, alt: "Students at a program launch at Forge Factory, Coimbatore", cap: "Program launch, Forge Factory", ch: ["mission"], x: 69, y: 42, size: 13.5, d: 1.15 },
  { src: "/assets/img/community/fta-panel.webp", w: 528, h: 268, alt: "A panel discussion at the India–EU FTA Conclave", cap: "India–EU FTA Conclave", ch: ["learners"], x: 84.5, y: 55, size: 11.5, d: .8 },
  { src: "/assets/img/events/devfest-team.webp", w: 1400, h: 1050, alt: "The DevFest 2023 Coimbatore volunteer team", cap: "DevFest 2023, Coimbatore", ch: ["community"], x: 16, y: 63, size: 13, d: 1.2 },
  { src: "/assets/img/community/speaker.webp", w: 428, h: 260, alt: "One of our team speaking at an event", cap: "On stage", ch: ["learners"], x: 2.5, y: 79, size: 10, d: .9 },
  { src: "/assets/img/community/hybrid-session.webp", w: 1080, h: 326, alt: "Members and guests at a hybrid session, with speakers joining on screen", cap: "A hybrid session", ch: ["learners", "community"], x: 39, y: 80, size: 18, d: 1 },
  { src: "/assets/img/community/panel-speaker.webp", w: 544, h: 264, alt: "A speaker on an industry panel", cap: "On an industry panel", ch: ["learners"], x: 64.5, y: 77, size: 12, d: 1.3 },
];
// mobile: a staggered two-row strip across a wide plane, dragged sideways
const mobile = (i: number) => ({ mx: 1.5 + i * 8.2, my: i % 2 ? 51 + (i % 3) * 3 : 7 + (i % 3) * 3, mw: [15, 13, 16.5, 14, 13.5, 16][i % 6] });

/**
 * Who we are: an explorable collage of our own photos with the three chapters in a card at its centre.
 * Move the pointer to pan (with depth), drag on touch; it drifts slowly when idle. The chapters advance
 * on their own (a thin timer under the active tab; paused on hover); choosing one brings its photos
 * forward, and clicking a photo opens its chapter. Still under reduced motion.
 */
export default function WhoWeAre() {
  const [active, setActive] = useState<ChapterId>("mission");
  const field = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);

  useEffect(() => {
    const f = field.current, p = plane.current;
    if (!f || !p) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0, visible = false, last = 0, drag: { x: number; y: number; tx: number; ty: number } | null = null;
    const max = () => ({ x: Math.max(0, (p.offsetWidth - f.offsetWidth) / 2), y: Math.max(0, (p.offsetHeight - f.offsetHeight) / 2) });
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
    const apply = () => { f.style.setProperty("--px", s.x.toFixed(1)); f.style.setProperty("--py", s.y.toFixed(1)); };
    const tick = (t: number) => {
      raf = 0;
      if (!visible) return;
      const m = max();
      // idle: a slow, wide drift so the collage feels alive
      if (!drag && t - last > 2200 && !reduced) { s.tx = Math.sin(t / 7000) * m.x * .45; s.ty = Math.cos(t / 9000) * m.y * .4; }
      s.x += (s.tx - s.x) * (reduced ? 1 : .06); s.y += (s.ty - s.y) * (reduced ? 1 : .06);
      apply();
      if (!reduced || Math.abs(s.tx - s.x) > .5) raf = requestAnimationFrame(tick);
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      const m = max();
      if (drag) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 6) dragged.current = true;
        s.tx = clamp(drag.tx + dx * 1.2, m.x); s.ty = clamp(drag.ty + dy * 1.2, m.y);
      } else if (e.pointerType === "mouse") {
        const r = f.getBoundingClientRect();
        s.tx = -((e.clientX - r.left) / r.width - .5) * 2 * m.x; s.ty = -((e.clientY - r.top) / r.height - .5) * 2 * m.y;
      } else return;
      last = performance.now(); go();
    };
    const down = (e: PointerEvent) => { dragged.current = false; if (e.pointerType !== "mouse" || e.button === 0) drag = { x: e.clientX, y: e.clientY, tx: s.tx, ty: s.ty }; };
    const up = () => { drag = null; last = performance.now(); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { f.classList.add("is-in"); go(); } }, { threshold: .15 });
    io.observe(f);
    f.addEventListener("pointermove", move);
    f.addEventListener("pointerdown", down);
    addEventListener("pointerup", up);
    addEventListener("pointercancel", up);
    return () => { io.disconnect(); f.removeEventListener("pointermove", move); f.removeEventListener("pointerdown", down); removeEventListener("pointerup", up); removeEventListener("pointercancel", up); cancelAnimationFrame(raf); };
  }, []);

  const next = () => setActive((a) => chapters[(chapters.findIndex((c) => c.id === a) + 1) % chapters.length].id);

  // tabs: arrow keys move between chapters
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = chapters.findIndex((c) => c.id === active);
    const n = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const next = chapters[(i + n + chapters.length) % chapters.length];
    setActive(next.id);
    document.getElementById(`who-tab-${next.id}`)?.focus();
  };

  return (
    <div className="who">
      <div className="who__field" ref={field} data-focus={active}>
        <div className="who__plane" ref={plane}>
          {photos.map((p, i) => {
            const m = mobile(i);
            return (
              <figure key={p.src} className="who__ph" data-ch={p.ch.join(" ")}
                style={{ "--x": p.x, "--y": p.y, "--w": p.size, "--d": p.d, "--i": i, "--mx": m.mx, "--my": m.my, "--mw": m.mw, aspectRatio: `${p.w} / ${p.h}` } as React.CSSProperties}
                onClick={() => { if (!dragged.current) setActive(p.ch[0]); }}>
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 760px) 180px, 280px" draggable={false} />
                <figcaption>{p.cap}</figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className="who__card">
        <div className="who__tabs" role="tablist" aria-label="Who we are" onKeyDown={onKey}>
          {chapters.map((c, i) => (
            <button key={c.id} id={`who-tab-${c.id}`} type="button" role="tab" aria-selected={active === c.id} aria-controls={`who-panel-${c.id}`}
              tabIndex={active === c.id ? 0 : -1} className="who__tab" onClick={() => setActive(c.id)}>
              <span>0{i + 1}</span>{c.label}
              {/* the active chapter's timer: when it fills, the next chapter opens (paused on hover; off under reduced motion) */}
              <i className="who__bar" aria-hidden="true">{active === c.id && <i key={c.id} onAnimationEnd={next} />}</i>
            </button>
          ))}
        </div>
        <div className="who__panels">
          {chapters.map((c) => (
            <div key={c.id} id={`who-panel-${c.id}`} role="tabpanel" aria-labelledby={`who-tab-${c.id}`} className="who__panel"
              data-on={active === c.id || undefined} inert={active !== c.id} aria-hidden={active !== c.id}>
              <h3 className="who__title">{c.title}</h3>
              {c.mv ? (
                <dl className="who__mv">{c.mv.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              ) : <p className="who__text">{c.text}</p>}
              {c.navy && <p className="who__navy"><Icon name="shield" /><span>Proud partners of the <b>Indian Navy</b></span></p>}
              {c.stats && (
                <div className="who__stats">
                  {c.stats.map(([n, l]) => <div key={l}><strong data-count={n} data-suffix="+">{n.toLocaleString("en-IN")}+</strong><span>{l}</span></div>)}
                </div>
              )}
              {c.logos && (
                <div className="who__logos" aria-label="Companies we work with">
                  <Marquee duration={30}>
                    {partnerLogos.map((l) => <span key={l.name} className="who__logo"><Image src={l.src} alt={l.name} width={600} height={200} sizes="96px" /></span>)}
                  </Marquee>
                </div>
              )}
              <Link className="btn btn--ghost who__link" href={c.link.href}>{c.link.label} <Icon name="arrow" className="i--arrow" /></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
