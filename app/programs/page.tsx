import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Icon from "@/components/Icon";
import ProgramFacts from "@/components/ui/ProgramFacts";
import Art from "@/components/ui/Art";
import Faq from "@/components/ui/Faq";
import TrackList from "@/components/sections/TrackList";
import { Cta, Head, PageHero } from "@/components/ui/Blocks";
import { programList, programPath } from "@/lib/programs";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, course, faqPage, programItemList } from "@/lib/schema";

export const metadata: Metadata = pageMeta({ title: "AI Courses for Every Level", description: "Compare Nunnari Academy's three 12-week AI programs: AI Essentials for students, Applied Generative and Agentic AI, and Advanced AI & Leadership.", path: "/programs" });

const faqCats = [{ key: "choose", label: "Choosing" }, { key: "enrol", label: "Enrolling" }];
const faq = [
  { q: "What AI courses does Nunnari Academy offer?", cats: ["choose"], a: "Three 12-week programs: AI Essentials, a self-paced course for school and college students; Applied AI, an instructor-led Generative AI and Agentic AI course for beginners and career switchers; and Advanced AI & Leadership, for experienced professionals, technical leaders and C-suite executives." },
  { q: "Are the programs online or offline?", cats: ["choose"], a: "AI Essentials is online, with recorded sessions you follow at your own pace. Applied AI and Advanced AI & Leadership run both online and offline." },
  { q: "Which program is right for me?", cats: ["choose"], a: "AI Essentials is for school and college students, Applied AI for beginners, aspiring professionals and career switchers, and Advanced AI & Leadership for experienced professionals, technical leaders and C-suite executives." },
  { q: "How long are the programs?", cats: ["choose"], a: "All three programs are 12 weeks." },
  { q: "Which languages are the classes in?", cats: ["choose"], a: "English and Tamil." },
  { q: "How do I enroll?", cats: ["enrol"], a: "Choose a program and click Enroll Now, or talk to our team. We reach out within 24 to 48 hours." },
  { q: "Do I get access to the learning platform?", cats: ["enrol"], a: "Yes, one year of access to our LMS with all course resources and updates." },
];

export default function ProgramsPage() {
  return (
    <>
      <JsonLd data={[programItemList(), ...programList.map((p) => course(p.key)), faqPage(faq, "/programs"), breadcrumbs([{ name: "Programs", path: "/programs" }])]} />
      <PageHero
        pill="Programs"
        title={<>From first steps <span className="grad">to leading AI.</span></>}
        lead="Three 12-week programs, from your first steps in AI to leading it."
      />

      <section className="section section--dark">
        <div className="container grid grid--3">
          {programList.map((p, i) => (
            <Link key={p.key} href={programPath(p.key)} className="card event card--link" data-reveal="" style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}>
              <Art name={p.art} />
              <div className="event__body">
                <div className="event__top"><span className="tag">{p.short}</span><span className="num">{p.num}</span></div>
                <h3>{p.name}</h3>
                <p className="clamp3">{p.lead}</p>
                <ProgramFacts facts={p.facts} compact />
                <span className="link">View details <Icon name="arrow-ur" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="Applied AI tracks" title={<>12-week tracks for <span className="grad">every path.</span></>} />
          <TrackList />
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Head pill="FAQ" title={<>Questions, <span className="grad">answered.</span></>} />
          <Faq cats={faqCats} items={faq} />
        </div>
      </section>

      <Cta
        art="regular"
        title={<>Not sure where <span className="grad">to start?</span></>}
        lead="Talk to our team and we will help you choose the right program."
        actions={<button className="btn btn--primary btn--lg" type="button" data-enquire="Help me choose a program">Talk to us <Icon name="arrow" className="i--arrow" /></button>}
      />
    </>
  );
}
