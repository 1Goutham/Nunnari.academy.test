import Image from "next/image";

// moments from our training sessions (the very wide strip photo is left out: it cannot fill the frame)
const shots = [
  { src: "/assets/img/events/ev2.webp", w: 656, h: 264, alt: "A full training session in progress" },
  { src: "/assets/img/events/ev6.webp", w: 454, h: 210, alt: "A trainer leading a session" },
  { src: "/assets/img/events/ev3.webp", w: 656, h: 264, alt: "An expert panel at a session" },
  { src: "/assets/img/events/ev1.webp", w: 900, h: 269, alt: "Learners and trainers together after a session" },
  { src: "/assets/img/events/ev7.webp", w: 474, h: 210, alt: "Panellists answering questions" },
  { src: "/assets/img/events/ev5.webp", w: 374, h: 210, alt: "A speaker during a session" },
];

/**
 * Training sessions: one photo at a time, crossfading with a slow push-in, and a thin progress bar per photo.
 * CSS only (each slide runs the same loop, offset by its index); pauses on hover, still under reduced motion.
 */
export default function EventGallery() {
  return (
    <figure className="card gal" data-reveal="" style={{ "--n": shots.length } as React.CSSProperties}>
      <figcaption className="gal__head"><h3>From our training sessions</h3><p>Hands-on sessions and expert panels with our learners.</p></figcaption>
      <div className="gal__stage">
        {shots.map((s, i) => (
          <div key={s.src} className="gal__slide" style={{ "--i": i } as React.CSSProperties}>
            <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="(max-width: 900px) 92vw, 520px" />
          </div>
        ))}
        <div className="gal__bars" aria-hidden="true">{shots.map((s, i) => <i key={s.src} style={{ "--i": i } as React.CSSProperties} />)}</div>
      </div>
    </figure>
  );
}
