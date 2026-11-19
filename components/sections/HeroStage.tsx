"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Home hero visual: a portrait in a deep-violet arch, a language switch, and a plaque with our numbers.
 *
 * The photo is shot on black, so `mix-blend-mode: lighten` lets the arch's violet replace the
 * backdrop: the student reads as cut out without a mask. Layers drift with the pointer
 * (one rAF loop, only while the hero is on screen; still under reduced motion and on touch).
 *
 * PLACEHOLDER PHOTO: Unsplash (free licence). Swap public/assets/img/hero/student-*.webp for a
 * consented photo of a real Nunnari learner, same crop (4:5, waist-up, dark background).
 */
export default function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover)").matches) return;
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
      <div className="stage__arch" aria-hidden="true" />
      <div className="stage__photo">
        <Image src="/assets/img/hero/student-1400.webp" alt="A student learning AI on his laptop" width={1400} height={1750}
          sizes="(max-width: 560px) 260px, (max-width: 960px) 300px, 340px" priority fetchPriority="high" />
      </div>

      {/* we teach in both languages: the switch slides between them */}
      <div className="stage__lang" aria-hidden="true"><span>English</span><span lang="ta">தமிழ்</span></div>

      {/* one plaque at the base of the arch, our numbers in a row */}
      <div className="stage__plaque" aria-hidden="true">
        <div><b data-count="10000" data-suffix="+">10,000+</b><small>Learners trained</small></div>
        <div><b data-count="85" data-suffix="+">85+</b><small>Universities &amp; colleges</small></div>
        <div><b data-count="25" data-suffix="+">25+</b><small>Corporate &amp; government organisations</small></div>
      </div>
    </div>
  );
}
