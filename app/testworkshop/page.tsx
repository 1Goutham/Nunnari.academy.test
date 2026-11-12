import type { Metadata } from "next";
import Icon from "@/components/Icon";
import Image from "next/image";
import Art from "@/components/ui/Art";
import { Head } from "@/components/ui/Blocks";

/*
 * TEST PAGE (not linked anywhere, not indexed): how workshop posters look in place of the line illustrations.
 * Shows the same five workshops three ways: the current illustrated card, the poster cropped to the card's
 * 16:9 frame, and the full 4:5 poster. Delete this folder (app/testworkshop) when done.
 */
export const metadata: Metadata = { title: "Workshop posters (test)", robots: { index: false, follow: false } };

const items = [
  { poster: "/assets/img/posters/ai-for-small-business.webp", art: "store", type: "Webinar", date: "22 Oct 2026", title: "AI for Small Business", text: "Discover practical AI tools to simplify your work, attract customers and grow your business.", mode: "Online · Free" },
  { poster: "/assets/img/posters/deploying-llms-en.webp", art: "agent", type: "Webinar", date: "03 Oct 2026", title: "Deploying LLMs and Agents On-Prem, in Production", text: "Serving and optimising models, and running agents, on infrastructure you control.", mode: "Online · Free" },
  { poster: "/assets/img/posters/deploying-llms-ta.webp", art: "agent", type: "Webinar", date: "03 Oct 2026", title: "LLMs & AI Agents (Tamil)", text: "The same session, presented in Tamil, from notebook to production.", mode: "Online · Free" },
  { poster: "/assets/img/posters/mcp-blue.webp", art: "agentic", type: "Webinar", date: "26 Sep 2026", title: "Demystifying MCP", text: "From prompts to protocol: connecting agents to the world.", mode: "Online · Free" },
  { poster: "/assets/img/posters/mcp-pink.webp", art: "agentic", type: "Webinar", date: "26 Sep 2026", title: "Demystifying MCP (Bharatram)", text: "From prompts to protocol: connecting agents to the world.", mode: "Online · Free" },
];

type It = (typeof items)[number];
const Body = ({ it }: { it: It }) => (
  <div className="event__body">
    <div className="event__top"><span className="tag">{it.type}</span><span className="card__meta"><Icon name="calendar" />{it.date}</span></div>
    <h3>{it.title}</h3>
    <p className="clamp3">{it.text}</p>
    <div className="event__foot"><span className="card__meta"><Icon name="monitor" />{it.mode}</span><span className="link">View summary <Icon name="arrow-ur" /></span></div>
  </div>
);

export default function TestWorkshopPage() {
  return (
    <>
      <section className="page-hero page-hero--center">
        <div className="container"><div className="page-hero__copy">
          <span className="pill">Test page</span>
          <h1 className="t-h1">Workshop <span className="grad">posters.</span></h1>
          <p className="lead">The same workshops three ways, to compare. This page is not linked anywhere and is hidden from search.</p>
        </div></div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="A · Current" title={<>Illustrated <span className="grad">cards.</span></>} lead="What the site uses today: one line drawing per topic." />
          <div className="tw-grid">{items.slice(0, 3).map((it) => <article key={it.poster} className="card event"><Art name={it.art} /><Body it={it} /></article>)}</div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Head pill="B · Poster, cropped" title={<>Poster in the <span className="grad">card frame.</span></>} lead="The poster fills the same 16:9 frame, showing its upper part. Card sizes stay identical to today." />
          <div className="tw-grid">{items.slice(0, 3).map((it) => (
            <article key={it.poster} className="card event"><div className="tw-crop"><Image src={it.poster} alt={`${it.title} poster`} width={1000} height={1250} sizes="(max-width: 960px) 92vw, 380px" /></div><Body it={it} /></article>
          ))}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Head pill="C · Full poster" title={<>The whole <span className="grad">poster.</span></>} lead="The full 4:5 poster as the card, with the details under it. Nothing is cut, but cards are taller." />
          <div className="tw-grid">{items.map((it) => (
            <article key={it.poster} className="card event"><div className="tw-full"><Image src={it.poster} alt={`${it.title} poster`} width={1000} height={1250} sizes="(max-width: 960px) 92vw, 380px" /></div><Body it={it} /></article>
          ))}</div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <Head pill="D · Workshop page" title={<>Poster on the <span className="grad">workshop page.</span></>} lead="How a single workshop page could open: the details beside the full poster." />
          <div className="tw-detail">
            <div className="tw-detail__copy">
              <span className="tag">Webinar · Upcoming</span>
              <h2 className="t-h2">Demystifying <span className="grad">MCP.</span></h2>
              <p className="lead">From prompts to protocol: connecting agents to the world.</p>
              <ul className="tw-facts">
                <li><Icon name="calendar" />26 Sep 2026, Saturday</li>
                <li><Icon name="clock" />07:00 – 09:00 PM IST</li>
                <li><Icon name="monitor" />Online · 120 min · Free</li>
                <li><Icon name="user" />Shivaprakash S, Generative AI Engineer, Nunnari Labs</li>
              </ul>
              <span className="btn btn--primary btn--lg">Register Now <Icon name="arrow" className="i--arrow" /></span>
            </div>
            <div className="tw-full tw-detail__poster"><Image src="/assets/img/posters/mcp-blue.webp" alt="Demystifying MCP poster" width={1000} height={1250} sizes="(max-width: 960px) 92vw, 460px" /></div>
          </div>
        </div>
      </section>
    </>
  );
}
