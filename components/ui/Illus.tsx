import Icon, { type IconName } from "@/components/Icon";
import { ToolMark } from "./Tools";

/*
 * Section illustrations for the programme pages, built from the programme's own facts.
 * All decorative (aria-hidden): the same facts are in the copy beside them.
 */

const CHIP_ICONS: IconName[] = ["cpu", "layers", "trend", "code", "spark", "rocket"];

/** Skills: the headline fact on a lit pedestal under a beam, connected to the roles or outcomes around it. */
export function SkillsHub({ core, chips }: { core: [string, string]; chips: string[] }) {
  // two aligned columns either side of the core: left chips end at 31%, right chips start at 69%
  const n = chips.length, nl = Math.ceil(n / 2);
  const pos = chips.map((_, i) => {
    const left = i < nl, k = left ? i : i - nl, m = left ? nl : n - nl;
    const y = m === 1 ? 50 : 16 + (68 / (m - 1)) * k;
    return { x: left ? 31 : 69, y, left };
  });
  return (
    <div className="hub" aria-hidden="true">
      <svg className="hub__art" viewBox="0 0 100 80" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="hub-side" x1="0" x2="1"><stop offset="0" stopColor="#CFC7F4" /><stop offset=".5" stopColor="#F3F0FD" /><stop offset="1" stopColor="#B3A9EA" /></linearGradient>
          <linearGradient id="hub-beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#7B6FD0" stopOpacity=".45" /><stop offset="1" stopColor="#7B6FD0" stopOpacity="0" /></linearGradient>
          <radialGradient id="hub-floor"><stop offset="0" stopColor="#7B6FD0" stopOpacity=".35" /><stop offset="1" stopColor="#7B6FD0" stopOpacity="0" /></radialGradient>
        </defs>
        <ellipse cx="50" cy="63" rx="40" ry="11" fill="url(#hub-floor)" />
        <ellipse cx="50" cy="63" rx="30" ry="7.5" className="hub__ring" />
        <ellipse cx="50" cy="63" rx="21" ry="5.2" className="hub__ring hub__ring--2" />
        {pos.map((p, i) => { const y = p.y * 0.8, ex = p.left ? 41 : 59; return <path key={i} d={`M ${ex} 30 C ${(ex + p.x) / 2} 30 ${(ex + p.x) / 2} ${y} ${p.x} ${y}`} className="hub__wire" style={{ "--i": i } as React.CSSProperties} pathLength={1} />; })}
        <polygon points="40,58 60,58 56,24 44,24" fill="url(#hub-beam)" />
        <path d="M 38 56 L 38 60 A 12 3.2 0 0 0 62 60 L 62 56 Z" fill="url(#hub-side)" />
        <ellipse cx="50" cy="56" rx="12" ry="3.2" fill="#FFFFFF" stroke="#DDD6F8" strokeWidth=".3" />
        <ellipse cx="50" cy="56" rx="7" ry="1.8" fill="#7B6FD0" opacity=".45" className="hub__pulse" />
      </svg>
      <div className="hub__core"><strong>{core[0]}</strong><span>{core[1]}</span></div>
      <ul className="hub__chips">
        {chips.map((c, i) => (
          <li key={c} className={pos[i].left ? "is-left" : "is-right"} style={{ left: `${pos[i].x}%`, top: `${pos[i].y}%`, "--i": i } as React.CSSProperties}>
            <span className="hub__ico"><Icon name={CHIP_ICONS[i % CHIP_ICONS.length]} /></span>{c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Who can join: an isometric staircase through the outcomes, each step with its icon; a light climbs it. */
export function Stairs({ steps }: { steps: { title: string; icon: IconName }[] }) {
  // Fit the staircase to the frame whatever the number of steps: scale by the tighter of width and height,
  // then centre it, leaving room above the top step for the tiles and the goal beam.
  const n = steps.length, D = 1.1, Hs = 0.62;
  const s = Math.min(500 / ((n + D) * 0.866), 300 / (1.05 + n * Hs));
  const ox = 300 - ((n - D) * 0.866 * s) / 2, oy = 160 - (n - 1) * 0.5 * s + n * Hs * s;
  const lines = (t: string) => t.split(" ").reduce<string[]>((a, w) => { const l = a[a.length - 1]; if (l && (l + " " + w).length <= 10) a[a.length - 1] = l + " " + w; else a.push(w); return a; }, []);
  const P = (x: number, y: number, z: number) => [ox + (x - y) * 0.866 * s, oy + (x + y) * 0.5 * s - z * s] as const;
  const pts = (...q: (readonly [number, number])[]) => q.map((p) => p.join(",")).join(" ");
  const tile = (i: number) => { const [x, y] = P(i + 0.5, D / 2, (i + 1) * Hs); return [x, y - 40] as const; };
  const route = steps.map((_, i) => tile(i)).map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(1)} ${(y + 22).toFixed(1)}`).join(" ");
  return (
    <div className="stairs" aria-hidden="true">
      <svg viewBox="0 0 600 470" focusable="false">
        <defs>
          <linearGradient id="st-top" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#F3F0FD" /></linearGradient>
          <linearGradient id="st-front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ECE8FC" /><stop offset="1" stopColor="#DDD6F8" /></linearGradient>
          <linearGradient id="st-side" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CFC7F4" /><stop offset="1" stopColor="#B3A9EA" /></linearGradient>
          <linearGradient id="st-tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2B2070" /><stop offset="1" stopColor="#120E33" /></linearGradient>
          <radialGradient id="st-glow"><stop offset="0" stopColor="#7B6FD0" stopOpacity=".55" /><stop offset="1" stopColor="#7B6FD0" stopOpacity="0" /></radialGradient>
          <linearGradient id="st-beam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#7B6FD0" stopOpacity=".4" /><stop offset="1" stopColor="#7B6FD0" stopOpacity="0" /></linearGradient>
        </defs>
        {/* floor: a soft pool of light and a fading grid */}
        <ellipse cx={P(n / 2, D / 2, 0)[0]} cy={P(n / 2, D / 2, 0)[1] + 10} rx="270" ry="70" fill="url(#st-glow)" opacity=".6" />
        <g className="stairs__grid">
          {Array.from({ length: 9 }, (_, k) => { const a = P(-1 + k * ((n + 2) / 8), -0.6, 0), b = P(-1 + k * ((n + 2) / 8), D + 0.9, 0); return <line key={`a${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />; })}
          {Array.from({ length: 5 }, (_, k) => { const y = -0.6 + k * ((D + 1.5) / 4), a = P(-1, y, 0), b = P(n + 1, y, 0); return <line key={`b${k}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />; })}
        </g>
        {steps.map((st, i) => {
          const z = (i + 1) * Hs, x0 = i, x1 = i + 1;
          const top = pts(P(x0, 0, z), P(x1, 0, z), P(x1, D, z), P(x0, D, z));
          const front = pts(P(x0, D, z), P(x1, D, z), P(x1, D, 0), P(x0, D, 0));
          const side = pts(P(x1, 0, z), P(x1, D, z), P(x1, D, 0), P(x1, 0, 0));
          const [fx, fy] = P(i + 0.5, D, z / 2);
          const [tx, ty] = tile(i);
          return (
            <g key={st.title} className="stairs__step" style={{ "--i": i } as React.CSSProperties}>
              <polygon points={side} fill="url(#st-side)" className="stairs__face" />
              <polygon points={front} fill="url(#st-front)" className="stairs__face" />
              <polygon points={top} fill="url(#st-top)" className="stairs__face stairs__top" />
              <text x={fx} y={fy - 4 - (lines(st.title).length - 1) * 7} textAnchor="middle" className="stairs__num">{String(i + 1).padStart(2, "0")}</text>
              <text x={fx} y={fy + 13 - (lines(st.title).length - 1) * 7} textAnchor="middle" className="stairs__label">{lines(st.title).map((l, k) => <tspan key={k} x={fx} dy={k ? 15 : 0}>{l}</tspan>)}</text>
              <ellipse cx={tx} cy={ty + 40} rx="20" ry="6" className="stairs__shadow" />
              <g className="stairs__tile" style={{ "--i": i } as React.CSSProperties}>
                <rect x={tx - 22} y={ty - 22} width="44" height="44" rx="12" fill="url(#st-tile)" />
                <rect x={tx - 22} y={ty - 22} width="44" height="44" rx="12" className="stairs__tile-edge" />
                <use href={`#i-${st.icon}`} x={tx - 11} y={ty - 11} width="22" height="22" className="stairs__icon" />
              </g>
            </g>
          );
        })}
        <path d={route} className="stairs__route" pathLength={1} />
        {(() => { const [gx, gy] = tile(n - 1); return (
          <g className="stairs__goal">
            <polygon points={`${gx - 16},${gy - 26} ${gx + 16},${gy - 26} ${gx + 26},${gy - 96} ${gx - 26},${gy - 96}`} fill="url(#st-beam)" />
            <circle cx={gx} cy={gy - 62} r="15" className="stairs__goal-dot" />
            <path d={`M ${gx - 6} ${gy - 62} l 4 4 l 8 -8`} className="stairs__goal-tick" />
          </g>); })()}
        <g className="stairs__orb">
          <circle r="16" fill="url(#st-glow)" />
          <circle r="5" className="stairs__orb-core" />
          <animateMotion dur="6s" repeatCount="indefinite" path={route} keyPoints="0;1;1" keyTimes="0;0.75;1" calcMode="linear" />
        </g>
      </svg>
    </div>
  );
}

/** The closing band: the main tool on stacked glass, wired to the others on a perspective floor. */
export function ToolsOrbit({ tools }: { tools: string[] }) {
  const [main, ...rest] = tools;
  const spots: [number, number, number][] = [[14, 26, 0.9], [84, 22, 0.95], [88, 70, 0.85], [16, 74, 0.8], [52, 90, 0.72]];
  return (
    <div className="orbit" aria-hidden="true">
      <svg className="orbit__art" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
        <g className="orbit__floor">{Array.from({ length: 7 }, (_, k) => <line key={k} x1={k * 16.6} y1="100" x2={50 + (k - 3) * 6} y2="58" />)}<line x1="0" y1="82" x2="100" y2="82" /><line x1="8" y1="68" x2="92" y2="68" /></g>
        <ellipse cx="50" cy="52" rx="44" ry="20" className="orbit__ring" />
        {rest.slice(0, spots.length).map((_, i) => <line key={i} x1="50" y1="50" x2={spots[i][0]} y2={spots[i][1]} className="orbit__wire" style={{ "--i": i } as React.CSSProperties} pathLength={1} />)}
      </svg>
      <div className="orbit__main"><i /><i /><span><ToolMark k={main} size={64} /></span></div>
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
