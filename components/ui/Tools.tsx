import { toolIcons } from "@/lib/toolIcons";

/** One tool's mark, in its brand colour (or currentColor with `mono`). Decorative: the name sits beside it. */
export function ToolMark({ k, size = 28, mono }: { k: string; size?: number; mono?: boolean }) {
  const t = toolIcons[k];
  if (!t) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <path d={t.path} fill={mono ? "currentColor" : `#${t.hex}`} />
    </svg>
  );
}

/** The programme's tools as a grid of logo tiles with their names. */
export default function ToolGrid({ keys }: { keys: string[] }) {
  return (
    <ul className="toolgrid">
      {keys.filter((k) => toolIcons[k]).map((k) => (
        <li key={k} className="toolgrid__item">
          <span className="toolgrid__mark"><ToolMark k={k} size={30} /></span>
          <span className="toolgrid__name">{toolIcons[k].title}</span>
        </li>
      ))}
    </ul>
  );
}
