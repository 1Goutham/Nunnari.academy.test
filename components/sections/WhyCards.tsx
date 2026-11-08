import { Head, Row } from "@/components/ui/Blocks";

const items = [
  { icon: "lang" as const, title: "Learn in English & Tamil", text: "Clear explanations and examples in English and Tamil, so you truly understand." },
  { icon: "laptop" as const, title: "Hands-on AI programs", text: "Build real projects with modern tools through guided, hands-on learning." },
  { icon: "cap" as const, title: "1 year of LMS access", text: "A full year on our learning platform, with every resource and update." },
  { icon: "globe" as const, title: "Global AI community", text: "Meet fellow learners, attend AI events and find global opportunities." },
];

/** The four reasons, as rows beside a head that stays in view. */
export default function WhyCards() {
  return (
    <section className="section" id="why">
      <div className="container aside-rows">
        <Head title="Learn. Build. Grow. With real support." />
        <ul className="rows">
          {items.map((c) => <Row key={c.title} icon={c.icon} title={c.title} text={c.text} />)}
        </ul>
      </div>
    </section>
  );
}
