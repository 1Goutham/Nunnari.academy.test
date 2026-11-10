"use client";

import { useEffect, useRef } from "react";

/**
 * Flowing lines behind the hero: a band of fine, silky waves in the palette's dusty purple.
 * - they drift slowly, and shift with scroll
 * - the cursor presses a soft dent into them as it moves
 * One 2D canvas, about 30 paths a frame; paused off screen and in background tabs; drawn once, still,
 * under reduced motion.
 */
export default function FlowLines({ lines = 24, className = "" }: { lines?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = cv.parentElement!;
    let W = 0, H = 0, raf = 0, visible = false, t0 = performance.now(), last = 0, lastScroll = 0;
    const onScroll = () => { lastScroll = performance.now(); };
    addEventListener("scroll", onScroll, { passive: true });
    const p = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, on: 0, ton: 0 };

    const size = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(0);
    };

    function draw(t: number) {
      c.clearRect(0, 0, W, H);
      const scroll = Math.min(1, scrollY / Math.max(1, H));
      p.x += (p.tx - p.x) * 0.08; p.y += (p.ty - p.y) * 0.08; p.on += (p.ton - p.on) * 0.06;
      const step = Math.max(10, W / 90);
      for (let i = 0; i < lines; i++) {
        const k = i / (lines - 1);
        // a band that sweeps from lower left up to the right
        const base = H * (0.5 + 0.42 * k) - scroll * H * 0.12;
        const amp = H * (0.07 + 0.05 * Math.sin(k * 3.1));
        const a = 0.05 + 0.22 * Math.sin(Math.PI * k);
        c.strokeStyle = `rgba(98, 91, 137, ${a.toFixed(3)})`;
        c.lineWidth = 1;
        c.beginPath();
        for (let x = -step; x <= W + step; x += step) {
          const u = x / W;
          let y = base
            - u * H * 0.42
            + amp * Math.sin(u * 5.2 + t * 0.18 + k * 0.9)
            + amp * 0.35 * Math.sin(u * 9.0 - t * 0.27 + k * 1.6);
          // the cursor presses a soft dent into the lines
          const dx = x - p.x, dy = y - p.y, d2 = dx * dx + dy * dy, R = Math.min(W, H) * 0.22;
          y += p.on * Math.exp(-d2 / (R * R)) * (dy >= 0 ? 1 : -1) * R * 0.32;
          if (x <= -step + 0.01) c.moveTo(x, y); else c.lineTo(x, y);
        }
        c.stroke();
      }
    }

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      // ~40fps is plenty for slow lines; they hold still while the page scrolls, so scrolling stays smooth
      if (now - lastScroll > 160 && now - last > 24) { last = now; draw((now - t0) / 1000); }
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(loop); };

    size();
    const ro = new ResizeObserver(size); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0 });
    io.observe(cv);
    const move = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); p.tx = e.clientX - r.left; p.ty = e.clientY - r.top; if (p.x < -1e3) { p.x = p.tx; p.y = p.ty; } p.ton = 1; };
    const leave = () => { p.ton = 0; };
    const vis = () => { if (!document.hidden) start(); };
    if (!reduced) {
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
      document.addEventListener("visibilitychange", vis);
    }
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener("scroll", onScroll);
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [lines]);
  return <canvas ref={ref} className={`flowlines ${className}`} aria-hidden="true" />;
}
