import Image from "next/image";
import Marquee from "./Marquee";

type Logo = { src?: string; name: string; short?: string };

/** Institutions as a slow, continuous strip of logos (the logos carry their names; pauses on hover). */
export default function LogoMarquee({ logos, duration = 36 }: { logos: Logo[]; duration?: number }) {
  return (
    <Marquee duration={duration} className="lmq">
      {logos.map((l) => (
        <div key={l.name} className="lmq__item">
          {l.src
            ? <Image src={l.src} alt={l.name} width={120} height={120} className="lmq__logo" />
            : <span className="lmq__mono" role="img" aria-label={l.name}>{l.short ?? l.name.slice(0, 3)}</span>}
        </div>
      ))}
    </Marquee>
  );
}
