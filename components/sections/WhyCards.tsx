import { Card, Head } from "@/components/ui/Blocks";

const items = [
  { icon: "lang" as const, title: "Learn in English & Tamil", text: "Clear explanations in English and Tamil, so you truly understand." },
  { icon: "laptop" as const, title: "Hands-on AI programs", text: "Build real projects with modern tools through guided, hands-on learning." },
  { icon: "cap" as const, title: "1 year of LMS access", text: "A full year on our learning platform, with every resource and update." },
  { icon: "globe" as const, title: "Global AI community", text: "Meet fellow learners, attend AI events and find global opportunities." },
];

/** The four reasons that used to sit in the hero — now their own section. */
export default function WhyCards() {
  return (
    <section className="section" id="why">
      <div className="container">
        <Head pill="Why choose us" title={<>Why <span className="grad">Nunnari Academy?</span></>} lead="Learn. Build. Grow. With real support." />
        <div className="grid grid--4 why">
          {items.map((c, i) => <Card key={c.title} icon={c.icon} title={c.title} text={c.text} k={i} />)}
        </div>
      </div>
    </section>
  );
}
