"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "@/lib/clsx";

type Chapter = { id: string; label: string; title: string; text: string; img: string; alt: string; stats?: [number, string][] };

const chapters: Chapter[] = [
  {
    id: "mission", label: "Mission & vision", img: "/assets/img/mission-800.webp", alt: "A learner looking out over a city of AI possibilities",
    title: "Making AI learning accessible for everyone.",
    text: "We empower students and professionals with real AI skills, whatever their background, language or location.",
  },
  {
    id: "community-events", label: "Community & events", img: "/assets/img/community-800.webp", alt: "AI Tamil Nadu and ML.Cbe community meetups, workshops and expert talks",
    title: "A growing community of AI builders.",
    text: "Hands-on workshops, hackathons, expert talks and networking, together with AI Tamil Nadu and ML.Cbe.",
    stats: [[10000, "Community members"], [50, "Workshops & events"], [100, "Experts & speakers"]],
  },
  {
    id: "learners-partners", label: "Learners & partners", img: "/assets/img/learners-logo-800.webp", alt: "Nunnari Academy partners across government, enterprises, schools and universities",
    title: "Real people. Real progress.",
    text: "Our learners build projects, get placed, start ventures and work at leading companies.",
    stats: [[500, "Students trained"], [200, "Projects built"], [50, "Placements & internships"]],
  },
];

/** Who we are — a sticky illustration that cross-fades as the chapters scroll past. */
export default function WhoWeAre() {
  const wrap = useRef<HTMLDivElement>(null);
  const dashes = useRef<HTMLSpanElement>(null);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-48% 0px -48% 0px" });
    blocks.current.forEach((b) => b && io.observe(b));
    const w = wrap.current, d = dashes.current;
    let raf = 0, visible = false;
    const apply = () => { raf = 0; if (!w || !d) return; const r = w.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height)); d.style.setProperty("--story-p", (p * chapters.length).toFixed(3)); };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(apply); };
    const vio = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); });
    if (w) vio.observe(w);
    addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); vio.disconnect(); removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const go = (i: number) => blocks.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="story" ref={wrap}>
      <figure className="story__visual" aria-hidden="true">
        <div className="story__frame">
          {chapters.map((c, i) => (
            <Image key={c.id} src={c.img} alt="" fill sizes="(max-width: 960px) 0px, 560px" className={clsx("story__img", i === active && "is-active")} />
          ))}
        </div>
        <figcaption className="story__cap">
          <span>{chapters[active].label}</span>
          <span className="story__dashes" ref={dashes}>
            {chapters.map((c, i) => <button key={c.id} type="button" tabIndex={-1} aria-label={c.label} className={clsx(i === active && "is-active")} onClick={() => go(i)}><i /></button>)}
          </span>
        </figcaption>
      </figure>
      <div className="story__chapters">
        {chapters.map((c, i) => (
          <article key={c.id} id={c.id} data-i={i} ref={(el) => { blocks.current[i] = el; }} className={clsx("story__chapter", i === active && "is-active")} aria-label={c.label}>
            <div className="story__mobile-img"><Image src={c.img} alt={c.alt} width={800} height={1421} sizes="(max-width: 960px) 92vw, 1px" /></div>
            <h3 className="story__title">{c.title}</h3>
            <p className="story__text">{c.text}</p>
            {c.stats && (
              <div className="figures">
                {c.stats.map(([n, l]) => <div key={l}><strong data-count={n} data-suffix="+">{n.toLocaleString("en-IN")}+</strong><span>{l}</span></div>)}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
