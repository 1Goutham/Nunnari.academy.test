import Icon from "@/components/Icon";
import HeroStage from "./HeroStage";

/**
 * Home hero: the line, one sentence and two actions on the left; on the right a student in a
 * deep-violet portal with floating glass UI (HeroStage).
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__wash" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 className="t-display" id="hero-title">
            <span className="line" data-in="" style={{ "--d": ".1s" } as React.CSSProperties}>Your School of AI</span>{" "}
            <span className="line" data-in="" style={{ "--d": ".22s" } as React.CSSProperties}>
              <span className="grad">for the Skills of Tomorrow.</span>
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
          <HeroStage />
        </div>
      </div>
    </section>
  );
}
