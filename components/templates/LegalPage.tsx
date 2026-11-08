import { PageHero } from "@/components/ui/Blocks";
import { legal } from "@/lib/legal";

export default function LegalPage({ id }: { id: keyof typeof legal }) {
  const d = legal[id];
  return (
    <>
      <PageHero title={d.title} />
      <section className="section section--top0">
        <div className="container legal">
          <article className="prose">
            {d.sections.map((s, i) => (
              <div key={i}>{s.h && <h2>{s.h}</h2>}{s.p.map((t) => <p key={t}>{t}</p>)}</div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
