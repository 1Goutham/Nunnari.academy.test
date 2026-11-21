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

export const metadata: Metadata = pageMeta({ title: "AI Courses for Every Level", description: "Compare Nunnari Academy's three AI programs: GenAI Essentials for students, AI Engineering in Generative and Agentic AI, and Advanced GenAI & Leadership.", path: "/programs" });

const faqCats = [{ key: "choose", label: "Choosing" }, { key: "enrol", label: "Enrolling" }];
const faq = [
  { q: "What AI courses does Nunnari Academy offer?", cats: ["choose"], a: "Three programs: GenAI Essentials, a 4-week self-paced course for school and college students; AI Engineering, a 4-week instructor-led Generative AI and Agentic AI course for beginners and career switchers; and Advanced GenAI & Leadership, an 8-week program for experienced professionals, technical leaders and C-suite executives." },
  { q: "Are the programs online or offline?", cats: ["choose"], a: "GenAI Essentials is online, with recorded sessions you follow at your own pace. AI Engineering and Advanced GenAI & Leadership run both online and offline." },
  { q: "Which program is right for me?", cats: ["choose"], a: "GenAI Essentials is for school and college students, AI Engineering for beginners, aspiring professionals and career switchers, and Advanced GenAI & Leadership for experienced professionals, technical leaders and C-suite executives." },
  { q: "How long are the programs?", cats: ["choose"], a: "GenAI Essentials and AI Engineering are 4 weeks each; Advanced GenAI & Leadership is 8 weeks." },
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
        lead="GenAI Essentials, AI Engineering and Advanced GenAI & Leadership: four to eight weeks, in English and Tamil."
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
          <Head pill="AI Engineering tracks" title={<>Tracks for <span className="grad">every path.</span></>} />
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
