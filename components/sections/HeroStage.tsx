"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// one orbit, split in two: the far half is drawn behind the learner, the near half in front of him
const PHOTO = "/assets/img/hero/learner-960.webp";
const SIZES = "(max-width: 560px) 300px, (max-width: 960px) 360px, 400px";

const RING = "M20,100 A280,62 0 1,1 580,100 A280,62 0 1,1 20,100";

function Orbit({ half }: { half: "back" | "front" }) {
  const id = `stage-${half}`;
  return (
    <svg className={`stage__orbit stage__orbit--${half}`} viewBox="0 0 600 200" focusable="false" aria-hidden="true">
      <defs>
        {/* the ring's far half is above its centre line, the near half below it */}
        <clipPath id={id}><rect x="0" y={half === "back" ? 0 : 100} width="600" height="100" /></clipPath>
        <linearGradient id={`${id}-g`} x1="0" x2="1">
          <stop offset="0" stopColor="#7B6FD0" stopOpacity=".15" />
          <stop offset=".5" stopColor="#8F83E6" stopOpacity="1" />
          <stop offset="1" stopColor="#7B6FD0" stopOpacity=".15" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${id})`}>
        <path className="stage__ring" d={RING} pathLength={1} stroke={`url(#${id}-g)`} />
        {/* two light points travel the orbit, passing behind him and back out in front */}
        <circle className="stage__spark" r="4"><animateMotion dur="9s" repeatCount="indefinite" path={RING} /></circle>
        <circle className="stage__spark stage__spark--soft" r="3"><animateMotion dur="9s" begin="-4.5s" repeatCount="indefinite" path={RING} /></circle>
      </g>
    </svg>
  );
}

/**
 * Home hero visual: a learner stepping out of a deep-violet arch, an orbit that passes behind and in
 * front of him, a language switch, and a plaque with our numbers.
 *
 * The photo is a transparent cut-out, so layers sit truly behind and in front of him. Each layer drifts
 * with the pointer at its own depth (one rAF loop, only while the hero is on screen; still under reduced
 * motion and on touch). The laptop lid carries the Nunnari mark.
 *
 * The visor, jacket seams and watch are animated through masks cut from the photo itself
 * (public/assets/img/hero/fx/*.png, same frame as the photo; the lens and visor are traced outlines).
 * Replace them together with the photo. The visor and lens layers reuse the same image URL, so no extra download.
 */
export default function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll("svg").forEach((s) => s.pauseAnimations());
      return;
    }
    if (!matchMedia("(hover: hover)").matches) return;
    const s = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0, on = false;
    const tick = () => {
      s.x += (s.tx - s.x) * 0.08; s.y += (s.ty - s.y) * 0.08;
      el.style.setProperty("--px", s.x.toFixed(3)); el.style.setProperty("--py", s.y.toFixed(3));
      raf = on && (Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > 0.001) ? requestAnimationFrame(tick) : 0;
    };
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const host = el.closest(".hero") ?? el;
    const move = (e: Event) => { const p = e as PointerEvent; const r = el.getBoundingClientRect(); s.tx = Math.max(-1, Math.min(1, ((p.clientX - r.left) / r.width - 0.5) * 2)); s.ty = Math.max(-1, Math.min(1, ((p.clientY - r.top) / r.height - 0.5) * 2)); go(); };
    const leave = () => { s.tx = 0; s.ty = 0; go(); };
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on) go(); });
    io.observe(el);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => { io.disconnect(); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="stage" ref={ref}>
      <div className="stage__arch" aria-hidden="true"><span className="stage__dots" /></div>
      <Orbit half="back" />
      <div className="stage__learner">
        <div className="stage__figure">
          <Image src={PHOTO} alt="A Nunnari learner with a laptop, looking ahead" width={960} height={1440} sizes={SIZES} priority fetchPriority="high" />
          {/* the visor, cut out and rebuilt above the face: a soft contact shadow, then the visor itself,
              then the lens (its own pixels, slowly shifting through their iridescence) with a moving reflection and scan */}
          <span className="fx fx--vshadow" aria-hidden="true" />
          <span className="fx fx--visor" aria-hidden="true">
            <Image src={PHOTO} alt="" width={960} height={1440} sizes={SIZES} priority />
            <span className="fx fx--lens">
              <Image src={PHOTO} alt="" width={960} height={1440} sizes={SIZES} priority />
              <span className="fx__spec" />
              <span className="fx__scan" />
            </span>
          </span>
          {/* light that lives in the photo: each layer shows only through a mask cut from the photo itself */}
          <span className="fx fx--glow fx--hud" aria-hidden="true" />
          <span className="fx fx--glow fx--led" aria-hidden="true" />
          <span className="fx fx--glow fx--seams-bloom" aria-hidden="true" />
          <span className="fx fx--glow fx--seams" aria-hidden="true" />
          <span className="fx fx--glow fx--watch-bloom" aria-hidden="true" />
          <span className="fx fx--glow fx--watch" aria-hidden="true" />
        </div>
      </div>
      <Orbit half="front" />

      {/* we teach in both languages: the switch slides between them */}
      <div className="stage__lang" aria-hidden="true"><span>English</span><span lang="ta">தமிழ்</span></div>

      {/* one plaque at the base, our numbers in a row */}
      <div className="stage__plaque" aria-hidden="true">
        <div><b data-count="10000" data-suffix="+">10,000+</b><small>Learners trained</small></div>
        <div><b data-count="85" data-suffix="+">85+</b><small>Universities &amp; colleges</small></div>
        <div><b data-count="25" data-suffix="+">25+</b><small>Corporate &amp; government organisations</small></div>
      </div>
    </div>
  );
}
