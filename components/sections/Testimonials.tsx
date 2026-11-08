"use client";

import { useEffect, useRef, useState } from "react";
import Marquee from "@/components/ui/Marquee";
import { learnerQuotes } from "@/lib/testimonials";

const Quote = ({ q }: { q: (typeof learnerQuotes)[number] }) => (
  <figure className="quote">
    <blockquote>“{q.quote}”</blockquote>
    <figcaption><b>{q.role}</b><span>{q.org}</span></figcaption>
  </figure>
);

/**
 * Learner quotes in two rows that drift in opposite directions. The loop runs only while it is on screen,
 * stops on hover and focus, holds still under reduced motion, and carries a visible pause control.
 */
export default function Testimonials() {
  const wrap = useRef<HTMLDivElement>(null);
  const [held, setHeld] = useState(false);
  const [seen, setSeen] = useState(false);
  const [over, setOver] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setHeld(true);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const running = seen && !over && !held;
  return (
    <div className={`marquee-wrap${running ? " is-running" : ""}`} ref={wrap}
      onPointerEnter={() => setOver(true)} onPointerLeave={() => setOver(false)} onFocus={() => setOver(true)} onBlur={() => setOver(false)}>
      <Marquee duration={70}>{learnerQuotes.slice(0, 5).map((q) => <Quote key={q.quote} q={q} />)}</Marquee>
      <Marquee duration={64} reverse>{learnerQuotes.slice(5).map((q) => <Quote key={q.quote} q={q} />)}</Marquee>
      <div className="container marquee__ctrl">
        <button className="btn btn--ghost" type="button" aria-pressed={held} onClick={() => setHeld((h) => !h)}>{held ? "Play the quotes" : "Pause the quotes"}</button>
      </div>
    </div>
  );
}
