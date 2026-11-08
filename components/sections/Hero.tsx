import Link from "next/link";
import Icon from "@/components/Icon";
import { programList } from "@/lib/programs";

const Title = ({ hidden }: { hidden?: boolean }) => {
  const Tag = hidden ? "p" : "h1";
  return (
    <Tag className={`hero__title${hidden ? " hero__over" : ""}`} id={hidden ? undefined : "hero-title"} aria-hidden={hidden || undefined}>
      <span>Learn AI.</span>
      <span>Create what<br className="br-m" /> doesn’t exist yet.</span>
    </Tag>
  );
};

/**
 * Home hero, the overprint sheet: the line at poster scale, hung from column 1 and running onto
 * the brand-violet field that starts on column 8; where it crosses, its letters turn paper.
 * The field holds the three programmes: the page's action, set as the visual.
 */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__field" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__head" data-in="" style={{ "--d": ".05s" } as React.CSSProperties}>
          <Title />
          <Title hidden />
        </div>
        <div className="hero__copy" data-in="" style={{ "--d": ".15s" } as React.CSSProperties}>
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
        <nav className="hero__counter" aria-label="Programmes" data-in="" style={{ "--d": ".25s" } as React.CSSProperties}>
          <p>Three 12-week programmes</p>
          <ol className="counter">
            {programList.map((p) => (
              <li key={p.key}>
                <Link href={`/programs/${p.key}`}>
                  <b>{p.name.replace(" Programme", "")}</b>
                  <span>{p.short}</span>
                  <Icon name="arrow-ur" />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
