import Icon from "@/components/Icon";
import Faq from "@/components/ui/Faq";
import BrochureButton from "@/components/ui/BrochureButton";
import { Card, Cta, Head, PageHero } from "@/components/ui/Blocks";
import ToolGrid from "@/components/ui/Tools";
import { SkillsHub, Stairs, StackRows, ToolsOrbit } from "@/components/ui/Illus";
import { programs, type ProgramKey } from "@/lib/programs";

/**
 * One template for every programme page, the same sections in the same order:
 * hero → who can join (with the staircase of outcomes) → skills today for tomorrow (the hub) →
 * packages and tools → learning outcomes (on a timeline) → questions → the closing band.
 */
export default function ProgramPage({ id }: { id: ProgramKey }) {
  const p = programs[id];
  const enroll = `Enroll: ${p.name}`;
  const actions = <>
    <button className="btn btn--primary btn--lg" type="button" data-enquire={enroll}>Enroll Now <Icon name="arrow" className="i--arrow" /></button>
    <BrochureButton program={id} />
  </>;
  return (
    <>
      <PageHero
        crumbs={[{ href: "/programs", label: "Programs" }, { href: `/programs/${id}`, label: p.name }]}
        pill={`${p.name} · ${p.num}`}
        title={<>{p.title[0]} <span className="grad">{p.title[1]}</span></>}
        lead={p.lead}
        facts={p.facts}
        art={p.art}
        actions={actions}
      />

      <section className="section">
        <div className="container split split--illus">
          <div>
            <Head pill="Who it's for" title={<>Who can <span className="grad">join?</span></>} />
            <div className="grid grid--1">
              {p.forWho.map((c, i) => <Card key={c.title} icon={c.icon} title={c.title} text={c.text} k={i} />)}
            </div>
          </div>
          <div data-reveal=""><Stairs steps={p.outcomes.map((o) => o.title)} /></div>
        </div>
      </section>

      <section className="section section--band">
        <div className="container split split--illus split--rev">
          <div data-reveal=""><SkillsHub core={p.skills.core} chips={p.skills.chips} /></div>
          <div>
            <Head pill="Growth & opportunities" title={<>Skills today for <span className="grad">tomorrow.</span></>} lead={p.skills.lead} />
            <ul className="chips">{p.skills.chips.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Packages & tools" title={<>The stack you will <span className="grad">build with.</span></>} />
          <div data-reveal=""><StackRows packages={p.packages} tools={p.tools} Grid={ToolGrid} /></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Learning outcomes" title={<>From learning to <span className="grad">real impact.</span></>} />
          <div className="journey journey--line" data-inview="" style={{ "--n": p.outcomes.length } as React.CSSProperties}>
            {p.outcomes.map((o, k) => (
              <div className="card" key={o.title} style={{ "--k": k } as React.CSSProperties}>
                <span className="ico"><Icon name={o.icon} /></span>
                <span className="num">0{k + 1}</span>
                <h3>{o.title}</h3>
                <p className="clamp3">{o.text}</p>
              </div>
            ))}
            <div className="journey__track" aria-hidden="true">{p.outcomes.map((o, k) => <i key={o.title} style={{ "--k": k } as React.CSSProperties} />)}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="FAQ" title={<>Questions, <span className="grad">answered.</span></>} />
          <Faq cats={p.faqCats} items={p.faq} />
        </div>
      </section>

      <Cta
        title={<>Start your <span className="grad">AI journey.</span></>}
        lead="Talk to our team and we will help you pick the right batch."
        visual={<ToolsOrbit tools={[...p.tools.slice(0, 1), ...p.packages.slice(0, 3), ...p.tools.slice(1, 3)]} />}
        actions={actions}
      />
    </>
  );
}
