import Image from "next/image";
import { Head } from "@/components/ui/Blocks";

const facts = ["Founded in Coimbatore, 2020", "ISO/IEC 42001:2023 certified", "India & Australia"];

/** The company behind Nunnari Academy: three columns under one heavy rule, no boxes. */
export default function Company() {
  return (
    <section className="band" id="company" aria-labelledby="company-title">
      <div className="container">
        <div className="head head--split">
          <h2 id="company-title">Backed by Nunnari Labs &amp; DeepWeaver.</h2>
          <div>
            <p className="lead">Two companies, one delivery team across India and Australia, with one project history and one governance layer.</p>
            <ul className="company__facts">{facts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
        </div>
        <div className="company__cols">
          <article className="company__col">
            <div className="company__logo"><Image src="/assets/brand/nunnari-labs-ink.png" alt="Nunnari Labs" width={274} height={322} style={{ height: 52, width: "auto" }} /></div>
            <h3>Nunnari Labs</h3>
            <span className="company__where">Coimbatore, India</span>
            <ul className="company__list"><li>AI engineering company</li><li>ISO/IEC 42001 certified</li></ul>
          </article>
          <article className="company__col">
            <div className="company__logo"><Image src="/assets/logos/deepweaver.webp" alt="DeepWeaver" width={560} height={110} style={{ height: 30, width: "auto" }} /></div>
            <h3>DeepWeaver</h3>
            <span className="company__where">Sydney, Australia</span>
            <ul className="company__list"><li>Enterprise AI services</li><li>Weaving human-led AI into the enterprise</li></ul>
          </article>
          <article className="company__col">
            <div className="company__logo"><span className="company__ta" lang="ta">நுண்ணறிவு</span></div>
            <h3>Nunnarivu</h3>
            <span className="company__where">Where our name comes from</span>
            <ul className="company__list"><li>Tamil for “intelligence”</li><li>Rooted in Tamil Nadu, built for global learners</li></ul>
          </article>
        </div>
      </div>
    </section>
  );
}
