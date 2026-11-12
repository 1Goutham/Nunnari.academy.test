import Image from "next/image";

// moments from our events: launches, summits, talks and community meetups
const shots = [
  { src: "/assets/img/events/ai-session.webp", w: 1400, h: 933, alt: "An introductory AI session with students" },
  { src: "/assets/img/events/nvidia-summit.webp", w: 1400, h: 1050, alt: "Our team at the NVIDIA AI Summit" },
  { src: "/assets/img/events/devfest-talk.webp", w: 1400, h: 933, alt: "A talk on open models at DevFest" },
  { src: "/assets/img/events/tensorflow-meetup.webp", w: 1400, h: 1050, alt: "TensorFlow User Group Coimbatore meetup" },
  { src: "/assets/img/events/forge-launch.webp", w: 1400, h: 933, alt: "Students at a program launch at Forge Factory, Coimbatore" },
  { src: "/assets/img/events/devfest-team.webp", w: 1400, h: 1050, alt: "The DevFest 2023 Coimbatore volunteer team" },
];

/**
 * Events: one photo at a time, crossfading with a slow push-in, and a thin progress bar per photo.
 * CSS only (each slide runs the same loop, offset by its index); pauses on hover, still under reduced motion.
 */
export default function EventGallery() {
  return (
    <figure className="gal" style={{ "--n": shots.length } as React.CSSProperties}>
      <figcaption className="gal__head"><h3>From our events</h3><p>Summits, talks and meetups with our community.</p></figcaption>
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
