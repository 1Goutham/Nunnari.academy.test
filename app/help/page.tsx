import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, ORG_ID } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import Icon from "@/components/Icon";
import { Cta, PageHero } from "@/components/ui/Blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: "Help & Contact", description: "Questions about Nunnari Academy programs, payments or platform access? Call +91 90033 13175 or email enquiry@nunnari.academy. We reply within 24–48 hours.", path: "/help" });

export default function HelpPage() {
  return (
    <>
      <JsonLd data={[{ "@type": "ContactPage", name: "Help & Contact", url: "https://nunnari.academy/help", about: { "@id": ORG_ID } }, breadcrumbs([{ name: "Help & Contact", path: "/help" }])]} />
      <PageHero pill="Support" title={<>Help &amp; <span className="grad">support.</span></>} lead="Questions about programs, payments or platform access? We’re here to help." />
      <section className="section section--dark" id="contact">
        <div className="container"><div className="grid grid--2" style={{ maxWidth: 820 }}>
          <a className="card card--link" href={site.phone.href} data-reveal="">
            <span className="ico"><Icon name="phone" /></span><h3>Call us</h3><p>{site.phone.label}</p>
          </a>
          <a className="card card--link" href={`mailto:${site.email}`} data-reveal="" style={{ "--d": ".06s" } as React.CSSProperties}>
            <span className="ico"><Icon name="mail" /></span><h3>Email us</h3><p>{site.email}</p>
          </a>
        </div></div>
      </section>
      <Cta art="community" title={<>Prefer a <span className="grad">call back?</span></>} lead="Leave your details and our experts will reach you within 24 to 48 hours."
        actions={<button className="btn btn--primary btn--lg" type="button" data-enquire="Request a Call">Request a Call <Icon name="arrow" className="i--arrow" /></button>} />
    </>
  );
}
