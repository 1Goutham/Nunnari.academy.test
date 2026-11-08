import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Faq from "@/components/ui/Faq";
import TrackList from "@/components/sections/TrackList";
import { Cta, Head, PageHero } from "@/components/ui/Blocks";
import { programList } from "@/lib/programs";

export const metadata: Metadata = {
  title: "Programs — Recorded, Regular & Premium",
  description: "Three 12-week AI programmes: Recorded for K12 & college students, Regular for beginners (L1), Premium for advanced learners (L3+) and the C-Suite.",
  alternates: { canonical: "/programs" },
};

const faqCats = [{ key: "choose", label: "Choosing" }, { key: "enrol", label: "Enrolling" }];
const faq = [
  { q: "Which programme is right for me?", cats: ["choose"], a: "Recorded is for K12 and college students, Regular for beginners (L1), and Premium for advanced learners (L3+) and the C-Suite." },
  { q: "How long are the programmes?", cats: ["choose"], a: "All three programmes are 12 weeks." },
  { q: "Which languages are the classes in?", cats: ["choose"], a: "English and Tamil." },
  { q: "How do I enroll?", cats: ["enrol"], a: "Choose a programme and click Enroll Now, or talk to our team. We reach out within 24 to 48 hours." },
  { q: "Do I get access to the learning platform?", cats: ["enrol"], a: "Yes, one year of access to our LMS with all course resources and updates." },
];

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Learn AI at your own pace and path."
        lead="Three 12-week programmes, from your first steps in AI to leading it."
      />

      <section className="section section--top0" aria-label="The three programmes">
        <div className="container">
          <ol className="index">
            {programList.map((p) => (
              <li key={p.key}>
                <Link href={`/programs/${p.key}`}>
                  <span className="index__name">{p.name}</span>
                  <span className="index__who"><b>{p.short}</b><span>{p.facts.map((f) => f.title).join(", ")}</span></span>
                  <span className="index__lead">{p.lead}</span>
                  <Icon name="arrow-ur" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <Head split title="12-week tracks for every path." lead="Regular programme tracks." />
          <TrackList />
        </div>
      </section>

      <section className="section">
        <div className="container aside-rows">
          <Head title="Questions, answered." />
          <Faq cats={faqCats} items={faq} />
        </div>
      </section>

      <Cta
        art="regular"
        title="Not sure where to start?"
        lead="Talk to our team and we will help you choose the right programme."
        actions={<button className="btn btn--primary btn--lg" type="button" data-enquire="Help me choose a programme">Talk to us <Icon name="arrow" className="i--arrow" /></button>}
      />
    </>
  );
}
