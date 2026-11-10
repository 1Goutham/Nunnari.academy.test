"use client";

import { useEffect, useRef } from "react";

/**
 * The Nunnari mark, alive: the logo's diamond lattice of nodes with its zigzag "N", drawn crisp.
 * - a signal travels along the N and each node flashes as it passes
 * - near the pointer, nodes lean toward it and connect to it with fine lines
 * - a click sends a ripple through the network
 * Paused off screen; drawn once, still, under reduced motion.
 */
const N: [number, number][] = [[-3, 1], [-2, 0], [-1, -1], [0, 0], [1, 1], [2, 0], [3, -1]];
const VIOLET = "108, 59, 255", INK = "20, 15, 54";

type Node = { gx: number; gy: number; x: number; y: number; ox: number; oy: number; k: number; ph: number; d0: number };

export default function HeroLattice() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const c: CanvasRenderingContext2D = ctx;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hero = cv.closest("section") ?? cv.parentElement!;

    const nodes: Node[] = [];
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      if ((dx + dy) % 2 !== 0 || Math.abs(dx) + Math.abs(dy) > 4) continue;
      nodes.push({ gx: dx, gy: dy, x: 0, y: 0, ox: 0, oy: 0, k: N.findIndex(([a, b]) => a === dx && b === dy), ph: Math.random() * 6.28, d0: Math.hypot(dx, dy) });
    }
    const pathNodes = N.map(([a, b]) => nodes.find((n) => n.gx === a && n.gy === b)!);
    const links: [Node, Node][] = [];
    nodes.forEach((a) => nodes.forEach((b) => { if (b.gx === a.gx + 1 && Math.abs(b.gy - a.gy) === 1) links.push([a, b]); }));

    let W = 0, H = 0, S = 0, cx = 0, cy = 0, dpr = 1;
    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      S = Math.min(W, H) / 9.6; cx = W / 2; cy = H / 2;
      nodes.forEach((n) => { n.x = cx + n.gx * S; n.y = cy + n.gy * S; });
      if (reduced) draw(performance.now(), true);
    };

    const ptr = { x: -1e4, y: -1e4, on: 0, tOn: 0 };
    const ripples: { x: number; y: number; t0: number }[] = [];
    let t0 = performance.now(), raf = 0, visible = false;

    const pos = (n: Node) => [n.x + n.ox, n.y + n.oy] as const;

    function draw(now: number, still = false) {
      const t = (now - t0) / 1000;
      c.clearRect(0, 0, W, H);
      const R = S * 3.2;
      ptr.on += (ptr.tOn - ptr.on) * 0.08;

      // nodes lean toward the pointer, and are pushed by ripples
      nodes.forEach((n) => {
        let tx = 0, ty = 0;
        if (!still) {
          const dx = ptr.x - n.x, dy = ptr.y - n.y, d = Math.hypot(dx, dy);
          const f = Math.max(0, 1 - d / R) * ptr.on;
          tx += dx * f * 0.22; ty += dy * f * 0.22;
          ripples.forEach((rp) => {
            const age = (now - rp.t0) / 1000, front = age * S * 9, dd = Math.hypot(n.x - rp.x, n.y - rp.y);
            const k = Math.exp(-Math.pow((dd - front) / (S * 0.9), 2)) * Math.max(0, 1 - age / 1.4);
            if (dd > 0.1) { tx += ((n.x - rp.x) / dd) * k * S * 0.35; ty += ((n.y - rp.y) / dd) * k * S * 0.35; }
          });
        }
        n.ox += (tx - n.ox) * 0.16; n.oy += (ty - n.oy) * 0.16;
      });

      // entrance: nodes appear from the centre, then the N draws itself
      const intro = still ? 9 : t;
      const shown = (n: Node) => Math.min(1, Math.max(0, (intro - n.d0 * 0.09) / 0.45));
      const drawN = Math.min(1, Math.max(0, (intro - 0.6) / 0.9));

      // faint lattice links
      c.lineWidth = 1;
      links.forEach(([a, b]) => {
        const al = 0.1 * Math.min(shown(a), shown(b));
        if (al <= 0) return;
        const [ax, ay] = pos(a), [bx, by] = pos(b);
        c.strokeStyle = `rgba(${VIOLET}, ${al})`; c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke();
      });

      // lines from the pointer to the nodes it reaches
      if (!still && ptr.on > 0.01) {
        nodes.forEach((n) => {
          const [x, y] = pos(n), d = Math.hypot(ptr.x - x, ptr.y - y), f = Math.max(0, 1 - d / R) * ptr.on;
          if (f <= 0.02) return;
          c.strokeStyle = `rgba(${VIOLET}, ${0.45 * f})`; c.lineWidth = 1;
          c.beginPath(); c.moveTo(ptr.x, ptr.y); c.lineTo(x, y); c.stroke();
        });
        c.fillStyle = `rgba(${VIOLET}, ${0.9 * ptr.on})`;
        c.beginPath(); c.arc(ptr.x, ptr.y, 3, 0, 6.29); c.fill();
      }

      // the N, drawn in ink
      const pts = pathNodes.map(pos);
      const segs = pts.length - 1, upto = drawN * segs;
      c.strokeStyle = `rgb(${INK})`; c.lineWidth = Math.max(2, S * 0.07); c.lineCap = "round"; c.lineJoin = "round";
      c.beginPath(); c.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i <= Math.ceil(upto) && i < pts.length; i++) {
        const f = Math.min(1, upto - (i - 1));
        c.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f);
      }
      if (drawN > 0) c.stroke();

      // the signal: runs the N every 4 seconds, with a fading trail
      const cyc = still ? -1 : ((t - 1.6) % 4) / 3;
      const at = (u: number) => { const s = Math.max(0, Math.min(segs, u * segs)), i = Math.min(segs - 1, Math.floor(s)), f = s - i; return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f]; };
      if (cyc >= 0 && cyc <= 1 && drawN >= 1) {
        for (let k = 0; k < 14; k++) {
          const u = cyc - k * 0.012;
          if (u < 0) break;
          const [x, y] = at(u);
          c.fillStyle = `rgba(${VIOLET}, ${0.55 * (1 - k / 14)})`;
          c.beginPath(); c.arc(x, y, Math.max(2, S * 0.07) * (1 - k / 20), 0, 6.29); c.fill();
        }
        const [hx, hy] = at(cyc);
        const g = c.createRadialGradient(hx, hy, 0, hx, hy, S * 0.6);
        g.addColorStop(0, `rgba(${VIOLET}, 0.35)`); g.addColorStop(1, `rgba(${VIOLET}, 0)`);
        c.fillStyle = g; c.beginPath(); c.arc(hx, hy, S * 0.6, 0, 6.29); c.fill();
      }

      // nodes
      nodes.forEach((n) => {
        const sh = shown(n);
        if (sh <= 0) return;
        const [x, y] = pos(n);
        const near = still ? 0 : Math.max(0, 1 - Math.hypot(ptr.x - x, ptr.y - y) / R) * ptr.on;
        const onN = n.k >= 0;
        const flash = onN && cyc >= 0 ? Math.exp(-Math.pow((cyc * segs - n.k) * 2.2, 2)) : 0;
        const breathe = still ? 1 : 1 + 0.06 * Math.sin(t * 1.4 + n.ph);
        const r = (onN ? S * 0.14 : S * 0.085) * breathe * (1 + near * 0.35 + flash * 0.45) * (0.4 + 0.6 * sh);
        c.fillStyle = onN ? (flash > 0.2 ? `rgb(${VIOLET})` : `rgb(${INK})`) : `rgba(${VIOLET}, ${(0.55 + near * 0.45) * sh})`;
        c.beginPath(); c.arc(x, y, r, 0, 6.29); c.fill();
      });

      // ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const age = (now - ripples[i].t0) / 1000;
        if (age > 1.4) { ripples.splice(i, 1); continue; }
        c.strokeStyle = `rgba(${VIOLET}, ${0.4 * (1 - age / 1.4)})`; c.lineWidth = 1.5;
        c.beginPath(); c.arc(ripples[i].x, ripples[i].y, age * S * 9, 0, 6.29); c.stroke();
      }
    }

    const loop = (now: number) => { draw(now); raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0; };
    const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(loop); };

    size();
    const ro = new ResizeObserver(size); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); }, { threshold: 0.05 });
    io.observe(cv);
    const move = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.tOn = 1; };
    const leave = () => { ptr.tOn = 0; };
    const down = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); const x = e.clientX - r.left, y = e.clientY - r.top; if (x >= 0 && y >= 0 && x <= W && y <= H) ripples.push({ x, y, t0: performance.now() }); };
    const vis = () => { if (!document.hidden && visible) start(); };
    if (!reduced) {
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", leave);
      hero.addEventListener("pointerdown", down);
      document.addEventListener("visibilitychange", vis);
    }
    t0 = performance.now();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); hero.removeEventListener("pointerdown", down);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);
  return <canvas ref={ref} className="hero__lattice" aria-hidden="true" />;
}
