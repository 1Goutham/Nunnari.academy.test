import Image from "next/image";
import Icon from "@/components/Icon";
import { Cta, Head, PageHero, Row } from "@/components/ui/Blocks";
import { partners, type Partner } from "@/lib/partners";

const bars = (years: number[], vals: number[], max: number) => (
  <div className="vbars" data-inview="">
    <div className="vbars__y">{Array.from({ length: 6 }, (_, i) => <span key={i}>{Math.round((max / 5) * i)}</span>)}</div>
    <div className="vbars__plot">
      {vals.map((v, k) => <div className="vbar" key={years[k]} style={{ "--h": `${(v / max) * 100}%`, "--k": k } as React.CSSProperties}><i /><b>{v}</b><em>{`’${String(years[k]).slice(-2)}`}</em></div>)}
    </div>
  </div>
);

function Charts({ kind }: { kind: Partner["charts"] }) {
  if (kind === "institutions") {
    const f: [string, number, string][] = [["Delivered", 97, "var(--chart-1)"], ["Confirmed", 104, "var(--chart-2)"], ["Invited", 104, "var(--chart-3)"], ["Proposal", 94, "var(--chart-4)"], ["Enquiry", 46, "var(--chart-5)"], ["Unclear", 27, "var(--chart-6)"], ["Declined", 9, "var(--chart-7)"]];
    const total = f.reduce((a, b) => a + b[1], 0);
    return (
      <div className="charts">
        <figure className="chart"><h3>Activities per year</h3><p>Each activity counted once, in the year of its event date.</p>
          {bars([2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026], [2, 3, 3, 13, 36, 47, 45, 45, 70, 49, 119], 120)}</figure>
        <figure className="chart" data-inview=""><h3>How far each activity went</h3><p>The furthest stage reached.</p>
          <div className="funnel">{f.map(([n, v, c], k) => <i key={n} style={{ "--v": v, "--c": c, "--k": k } as React.CSSProperties} />)}</div>
          <ul className="legend">{f.map(([n, v, c]) => <li key={n} style={{ "--c": c } as React.CSSProperties}>{n}<b>{v}</b><small>{Math.round((v / total) * 100)}%</small></li>)}</ul>
        </figure>
      </div>
    );
  }
  const d: [string, number][] = [["Generative AI & LLMs", 38], ["AI for Productivity", 32], ["Data Analytics & ML", 28], ["Prompt Engineering", 24], ["AI for Business", 22], ["Custom Enterprise Training", 18], ["Others", 12]];
  return (
    <div className="charts">
      <figure className="chart" data-inview=""><h3>Training by domain</h3><p>Corporate sessions across key AI domains.</p>
        <div className="hbars">{d.map(([n, v], k) => <div className="hbar" key={n}><span>{n}</span><span className="hbar__track"><i style={{ "--w": `${(v / 38) * 100}%`, "--k": k, "--o": 1 - k * 0.09 } as React.CSSProperties} /></span><b>{v}</b></div>)}</div></figure>
      <figure className="chart"><h3>Growth in corporate training</h3><p>Training sessions conducted per year.</p>
        {bars([2021, 2022, 2023, 2024, 2025, 2026], [17, 32, 48, 61, 79, 97], 100)}</figure>
    </div>
  );
}

/**
 * One template for both partner pages, stat-led: the question in the hero → what we bring as rows →
 * the partners' own logos → the figures and charts on the violet field → partner voices, the first one large → the close.
 */
export default function PartnerPage({ id }: { id: Partner["key"] }) {
  const p = partners[id];
  const btn = (ghost?: boolean) => <button className={`btn btn--lg ${ghost ? "btn--ghost" : "btn--primary"}`} type="button" data-enquire={`${p.cta} (${id === "institutions" ? "Institution" : "Corporate"})`}>{p.cta} <Icon name="arrow" className="i--arrow" /></button>;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partner with us" }, { label: id === "institutions" ? "Institutions" : "Corporates" }]}
        title={`${p.title[0]} ${p.title[1]}`}
        lead={p.lead}
        art={p.art}
        actions={btn()}
      />

      <section className="section">
        <div className="container aside-rows">
          <Head title="Built for real impact." />
          <ul className="rows">{p.offers.map((o) => <Row key={o.title} icon={o.icon} title={o.title} text={o.text} />)}</ul>
        </div>
      </section>

      <section className="section section--top0">
        <div className="container">
          <Head title={`${p.logosTitle[0]} ${p.logosTitle[1]}`} />
          <ul className="logos" style={{ "--n": p.logos.length > 5 ? 3 : p.logos.length } as React.CSSProperties}>
            {p.logos.map((l) => (
              <li key={l.name}>
                {l.src ? <><Image src={l.src} alt={l.name} width={160} height={160} /><span>{l.name}</span></> : <span className="wm">{l.name}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="field section">
        <div className="container">
          <Head title="Partnerships that turn into progress." />
          <div className={`figures${p.stats.length > 3 ? " figures--4" : ""}`} style={{ "--n": p.stats.length } as React.CSSProperties}>
            {p.stats.map(([n, s, l]) => <div key={l}><strong data-count={n} data-suffix={s}>{n.toLocaleString("en-IN")}{s}</strong><span>{l}</span></div>)}
          </div>
          <Charts kind={p.charts} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head title="What our partners say." />
          <div className="quotes">
            {p.quotes.map((q) => (
              <figure key={q.name} className="quote">
                <blockquote>“{q.quote}”</blockquote>
                <figcaption><b>{q.name}</b><span>{q.role}, {q.org}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Cta art={p.art} title={`${p.closing[0]} ${p.closing[1]}`} lead="Our team will connect with you within 24 to 48 hours." actions={btn()} />
    </>
  );
}
