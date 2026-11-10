"use client";

import { useEffect, useRef } from "react";
import Icon from "@/components/Icon";

/**
 * Community: a dotted globe that turns slowly, with arcs running out from Coimbatore and a pulse
 * travelling along each; the pointer leans the globe. Around it, the three things the community
 * offers (from the page's own copy). Paused off screen; still under reduced motion.
 */
const CBE: [number, number] = [11, 77];
const PLACES: [number, number][] = [[-34, 151], [51, 0], [40, -74], [1, 104], [25, 55], [35, 139]];

export default function Globe({ dark = false }: { dark?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const host = cv.parentElement!;
    const N = 900, pts: [number, number, number][] = [];
    for (let i = 0; i < N; i++) { const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996; pts.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
    const ll = (la: number, lo: number): [number, number, number] => { const a = (la * Math.PI) / 180, b = (lo * Math.PI) / 180; return [Math.cos(a) * Math.cos(b), Math.sin(a), Math.cos(a) * Math.sin(b)]; };
    const arcs = PLACES.map((p) => [ll(...CBE), ll(...p)] as const);
    let W = 0, H = 0, R = 0, raf = 0, visible = false, t0 = performance.now();
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    const dot = dark ? "221, 214, 248" : "91, 75, 196", arcC = dark ? "195, 188, 235" : "91, 75, 196";
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; R = Math.min(W, H) * 0.4; cv.width = Math.round(W * d); cv.height = Math.round(H * d); c.setTransform(d, 0, 0, d, 0, 0); if (reduced) draw(0); };
    const rot = (p: readonly [number, number, number], ry: number, rx: number): [number, number, number] => {
      const x = p[0] * Math.cos(ry) + p[2] * Math.sin(ry), z = -p[0] * Math.sin(ry) + p[2] * Math.cos(ry);
      const y = p[1] * Math.cos(rx) - z * Math.sin(rx), z2 = p[1] * Math.sin(rx) + z * Math.cos(rx);
      return [x, y, z2];
    };
    function draw(t: number) {
      ptr.x += (ptr.tx - ptr.x) * 0.06; ptr.y += (ptr.ty - ptr.y) * 0.06;
      const ry = t * 0.12 + ptr.x * 0.5 - 1.2, rx = 0.32 + ptr.y * 0.2, cx = W / 2, cy = H / 2;
      c.clearRect(0, 0, W, H);
      for (const p of pts) {
        const [x, y, z] = rot(p, ry, rx);
        const a = z > 0 ? 0.18 + 0.62 * z : 0.06;
        c.fillStyle = `rgba(${dot}, ${a.toFixed(3)})`;
        c.beginPath(); c.arc(cx + x * R, cy - y * R, z > 0 ? 1.4 : 0.9, 0, 6.29); c.fill();
      }
      arcs.forEach(([a, b], k) => {
        const ang = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])), s = Math.sin(ang) || 1;
        const at = (u: number): [number, number, number] => { const wa = Math.sin((1 - u) * ang) / s, wb = Math.sin(u * ang) / s, lift = 1 + 0.22 * Math.sin(Math.PI * u); return [(a[0] * wa + b[0] * wb) * lift, (a[1] * wa + b[1] * wb) * lift, (a[2] * wa + b[2] * wb) * lift]; };
        c.lineWidth = 1.2; c.beginPath();
        let moved = false;
        for (let i = 0; i <= 40; i++) {
          const [x, y, z] = rot(at(i / 40), ry, rx);
          if (z < -0.15) { moved = false; continue; }
          const X = cx + x * R, Y = cy - y * R;
          if (!moved) { c.moveTo(X, Y); moved = true; } else c.lineTo(X, Y);
        }
        c.strokeStyle = `rgba(${arcC}, 0.45)`; c.stroke();
        const u = ((t * 0.25 + k * 0.17) % 1), [px, py, pz] = rot(at(u), ry, rx);
        if (pz > -0.1) { c.fillStyle = `rgba(${arcC}, 0.95)`; c.beginPath(); c.arc(cx + px * R, cy - py * R, 2.6, 0, 6.29); c.fill(); }
      });
      const [hx, hy, hz] = rot(ll(...CBE), ry, rx);
      if (hz > 0) { c.fillStyle = dark ? "#FFFFFF" : "#120E33"; c.beginPath(); c.arc(cx + hx * R, cy - hy * R, 4, 0, 6.29); c.fill(); }
    }
    const loop = (now: number) => { raf = 0; if (!visible || document.hidden) return; draw((now - t0) / 1000); raf = requestAnimationFrame(loop); };
    const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(loop); };
    size();
    const ro = new ResizeObserver(size); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(cv);
    const move = (e: PointerEvent) => { const r = host.getBoundingClientRect(); ptr.tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ptr.ty = ((e.clientY - r.top) / r.height - 0.5) * 2; };
    const leave = () => { ptr.tx = 0; ptr.ty = 0; };
    if (!reduced) { host.addEventListener("pointermove", move); host.addEventListener("pointerleave", leave); }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); host.removeEventListener("pointermove", move); host.removeEventListener("pointerleave", leave); };
  }, [dark]);
  return (
    <div className={`globe${dark ? " globe--dark" : ""}`} aria-hidden="true">
      <canvas ref={ref} className="globe__canvas" />
      <span className="globe__chip globe__chip--1"><Icon name="users" />Networking</span>
      <span className="globe__chip globe__chip--2"><Icon name="calendar" />Events &amp; webinars</span>
      <span className="globe__chip globe__chip--3"><Icon name="globe" />Global opportunities</span>
    </div>
  );
}
