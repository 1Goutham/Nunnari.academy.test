"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Icon from "@/components/Icon";

/**
 * Home hero visual: a student in a deep-violet portal, with glass UI cards floating at
 * different depths around him and the Nunnari mark glowing behind.
 *
 * The photo is shot on black, so `mix-blend-mode: lighten` lets the portal's violet replace the
 * backdrop: the student reads as cut out without a mask. Cards lean towards the pointer
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
      {/* outside the portal: an orbit ring, a second arch offset behind for depth, and the dotted Nunnari mark */}
      <span className="stage__orbit" aria-hidden="true" />
      <span className="stage__plate" aria-hidden="true" />
      <svg className="stage__mark" viewBox="0 0 120 120" focusable="false" aria-hidden="true">
        {Array.from({ length: 7 }, (_, r) => Array.from({ length: 7 }, (_, c) => <circle key={`${r}${c}`} cx={12 + c * 16} cy={12 + r * 16} r="1.8" />))}
        <polyline points="20,76 44,52 60,68 76,52 100,76" />
      </svg>
      {/* the portal: a clean violet field (anything bright in it would show through the photo) */}
      <div className="stage__portal" aria-hidden="true"><span className="stage__glow" /></div>
      <div className="stage__photo">
        <Image src="/assets/img/hero/student-1400.webp" alt="A student learning AI on his laptop" width={1400} height={1750}
          sizes="(max-width: 960px) 80vw, 520px" priority fetchPriority="high" />
      </div>
      {/* a hairline rim on the arch, with a slow light sweeping round it */}
      <span className="stage__rim" aria-hidden="true" />

      {/* floating glass UI, each at its own depth (--z) */}
      <div className="stage__card stage__card--chat" style={{ "--z": 18 } as React.CSSProperties} aria-hidden="true">
        <span className="stage__ai"><Icon name="spark" /></span>
        <div>
          <b>AI tutor</b>
          <p>What is an AI agent?</p>
          {/* the reply: typing dots, then the Tamil answer (both in one grid cell, so the card never resizes) */}
          <span className="stage__reply">
            <span className="stage__typing"><i /><i /><i /></span>
            <p lang="ta">AI முகவர் என்றால் என்ன?</p>
          </span>
        </div>
      </div>
      <div className="stage__card stage__card--weeks" style={{ "--z": 26 } as React.CSSProperties} aria-hidden="true">
        <b>12-week programs</b>
        <span className="stage__bars">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ "--i": i } as React.CSSProperties} />)}</span>
        <small>Learn · Practise · Build</small>
      </div>
      <div className="stage__card stage__card--cert" style={{ "--z": 12 } as React.CSSProperties} aria-hidden="true">
        <span className="stage__badge"><Icon name="award" /></span>
        <div><b>Certificate</b><small>On completion</small></div>
      </div>
      <div className="stage__card stage__card--stat" style={{ "--z": 32 } as React.CSSProperties} aria-hidden="true">
        <b data-count="10000" data-suffix="+">10,000+</b><small>learners trained</small>
      </div>
    </div>
  );
}
