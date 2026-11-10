/**
 * A few fine wave lines for section backgrounds (SVG, no script): they draw in when the section
 * arrives and then drift slowly. `tone="dark"` for the ink bands.
 */
export default function WaveLines({ count = 7, tone = "light", flip = false }: { count?: number; tone?: "light" | "dark"; flip?: boolean }) {
  const paths = Array.from({ length: count }, (_, i) => {
    const k = i / Math.max(1, count - 1);
    const y = 120 + k * 150, a = 34 + 22 * Math.sin(k * 3);
    // four identical periods (each starts and ends on the same slope, so the joins are smooth);
    // the drift moves by two periods, so it loops seamlessly
    let d = `M 0 ${y}`;
    for (let s = 0; s < 4; s++) {
      const x0 = s * 600;
      d += ` C ${x0 + 200} ${y - a} ${x0 + 400} ${y + a} ${x0 + 600} ${y}`;
    }
    return d;
  });
  return (
    <div className={`waves waves--${tone}${flip ? " waves--flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 2400 400" preserveAspectRatio="none" focusable="false">
        {paths.map((d, i) => <path key={i} d={d} style={{ "--i": i } as React.CSSProperties} pathLength={1} />)}
      </svg>
    </div>
  );
}
