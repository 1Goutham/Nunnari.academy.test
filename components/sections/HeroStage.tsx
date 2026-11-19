"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Icon from "@/components/Icon";

/**
 * Home hero visual: a student in a deep-violet arch, with three glass cards floating at
 * different depths around him.
 *
 * The photo is shot on black, so `mix-blend-mode: lighten` lets the arch's violet replace the
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
      <div className="stage__arch" aria-hidden="true" />
      <div className="stage__photo">
        <Image src="/assets/img/hero/student-1400.webp" alt="A student learning AI on his laptop" width={1400} height={1750}
          sizes="(max-width: 560px) 76vw, (max-width: 960px) 340px, 400px" priority fetchPriority="high" />
      </div>

      {/* three glass cards, each at its own depth (--z), placed clear of his face */}
      <div className="stage__card stage__card--stat" style={{ "--z": 28 } as React.CSSProperties} aria-hidden="true">
        <b data-count="10000" data-suffix="+">10,000+</b><small>learners trained</small>
      </div>
      <div className="stage__card stage__card--chat" style={{ "--z": 18 } as React.CSSProperties} aria-hidden="true">
        <span className="stage__icon"><Icon name="spark" /></span>
        <div>
          <b>AI tutor</b>
          <span className="stage__msg stage__msg--q">What is an AI agent?</span>
          <span className="stage__reply">
            <span className="stage__typing"><i /><i /><i /></span>
            <span className="stage__msg stage__msg--a" lang="ta">AI முகவர் என்றால் என்ன?</span>
          </span>
        </div>
      </div>
      <div className="stage__card stage__card--cert" style={{ "--z": 12 } as React.CSSProperties} aria-hidden="true">
        <span className="stage__icon"><Icon name="award" /></span>
        <div><b>Certificate</b><small>On completion</small></div>
      </div>
    </div>
  );
}
