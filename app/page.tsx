import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Icon from "@/components/Icon";
import Hero from "@/components/sections/Hero";
import WhyCards from "@/components/sections/WhyCards";
import WhoWeAre from "@/components/sections/WhoWeAre";
import Company from "@/components/sections/Company";
import Impact from "@/components/sections/Impact";
import ProgramsCatalog from "@/components/sections/ProgramsCatalog";
import WorkshopCarousel from "@/components/events/WorkshopCarousel";
import PastEvents from "@/components/events/PastEvents";
import { Cta, Head } from "@/components/ui/Blocks";
import { getWorkshops } from "@/lib/workshops";

export const metadata: Metadata = pageMeta({ title: "AI Courses in English & Tamil | Nunnari Academy", absoluteTitle: true, description: "Hands-on AI courses in English and Tamil: GenAI Essentials for students, AI Engineering in Generative and Agentic AI, and Advanced GenAI & Leadership. Online and offline.", path: "/" });

export default function HomePage() {
  const workshops = getWorkshops().slice(0, 12).map(({ summaryHtml: _s, ...w }) => w);
  return (
    <>
      <Hero />
      <WhyCards />

      <section className="section" id="who-we-are">
        <div className="container">
          <Head pill="Who we are" title={<>More than an AI academy. <span className="grad">A higher possibility.</span></>} lead="Practical, accessible, future-ready AI education, from India for global learners." />
          <WhoWeAre />
        </div>
      </section>

      <Company />
      <Impact />

      <section className="section section--dark" id="programs">
        <div className="container">
          <Head pill="Our programs" title={<>From first steps <span className="grad">to leading AI.</span></>} action={<Link className="link" href="/programs">All programs <Icon name="arrow-ur" /></Link>} />
          <div data-reveal=""><ProgramsCatalog /></div>
        </div>
      </section>

      <section className="section" id="events">
        <div className="container">
          <Head pill="Workshops & events" title={<>Where opportunity <span className="grad">evolves.</span></>} action={<Link className="link" href="/explore">View all events <Icon name="arrow-ur" /></Link>} />
          <div data-reveal=""><WorkshopCarousel items={workshops} /></div>
          <div data-reveal=""><PastEvents items={workshops} builtAt={Date.now()} /></div>
        </div>
      </section>

      <Cta
        art="regular"
        title={<>Ready to start <span className="grad">your AI journey?</span></>}
        lead="Talk to our team. We will help you find the right program."
        actions={<button className="btn btn--primary btn--lg" type="button" data-enquire="Talk to our experts">Talk to our experts <Icon name="arrow" className="i--arrow" /></button>}
      />
    </>
  );
}
