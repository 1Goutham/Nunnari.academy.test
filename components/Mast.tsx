"use client";

import { useEffect, useRef } from "react";

const word = (text: string, cls?: string) => (
  <span className={cls}>{text.split("").map((c, i) => <span key={i} className="mast__l">{c}</span>)}</span>
);

/**
 * The footer mast: "Nunnari Academy" set large. The face is variable, so as the cursor passes,
 * the letters near it trade weight: the bold word thins and the light word thickens.
 * Still under reduced motion and on touch screens.
 */
export default function Mast() {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover)").matches) return;
    const letters = [...el.querySelectorAll<HTMLElement>(".mast__l")];
    const bold = letters.map((l) => !l.closest(".mast__a"));
    let raf = 0, mx = -1e4, my = -1e4, centres: [number, number][] = [];
    const measure = () => { centres = letters.map((l) => { const r = l.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }); };
    const apply = () => {
      raf = 0;
      letters.forEach((l, i) => {
        const [x, y] = centres[i] ?? [0, 0];
        const f = Math.max(0, 1 - Math.hypot(x - mx, y - my) / 240);
        l.style.setProperty("--wg", String(Math.round(bold[i] ? 700 - 300 * f : 400 + 300 * f)));
      });
    };
    const move = (e: PointerEvent) => { if (!centres.length) measure(); mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
    const leave = () => { mx = my = -1e4; centres = []; if (!raf) raf = requestAnimationFrame(apply); };
    el.addEventListener("pointerenter", measure);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    addEventListener("scroll", leave, { passive: true });
    return () => { el.removeEventListener("pointerenter", measure); el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); removeEventListener("scroll", leave); cancelAnimationFrame(raf); };
  }, []);
  return (
    <p className="mast" aria-hidden="true" ref={ref}>
      <span className="mast__w">{word("Nunnari")} {word("Academy", "mast__a")}</span>
    </p>
  );
}
