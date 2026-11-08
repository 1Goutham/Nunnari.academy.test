import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Hero from "@/components/sections/Hero";
import WhyCards from "@/components/sections/WhyCards";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Company from "@/components/sections/Company";
import Impact from "@/components/sections/Impact";
import ProgramsCatalog from "@/components/sections/ProgramsCatalog";
import WorkshopCarousel from "@/components/events/WorkshopCarousel";
import { Cta, Head } from "@/components/ui/Blocks";
import { getWorkshops } from "@/lib/workshops";

export const metadata: Metadata = {
  title: { absolute: "Nunnari Academy — Learn AI. Create What Doesn’t Exist Yet." },
  description: "Practical, hands-on AI programs in English and Tamil. Build real skills, create real projects, and grow with a Pioneering AI community.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const workshops = getWorkshops().slice(0, 6).map(({ summaryHtml: _s, ...w }) => w);
  return (
    <>
      <Hero />
      <WhyCards />

      <section className="section" id="who-we-are">
        <div className="container">
          <Head split title="More than an AI academy. A higher possibility." lead="Practical, accessible, future-ready AI education, from India for global learners." />
          <WhoWeAre />
        </div>
      </section>

      <Company />
      <Impact />

      <section className="section" id="programs">
        <div className="container">
          <Head title="Learn AI at your own pace and path." action={<Link className="link" href="/programs">All programs <Icon name="arrow-ur" /></Link>} />
          <ProgramsCatalog />
        </div>
      </section>

      <section className="section section--top0" id="events">
        <div className="container">
          <Head title="Where opportunity evolves." action={<Link className="link" href="/explore">View all events <Icon name="arrow-ur" /></Link>} />
          <WorkshopCarousel items={workshops} />
        </div>
      </section>

      <Cta
        title="Ready to start your AI journey?"
        lead="Talk to our team. We will help you find the right program."
        actions={<button className="btn btn--primary btn--lg" type="button" data-enquire="Talk to our experts">Talk to our experts <Icon name="arrow" className="i--arrow" /></button>}
      />
    </>
  );
}
