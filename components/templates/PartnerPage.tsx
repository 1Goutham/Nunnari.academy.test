import Image from "next/image";
import LogoMarquee from "@/components/ui/LogoMarquee";
import Icon from "@/components/Icon";
import { Card, Cta, Head, PageHero } from "@/components/ui/Blocks";
import { partners, type Partner } from "@/lib/partners";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, ORG_ID } from "@/lib/schema";

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
    const f: [string, number, string][] = [["Delivered", 97, "#B3A9EA"], ["Confirmed", 104, "#7B6FD0"], ["Invited", 104, "#4A3BAF"], ["Proposal", 94, "#3B2F96"], ["Enquiry", 46, "#DDD6F8"], ["Unclear", 27, "#9D97BE"], ["Declined", 9, "#C46B6B"]];
    const total = f.reduce((a, b) => a + b[1], 0);
    return (
      <div className="grid grid--2" style={{ marginTop: 20 }}>
        <div className="card chart-card" data-reveal=""><h3>Activities per year</h3><p>Each activity counted once, in the year of its event date.</p>
          {bars([2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026], [2, 3, 3, 13, 36, 47, 45, 45, 70, 49, 119], 120)}</div>
        <div className="card chart-card" data-reveal="" data-inview=""><h3>How far each activity went</h3><p>The furthest stage reached.</p>
          <div className="funnel">{f.map(([n, v, c], k) => <i key={n} style={{ "--v": v, "--c": c, "--k": k } as React.CSSProperties} />)}</div>
          <ul className="legend">{f.map(([n, v, c]) => <li key={n} style={{ "--c": c } as React.CSSProperties}>{n}<b>{v}</b><small>{Math.round((v / total) * 100)}%</small></li>)}</ul>
        </div>
      </div>
    );
  }
  const d: [string, number][] = [["Generative AI & LLMs", 38], ["AI for Productivity", 32], ["Data Analytics & ML", 28], ["Prompt Engineering", 24], ["AI for Business", 22], ["Custom Enterprise Training", 18], ["Others", 12]];
  return (
    <div className="grid grid--2" style={{ marginTop: 20 }}>
      <div className="card chart-card" data-reveal="" data-inview=""><h3>Training by domain</h3><p>Corporate sessions across key AI domains.</p>
        <div className="hbars">{d.map(([n, v], k) => <div className="hbar" key={n}><span>{n}</span><span className="hbar__track"><i style={{ "--w": `${(v / 38) * 100}%`, "--k": k, "--o": 1 - k * 0.09 } as React.CSSProperties} /></span><b>{v}</b></div>)}</div></div>
      <div className="card chart-card" data-reveal=""><h3>Growth in corporate training</h3><p>Training sessions conducted per year.</p>
        {bars([2021, 2022, 2023, 2024, 2025, 2026], [17, 32, 48, 61, 79, 97], 100)}</div>
    </div>
  );
}

/** One template for both partner pages: hero → what we bring + what we offer → partners → impact → voices → CTA. */
export default function PartnerPage({ id }: { id: Partner["key"] }) {
  const p = partners[id];
  const btn = (ghost?: boolean) => <button className={`btn btn--lg ${ghost ? "btn--ghost" : "btn--primary"}`} type="button" data-enquire={`${p.cta} (${id === "institutions" ? "Institution" : "Corporate"})`}>{p.cta} <Icon name="arrow" className="i--arrow" /></button>;
  const path = `/partner/${id}`;
  const label = id === "institutions" ? "Institutional collaboration" : "Corporate AI training";
  return (
    <>
      <JsonLd data={[
        { "@type": "Service", "@id": `https://nunnari.academy${path}#service`, name: label, serviceType: id === "institutions" ? "AI education partnership for colleges and universities" : "Corporate AI training", description: p.lead, provider: { "@id": ORG_ID }, areaServed: { "@type": "Country", name: "India" }, audience: { "@type": "Audience", audienceType: id === "institutions" ? "Colleges and universities" : "Companies and teams" } },
        breadcrumbs([{ name: label, path }]),
      ]} />
      <PageHero pill={p.pill} title={<>{p.title[0]} <span className="grad">{p.title[1]}</span></>} lead={p.lead} art={p.art} actions={btn()} />

      <section className="section section--dark">
        <div className="container">
          <Head pill="What we bring" title={<>Built for <span className="grad">real impact.</span></>} />
          <div className={`grid grid--${p.offers.length}`}>{p.offers.map((o, i) => <Card key={o.title} icon={o.icon} title={o.title} text={o.text} k={i} />)}</div>

          {/* what we offer: the formats we run with the partner */}
          <div className="formats">
            <Head pill="What we offer" title={<>{p.formatsTitle[0]} <span className="grad">{p.formatsTitle[1]}</span></>} />
            <ol className={`formats__list formats__list--${p.formats.length}`}>
              {p.formats.map((o, i) => (
                <li key={o.title} className="formats__item" data-reveal="" style={{ "--d": `${i * 0.06}s` } as React.CSSProperties}>
                  <span className="formats__num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="formats__ico"><Icon name={o.icon} /></span>
                  <h3>{o.title}</h3>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Our partners" title={<>{p.logosTitle[0]} <span className="grad">{p.logosTitle[1]}</span></>} />
          {p.logoKind === "wide" ? (
          <div className="logos" style={{ "--n": p.logos.length > 5 ? 5 : p.logos.length } as React.CSSProperties}>
              {p.logos.map((l, i) => (
                <div key={l.name} className={`card logo-tile${p.logoKind === "wide" ? " logo-tile--wide" : ""}`} data-reveal="" style={{ "--d": `${i * 0.05}s`, minHeight: p.logoKind === "wide" ? 96 : l.src ? 180 : 110 } as React.CSSProperties}>
                  {l.src
                    ? p.logoKind === "wide"
                      ? <Image src={l.src} alt={l.name} width={600} height={200} />
                      : <><Image src={l.src} alt={l.name} width={160} height={160} /><span>{l.name}</span></>
                    : <span className="wm">{l.name}</span>}
                </div>
              ))}
            </div>
          ) : <div data-reveal=""><LogoMarquee logos={p.logos} /></div>}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Head pill="Our impact" title={<>Partnerships that turn into <span className="grad">progress.</span></>} />
          <div className="stats" style={{ "--n": p.stats.length } as React.CSSProperties} data-reveal="">
            {p.stats.map(([n, s, l]) => <div className="stat" key={l}><strong data-count={n} data-suffix={s}>{n.toLocaleString("en-IN")}{s}</strong><span>{l}</span></div>)}
          </div>
          <Charts kind={p.charts} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Partner voices" title={<>What our partners <span className="grad">say.</span></>} />
          <div className="grid grid--3">
            {p.quotes.map((q, i) => (
              <figure key={q.name} className="card quote" style={{ width: "auto", "--d": `${i * 0.06}s` } as React.CSSProperties} data-reveal="">
                <blockquote>“{q.quote}”</blockquote>
                <figcaption><span className="avatar" aria-hidden="true">{q.name.replace(/^Dr\. /, "").split(" ").map((x) => x[0]).slice(0, 2).join("")}</span><span><b>{q.name}</b><span>{q.role}, {q.org}</span></span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Cta art={p.art} title={<>{p.closing[0]} <span className="grad">{p.closing[1]}</span></>} lead="Our team will connect with you within 24 to 48 hours." actions={btn()} />
    </>
  );
}
