import Image from "next/image";

const facts = ["Founded in Coimbatore, 2020", "ISO/IEC 42001:2023 certified", "India & Australia"];

/** The company behind Nunnari Academy (adapted from nunnarilabs.com → Company). */
export default function Company() {
  return (
    <section className="section section--band" id="company" aria-labelledby="company-title">
      <div className="container">
        <div className="company__top">
          <div className="company__copy">
            <span className="pill" data-reveal="">The company behind Nunnari Academy</span>
            <h2 className="t-h2" id="company-title" data-reveal=""><span className="soft">Backed by</span> Nunnari Labs <span className="soft">&amp;</span> DeepWeaver.</h2>
          </div>
          <div className="company__aside" data-reveal="" style={{ "--d": ".12s" } as React.CSSProperties}>
            <p className="lead">Two companies, one delivery team across India and Australia, with one project history and one governance layer.</p>
            <ul className="company__facts">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>

        <div className="company__cards">
          <article className="card company__card" data-reveal="">
            <a className="company__logo" href="https://nunnarilabs.com/" target="_blank" rel="noopener noreferrer" aria-label="Nunnari Labs website (opens in a new tab)"><Image src="/assets/brand/nunnari-labs-horizontal.svg" alt="" width={345} height={116} style={{ height: 44, width: "auto" }} /></a>
            <div><h3 className="sr-only">Nunnari Labs</h3><span className="company__where">Coimbatore, India</span></div>
            <ul className="company__list"><li>AI engineering company</li><li>ISO/IEC 42001 certified</li></ul>
          </article>
          <article className="card company__card" data-reveal="" style={{ "--d": ".06s" } as React.CSSProperties}>
            <a className="company__logo" href="https://deepweaver.ai/" target="_blank" rel="noopener noreferrer" aria-label="DeepWeaver website (opens in a new tab)"><Image src="/assets/logos/deepweaver.webp" alt="" width={560} height={110} style={{ height: 30, width: "auto" }} /></a>
            <div><h3 className="sr-only">DeepWeaver</h3><span className="company__where">Sydney, Australia</span></div>
            <ul className="company__list"><li>Enterprise AI services</li><li>Weaving human-led AI into the enterprise</li></ul>
          </article>
          <article className="card company__card" data-reveal="" style={{ "--d": ".12s" } as React.CSSProperties}>
            <div className="company__logo"><span className="company__ta" lang="ta">நுண்ணறிவு</span></div>
            <div><h3 className="sr-only">Nunnarivu</h3><span className="company__where">Where our name comes from</span></div>
            <ul className="company__list"><li>Tamil for “intelligence”</li><li>Rooted in Tamil Nadu, built for global learners</li></ul>
          </article>
        </div>
      </div>
    </section>
  );
}
