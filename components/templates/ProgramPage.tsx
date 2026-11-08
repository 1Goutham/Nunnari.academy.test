import Icon from "@/components/Icon";
import Faq from "@/components/ui/Faq";
import BrochureButton from "@/components/ui/BrochureButton";
import { Cta, Head, PageHero } from "@/components/ui/Blocks";
import { programs, roles, tools, type ProgramKey } from "@/lib/programs";

/**
 * One template for every programme page, read like a syllabus:
 * Stage hero with the panel → who it is for → (Regular: the salary and roles) → outcomes as a real
 * ordered list → (Regular: the tools, set in type) → questions → the closing band.
 */
export default function ProgramPage({ id }: { id: ProgramKey }) {
  const p = programs[id];
  const enroll = `Enroll: ${p.name}`;
  return (
    <>
      <PageHero
        crumbs={[{ href: "/programs", label: "Programs" }, { href: `/programs/${id}`, label: p.name }]}
        title={`${p.title[0]} ${p.title[1]}`}
        lead={p.lead}
        facts={p.facts}
        art={p.art}
        actions={<>
          <button className="btn btn--primary btn--lg" type="button" data-enquire={enroll}>Enroll Now <Icon name="arrow" className="i--arrow" /></button>
          <BrochureButton program={id} />
        </>}
      />

      <section className="section">
        <div className="container">
          <Head title="Designed for you." />
          <div className="pair">
            {p.forWho.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {id === "regular" && (
        <section className="band">
          <div className="container statement">
            <figure className="statement__fig" style={{ margin: 0 }}>
              <p className="figure-xl">₹8.5 LPA</p>
              <figcaption>Average salary</figcaption>
            </figure>
            <div className="statement__side">
              <h2>Skills today for tomorrow.</h2>
              <p>Gain in-demand skills, build a portfolio, and get guidance to start your journey in AI &amp; ML.</p>
              <ul className="roles">{roles.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <Head title="From learning to real impact." />
          <ol className="steps" style={{ "--n": p.outcomes.length } as React.CSSProperties}>
            {p.outcomes.map((o) => (
              <li key={o.title}>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {id === "regular" && (
        <section className="section section--top0">
          <div className="container">
            <Head title="Industry-standard tools." />
            <ul className="typeset">{tools.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </section>
      )}

      <section className="section section--top0">
        <div className="container aside-rows">
          <Head title="Questions, answered." />
          <Faq cats={p.faqCats} items={p.faq} />
        </div>
      </section>

      <Cta
        art={p.art}
        title="Start your AI journey."
        lead="Talk to our team and we will help you pick the right batch."
        actions={<>
          <button className="btn btn--primary btn--lg" type="button" data-enquire={enroll}>Enroll Now <Icon name="arrow" className="i--arrow" /></button>
          <BrochureButton program={id} />
        </>}
      />
    </>
  );
}
