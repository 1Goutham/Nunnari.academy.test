"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import Icon from "@/components/Icon";
import Marquee from "@/components/ui/Marquee";

type Chapter = { id: string; label: string; title: ReactNode; text: string; img: string; alt: string; stats?: [number, string][]; navy?: boolean; logos?: { src: string; name: string }[]; link: { href: string; label: string } };

// the companies we work with (Nunnari Labs client strip), white artwork for the dark glass strip
const partnerLogos = [
  ["landcom", "Landcom"], ["arb", "ARB Corporation"], ["martin-group", "Martin Group"], ["forge", "Forge Innovation & Ventures"], ["scaler", "Scaler"],
  ["icliniq", "iCliniq"], ["saasant", "Saasant"], ["2bfound", "2B Found"], ["tristha", "Tristha Global"], ["hearsight", "HearSight"],
].map(([f, name]) => ({ src: `/assets/clients/white/${f}.webp`, name }));

const chapters: Chapter[] = [
  {
    id: "mission", label: "Mission & vision", img: "/assets/img/about-mission.webp",
    alt: "A learner with a Nunnari Academy backpack looks towards a city at sunrise, under a globe circled by learning, community, AI and growth icons",
    title: <>Making AI learning accessible <span className="grad">for everyone.</span></>,
    text: "We empower students and professionals with real AI skills, whatever their background, language or location.",
    link: { href: "/programs", label: "Explore programs" },
  },
  {
    id: "community-events", label: "Community & events", img: "/assets/img/about-community-2.webp",
    alt: "A collage of our community: meetups, workshops, Google Developer Groups, expert panels and talks, above the Coimbatore skyline",
    title: <>A growing community of <span className="grad">AI builders.</span></>,
    text: "Hands-on workshops, hackathons, expert talks and networking, together with AI Tamil Nadu and ML.Cbe.",
    stats: [[10000, "Community members"], [50, "Workshops & events"], [100, "Experts & speakers"]],
    link: { href: "/explore", label: "View events" },
  },
  {
    id: "learners-partners", label: "Learners & partners", img: "/assets/img/about-academy.webp",
    alt: "The Nunnari Academy building beneath a glowing globe centred on India",
    title: <>Real people. <span className="grad">Real progress.</span></>,
    text: "Our learners build projects, get placed, start ventures and work at leading companies.",
    stats: [[500, "Students trained"], [200, "Projects built"], [50, "Placements & internships"]],
    navy: true,
    logos: partnerLogos,
    link: { href: "/partner/institutions", label: "Partner with us" },
  },
];

/**
 * Who we are: one card per chapter, copy on the left and the illustration on the right.
 * On wide screens the cards stack as you scroll; a card eases back as the next one slides over it.
 */
export default function WhoWeAre() {
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".about-card"));
    let raf = 0, visible = false;
    const apply = () => {
      raf = 0;
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const a = c.getBoundingClientRect(), b = next.getBoundingClientRect();
        // 0 while the next card is a full card-height below, 1 once it has slid over this one
        const p = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
        c.style.setProperty("--cover", p.toFixed(3));
      });
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(apply); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) onScroll(); });
    io.observe(el);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="about" ref={list}>
      {chapters.map((c, i) => (
        <article key={c.id} id={c.id} className="about-card" style={{ "--i": i } as React.CSSProperties}>
          <div className="about-card__copy">
            <p className="about-card__label"><span>0{i + 1}</span>{c.label}</p>
            <div className="about-card__body">
              <h3 className="about-card__title">{c.title}</h3>
              <p className="about-card__text">{c.text}</p>
            </div>
            {c.navy && <p className="about-card__navy"><Icon name="shield" /><span>Proud partners of the <b>Indian Navy</b></span></p>}
            {c.stats && (
              <div className="about-card__stats">
                {c.stats.map(([n, l]) => <div key={l}><strong data-count={n} data-suffix="+">{n.toLocaleString("en-IN")}+</strong><span>{l}</span></div>)}
              </div>
            )}
            <Link className="btn btn--ghost about-card__link" href={c.link.href}>{c.link.label} <Icon name="arrow" className="i--arrow" /></Link>
          </div>
          <div className="about-card__media">
            <Image src={c.img} alt={c.alt} width={1000} height={1093} sizes="(max-width: 960px) 92vw, 520px" className={c.logos ? "about-card__img--lift" : undefined} />
            {c.logos && (
              <div className="about-card__partners" aria-label="Our partners">
                <Marquee duration={32} className="about-card__marquee">
                  {c.logos.map((l) => <span key={l.name} className="about-card__logo"><Image src={l.src} alt={l.name} width={600} height={200} sizes="120px" loading="eager" /></span>)}
                </Marquee>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
