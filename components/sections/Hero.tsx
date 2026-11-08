import Icon from "@/components/Icon";
import Split from "@/components/Split";
import Art from "@/components/ui/Art";

const Title = ({ hidden }: { hidden?: boolean }) => (
  <Split as={hidden ? "p" : "h1"} className={`hero__title${hidden ? " hero__over" : ""}`} id={hidden ? undefined : "hero-title"} aria-hidden={hidden || undefined}>
    <span>Learn AI.</span>
    <span>Create what<br className="br-m" /> doesn’t exist yet.</span>
  </Split>
);

/**
 * Home hero, the overprint sheet: the line at poster scale, hung from column 1 and running onto
 * the brand-violet field that starts on column 8; where it crosses, its letters turn paper.
 * On the field, the Nunnari mark lives as a network of points: a signal runs along its N,
 * the points part around the cursor, and a tap sends a ripple through it.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__field" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__head">
          <Title />
          <Title hidden />
        </div>
        <div className="hero__copy" data-in="" style={{ "--d": ".55s" } as React.CSSProperties}>
          <p className="lead">
            Practical, hands-on AI programs in English and Tamil. Build real skills, create real projects, and grow with a{" "}
            <strong>Pioneering AI community</strong>.
          </p>
          <div className="actions">
            <button className="btn btn--primary btn--lg" type="button" data-enquire="Talk to our experts">
              Talk to our experts <Icon name="arrow" className="i--arrow" />
            </button>
            <a className="btn btn--ghost btn--lg" href="#programs">Explore programs</a>
          </div>
        </div>
        <div className="hero__visual" data-in="" style={{ "--d": ".35s" } as React.CSSProperties}>
          <Art name="mark" label="The Nunnari Academy mark as a network of points, a signal running along its N" />
        </div>
      </div>
    </section>
  );
}
