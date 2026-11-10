import { workshopArts } from "@/lib/art";
import Vignette from "./Vignette";
import { vignetteNames } from "@/lib/scenes";

/**
 * Illustration panel.
 * - Workshop drawings → dark panel with glowing line art (lib/art.ts).
 * - Everything else   → a small scene of the real thing, built from the site's facts (Vignette).
 */
export default function Art({ name, className = "", label }: { name: string; className?: string; label?: string }) {
  const scene = vignetteNames.includes(name);
  return (
    <div className={`art ${scene ? "art--scene" : "art--dark"} ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {!scene && <span className="art__stars" />}
      {!scene && <span className="art__floor" />}
      {scene ? <Vignette name={name} /> : <svg className="art__poster" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" focusable="false" dangerouslySetInnerHTML={{ __html: workshopArts[name] ?? "" }} />}
    </div>
  );
}
