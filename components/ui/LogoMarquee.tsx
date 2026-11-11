import Image from "next/image";
import Marquee from "./Marquee";

type Logo = { src?: string; name: string; short?: string };

/** Institutions as a slow, continuous strip of logos with their names (pauses on hover). */
export default function LogoMarquee({ logos, duration = 36 }: { logos: Logo[]; duration?: number }) {
  return (
    <Marquee duration={duration} className="lmq">
      {logos.map((l) => (
        <div key={l.name} className="lmq__item">
          {l.src
            ? <Image src={l.src} alt="" width={120} height={120} className="lmq__logo" />
            : <span className="lmq__mono" aria-hidden="true">{l.short ?? l.name.slice(0, 3)}</span>}
          <span className="lmq__name">{l.name}</span>
        </div>
      ))}
    </Marquee>
  );
}
