import Icon, { type IconName } from "@/components/Icon";
import { ToolMark } from "./Tools";

/*
 * Section illustrations for the programme pages, built from the programme's own facts.
 * All decorative (aria-hidden): the same facts are in the copy beside them.
 */

const CHIP_ICONS: IconName[] = ["cpu", "layers", "trend", "code", "spark", "rocket"];

/** Skills: the headline fact on a glowing pedestal, roles or outcomes floating around it. */
export function SkillsHub({ core, chips }: { core: [string, string]; chips: string[] }) {
  const n = chips.length;
  return (
    <div className="hub" aria-hidden="true">
      <div className="hub__rings"><i /><i /><i /></div>
      <div className="hub__beam" />
      <div className="hub__core"><strong>{core[0]}</strong><span>{core[1]}</span></div>
      <ul className="hub__chips">
        {chips.map((c, i) => {
          const a = (-90 + (360 / n) * i + (n % 2 ? 0 : 180 / n)) * (Math.PI / 180);
          return (
            <li key={c} style={{ left: `${50 + Math.cos(a) * 42}%`, top: `${48 + Math.sin(a) * 36}%`, "--i": i } as React.CSSProperties}>
              <span className="hub__ico"><Icon name={CHIP_ICONS[i % CHIP_ICONS.length]} /></span>{c}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Who can join: a staircase that climbs through the programme's outcomes; a light walks up it. */
export function Stairs({ steps }: { steps: string[] }) {
  const n = steps.length, W = 520, H = 340, sw = 360 / n, sh = 170 / n, base = 300;
  const tops = steps.map((_, i) => ({ x: 70 + i * sw, y: base - (i + 1) * sh }));
  const path = tops.map((t, i) => `${i ? "L" : "M"} ${t.x + sw * 0.5} ${t.y - 6}`).join(" ");
  return (
    <div className="stairs" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} focusable="false">
        <defs>
          <linearGradient id="st-front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#ECE8FC" /></linearGradient>
          <linearGradient id="st-side" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#DDD6F8" /><stop offset="1" stopColor="#CFC7F4" /></linearGradient>
          <radialGradient id="st-glow"><stop offset="0" stopColor="#7B6FD0" stopOpacity=".55" /><stop offset="1" stopColor="#7B6FD0" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx={W / 2} cy={base + 14} rx={W * 0.42} ry="16" fill="url(#st-glow)" opacity=".7" />
        {tops.map((t, i) => (
          <g key={steps[i]} className="stairs__step" style={{ "--i": i } as React.CSSProperties}>
            <polygon className="stairs__side" points={`${t.x + sw},${t.y} ${t.x + sw + 18},${t.y - 12} ${t.x + sw + 18},${base - 12} ${t.x + sw},${base}`} fill="url(#st-side)" />
            <rect className="stairs__front" x={t.x} y={t.y} width={sw} height={base - t.y} fill="url(#st-front)" stroke="#DDD6F8" />
            <polygon className="stairs__top" points={`${t.x},${t.y} ${t.x + sw},${t.y} ${t.x + sw + 18},${t.y - 12} ${t.x + 18},${t.y - 12}`} />
            <text x={t.x + sw / 2} y={t.y + 26} textAnchor="middle" className="stairs__num">{String(i + 1).padStart(2, "0")}</text>
            <text x={t.x + sw / 2} y={t.y + 46} textAnchor="middle" className="stairs__label">{steps[i]}</text>
          </g>
        ))}
        <path d={path} className="stairs__trail" pathLength={1} />
        <g className="stairs__orb">
          <circle r="16" fill="url(#st-glow)" />
          <circle r="6" className="stairs__orb-core" />
          <animateMotion dur="7s" repeatCount="indefinite" path={path} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
        </g>
        <g transform={`translate(${tops[n - 1].x + sw * 0.5} ${tops[n - 1].y - 34})`} className="stairs__goal">
          <circle r="13" /><path d="M -5 0 L -1 4 L 6 -4" />
        </g>
      </svg>
    </div>
  );
}

/** The closing band: glass tiles carrying the programme's main tools, ringed by an orbit. */
export function ToolsOrbit({ tools }: { tools: string[] }) {
  const [main, ...rest] = tools;
  const spots: [number, number, number][] = [[16, 24, 0.9], [78, 18, 0.95], [86, 66, 0.85], [20, 74, 0.8], [52, 86, 0.75]];
  return (
    <div className="orbit" aria-hidden="true">
      <svg className="orbit__ring" viewBox="0 0 400 200" preserveAspectRatio="none" focusable="false"><ellipse cx="200" cy="100" rx="190" ry="70" /></svg>
      <div className="orbit__main"><ToolMark k={main} size={64} /></div>
      {rest.slice(0, spots.length).map((k, i) => (
        <div key={k} className="orbit__tile" style={{ left: `${spots[i][0]}%`, top: `${spots[i][1]}%`, "--s": spots[i][2], "--i": i } as React.CSSProperties}><ToolMark k={k} size={34} /></div>
      ))}
    </div>
  );
}

/** Packages and tools, side by side, the same on every programme. */
export function StackRows({ packages, tools, Grid }: { packages: string[]; tools: string[]; Grid: (p: { keys: string[] }) => React.ReactNode }) {
  return (
    <div className="stack">
      <div className="stack__group"><h3>Packages</h3><Grid keys={packages} /></div>
      <div className="stack__group"><h3>Tools</h3><Grid keys={tools} /></div>
    </div>
  );
}
