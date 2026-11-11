import Image from "next/image";

const shots = [
  { src: "/assets/img/events/ev1.webp", w: 900, h: 269, alt: "Community meetup group photo" },
  { src: "/assets/img/events/ev2.webp", w: 656, h: 264, alt: "A full workshop hall" },
  { src: "/assets/img/events/ev3.webp", w: 656, h: 264, alt: "An expert panel discussion" },
  { src: "/assets/img/events/ev4.webp", w: 900, h: 169, alt: "Speakers and organisers on stage" },
  { src: "/assets/img/events/ev5.webp", w: 374, h: 210, alt: "A panellist speaking" },
  { src: "/assets/img/events/ev6.webp", w: 454, h: 210, alt: "A session in a lecture room" },
  { src: "/assets/img/events/ev7.webp", w: 474, h: 210, alt: "Panellists at a community event" },
];

/** Moments from our events: two columns of photos drifting in opposite directions inside one card. */
export default function EventGallery() {
  const a = [shots[0], shots[2], shots[4], shots[6]];
  const b = [shots[1], shots[3], shots[5]];
  const col = (list: typeof shots, rev?: boolean) => (
    <div className={`gal__col${rev ? " gal__col--rev" : ""}`}>
      {[0, 1].map((dup) => (
        <div key={dup} className="gal__track" aria-hidden={dup === 1 || undefined}>
          {list.map((s) => <figure key={s.src} className="gal__shot"><Image src={s.src} alt={dup ? "" : s.alt} width={s.w} height={s.h} sizes="(max-width: 960px) 45vw, 300px" /></figure>)}
        </div>
      ))}
    </div>
  );
  return (
    <figure className="card gal" data-reveal="">
      <figcaption className="gal__head"><h3>From our events</h3><p>Workshops, meetups and expert panels with the community.</p></figcaption>
      <div className="gal__stage">{col(a)}{col(b, true)}</div>
    </figure>
  );
}
