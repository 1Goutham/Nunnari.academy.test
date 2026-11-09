"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "@/lib/clsx";

type Chapter = { id: string; label: string; title: ReactNode; text: string; img: string; alt: string; stats?: [number, string][] };

const chapters: Chapter[] = [
  {
    id: "mission", label: "Mission & vision", img: "/assets/img/mission-800.webp", alt: "A learner looking out over a city of AI possibilities",
    title: <>Making AI learning accessible <span className="grad">for everyone.</span></>,
    text: "We empower students and professionals with real AI skills, whatever their background, language or location.",
  },
  {
    id: "community-events", label: "Community & events", img: "/assets/img/community-800.webp", alt: "AI Tamil Nadu and ML.Cbe community meetups, workshops and expert talks",
    title: <>A growing community of <span className="grad">AI builders.</span></>,
    text: "Hands-on workshops, hackathons, expert talks and networking, together with AI Tamil Nadu and ML.Cbe.",
    stats: [[10000, "Community members"], [50, "Workshops & events"], [100, "Experts & speakers"]],
  },
  {
    id: "learners-partners", label: "Learners & partners", img: "/assets/img/learners-logo-800.webp", alt: "Nunnari Academy partners across government, enterprises, schools and universities",
    title: <>Real people. <span className="grad">Real progress.</span></>,
    text: "Our learners build projects, get placed, start ventures and work at leading companies.",
    stats: [[500, "Students trained"], [200, "Projects built"], [50, "Placements & internships"]],
  },
];

/** Who we are — a sticky illustration that cross-fades as the chapters scroll past. */
export default function WhoWeAre() {
  const wrap = useRef<HTMLDivElement>(null);
  const dashes = useRef<HTMLDivElement>(null);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const w = wrap.current, d = dashes.current;
    let raf = 0, visible = false;
    // the active chapter is the one whose centre is nearest the middle of the screen, so one is always active
    let current = -1;
    const apply = () => {
      raf = 0;
      if (!w || !d) return;
      const r = w.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      d.style.setProperty("--story-p", (p * chapters.length).toFixed(3));
      let best = 0, bestD = Infinity;
      blocks.current.forEach((b, i) => { if (!b) return; const br = b.getBoundingClientRect(); const dist = Math.abs(br.top + br.height / 2 - innerHeight / 2); if (dist < bestD) { bestD = dist; best = i; } });
      if (best !== current) { current = best; setActive(best); }
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(apply); };
    const vio = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); });
    if (w) vio.observe(w);
    addEventListener("scroll", onScroll, { passive: true });
    return () => { vio.disconnect(); removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const go = (i: number) => blocks.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="story" ref={wrap}>
      <div className="story__visual" aria-hidden="true">
        <div className="story__frame">
          {chapters.map((c, i) => (
            <Image key={c.id} src={c.img} alt="" fill sizes="(max-width: 960px) 0px, 560px" className={clsx("story__img", i === active && "is-active")} />
          ))}
          <div className="story__shade" />
          <div className="story__dashes" ref={dashes}>
            {chapters.map((c, i) => <button key={c.id} type="button" tabIndex={-1} aria-label={c.label} onClick={() => go(i)} style={{ "--i": i } as React.CSSProperties}><i /></button>)}
          </div>
        </div>
      </div>
      <div>
        {chapters.map((c, i) => (
          <article key={c.id} id={c.id} data-i={i} ref={(el) => { blocks.current[i] = el; }} className={clsx("story__chapter", i === active && "is-active")}>
            <div className="story__mobile-img"><Image src={c.img} alt={c.alt} width={800} height={1421} sizes="(max-width: 960px) 92vw, 1px" /></div>
            <p className="story__label">{c.label}</p>
            <h3 className="story__title">{c.title}</h3>
            <p className="story__text">{c.text}</p>
            {c.stats && (
              <div className="story__stats">
                {c.stats.map(([n, l]) => <div key={l}><strong data-count={n} data-suffix="+">{n.toLocaleString("en-IN")}+</strong><span>{l}</span></div>)}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
