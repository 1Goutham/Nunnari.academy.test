import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { Cta, PageHero } from "@/components/ui/Blocks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help & Support",
  description: "Reach Nunnari Academy for help with programs, payments or platform access.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <>
      <PageHero title="Help & support." lead="Questions about programs, payments or platform access? We’re here to help." />
      <section className="section section--top0" id="contact">
        <div className="container reach">
          <a href={site.phone.href}><span>Call us</span><b>{site.phone.label}</b></a>
          <a href={`mailto:${site.email}`}><span>Email us</span><b>{site.email}</b></a>
        </div>
      </section>
      <Cta art="community" title="Prefer a call back?" lead="Leave your details and our experts will reach you within 24 to 48 hours."
        actions={<button className="btn btn--primary btn--lg" type="button" data-enquire="Request a Call">Request a Call <Icon name="arrow" className="i--arrow" /></button>} />
    </>
  );
}
