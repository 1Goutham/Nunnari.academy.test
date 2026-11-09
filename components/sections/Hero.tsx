import Icon from "@/components/Icon";
import Art from "@/components/ui/Art";

/**
 * Home hero: the line, one sentence and two actions on the left; on the right the Nunnari mark
 * lives as a lattice of points: a signal runs along its N, the points part around the cursor,
 * and a tap sends a ripple through it.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="t-display" id="hero-title">
            <span className="line" data-in="" style={{ "--d": ".1s" } as React.CSSProperties}>Learn AI.</span>
            <span className="line" data-in="" style={{ "--d": ".22s" } as React.CSSProperties}>
              <span className="grad">Create what<br className="br-m" /> doesn’t exist yet.</span>
            </span>
          </h1>
          <p className="lead" data-in="" style={{ "--d": ".38s" } as React.CSSProperties}>
            Practical, hands-on AI programs in English and Tamil. Build real skills, create real projects, and grow with a{" "}
            <strong>Pioneering AI community</strong>.
          </p>
          <div className="actions" data-in="" style={{ "--d": ".5s" } as React.CSSProperties}>
            <button className="btn btn--primary btn--lg" type="button" data-enquire="Talk to our experts">
              Talk to our experts <Icon name="arrow" className="i--arrow" />
            </button>
            <a className="btn btn--ghost btn--lg" href="#programs">Explore programs</a>
          </div>
        </div>
        <div className="hero__visual" data-in="" style={{ "--d": ".3s" } as React.CSSProperties}>
          <Art name="mark" label="The Nunnari Academy mark as a lattice of points, a signal running along its N" />
        </div>
      </div>
    </section>
  );
}
