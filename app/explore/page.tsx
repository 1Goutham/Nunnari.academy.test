import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Spotlight from "@/components/events/Spotlight";
import WorkshopList from "@/components/events/WorkshopList";
import AddToCalendar from "@/components/events/AddToCalendar";
import Testimonials from "@/components/sections/Testimonials";
import Split from "@/components/Split";
import { Cta, Head, PageHero } from "@/components/ui/Blocks";
import { getSpotlight, getWorkshops } from "@/lib/workshops";

export const metadata: Metadata = {
  title: "Explore — Workshops, Testimonials & Community",
  description: "Upcoming and past Nunnari Academy workshops with recordings, learner stories, and the AI Tamil Nadu community.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  const all = getWorkshops().map(({ summaryHtml: _s, ...w }) => w);
  const spot = getSpotlight(all);
  return (
    <>
      <PageHero
        title="Workshops, stories and a growing AI community."
        lead="Learn from industry experts, meet fellow learners and catch up on every session you missed."
      >
        <nav aria-label="Explore sections">
          <ul className="jump">
            <li><a href="#workshops">Workshops</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#community">Community</a></li>
          </ul>
        </nav>
      </PageHero>

      <section className="section section--top0" id="workshops">
        <div className="container">
          <Head split title="Learn live. Watch anytime." lead="Register for upcoming sessions, or watch recordings and summaries of completed ones." />
          {spot && <Spotlight w={spot} />}
        </div>
      </section>

      <section className="field--mark section--s" aria-labelledby="saturday-title">
        <div className="container saturday">
          <Split as="p" className="saturday__day" aria-hidden="true">Saturday</Split>
          <div className="saturday__copy">
            <h2 id="saturday-title">Free community session, every Saturday</h2>
            <p>Meet fellow learners and get a taste of what we build together.</p>
            <AddToCalendar weeklySaturday title="Nunnari Academy — Free Saturday community session" description="Free community session: meet fellow learners and get a taste of what we build together." className="btn btn--primary btn--lg" />
          </div>
        </div>
      </section>

      <section className="section" aria-label="All workshops">
        <div className="container">
          <WorkshopList items={all.filter((w) => w.slug !== spot?.slug)} />
        </div>
      </section>

      <section className="section section--top0" id="testimonials">
        <div className="container">
          <Head title="Learners who found their next step." />
        </div>
        <Testimonials />
      </section>

      <Cta
        id="community"
        art="community"
        title="Join our community."
        lead="Connect with AI learners, attend exclusive events, network with experts and discover global opportunities."
        actions={<a className="btn btn--primary btn--lg" href="https://aitamilnadu.org/" target="_blank" rel="noopener">Join the Community <Icon name="arrow-ur" className="i--ur" /></a>}
      />
    </>
  );
}
