import type { ReactNode } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Split from "@/components/Split";
import Art from "./Art";

/**
 * Section head: the heading on the column line and at most one line with it.
 * `split` sets the line beside the head (baselines aligned); `action` puts a link at the far edge.
 */
export function Head({ title, lead, action, split, as = "h2", id }: { title: ReactNode; lead?: ReactNode; action?: ReactNode; split?: boolean; as?: "h1" | "h2"; id?: string }) {
  const H = ({ children }: { children: ReactNode }) => <Split as={as} id={id}>{children}</Split>;
  if (action) {
    return (
      <div className="head head--row">
        <div className="head"><H>{title}</H>{lead && <p className="lead">{lead}</p>}</div>
        <div>{action}</div>
      </div>
    );
  }
  return (
    <div className={`head${split ? " head--split" : ""}`}>
      <H>{title}</H>
      {lead && <p className="lead">{lead}</p>}
    </div>
  );
}

type Crumb = { href?: string; label: string };
type Fact = { icon?: Parameters<typeof Icon>[0]["name"]; title: string; sub: string };

/**
 * Inner-page hero. With a visual it is a Stage (text on six columns, the panel on the other six,
 * bleeding off the edge); without one it is a Banner (the head at poster scale).
 */
export function PageHero({ crumbs, title, lead, facts, actions, art, children }: {
  crumbs?: Crumb[]; title: ReactNode; lead?: ReactNode; facts?: Fact[]; actions?: ReactNode; art?: string; children?: ReactNode;
}) {
  return (
    <section className={`page-hero${art ? "" : " page-hero--banner"}`}>
      <div className="container page-hero__grid">
        <div className="page-hero__copy">
          {crumbs && (
            <nav className="crumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <span key={c.label} style={{ display: "contents" }}>
                  {i > 0 && <Icon name="chevron-r" />}
                  {i === crumbs.length - 1 ? <span aria-current="page">{c.label}</span> : c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
                </span>
              ))}
            </nav>
          )}
          <Split as="h1">{title}</Split>
          {lead && <p className="lead">{lead}</p>}
          {facts && (
            <dl className="facts" style={{ "--n": facts.length } as React.CSSProperties}>
              {facts.map((f) => <div key={f.title}><dt>{f.title}</dt><dd>{f.sub}</dd></div>)}
            </dl>
          )}
          {actions && <div className="actions">{actions}</div>}
          {children}
        </div>
        {art && <div className="page-hero__visual"><Art name={art} /></div>}
      </div>
    </section>
  );
}

/** Closing band on the ink plate: the head, one line, the page's action, and the page's panel beside it. */
export function Cta({ title, lead, actions, art, id }: { title: ReactNode; lead?: ReactNode; actions: ReactNode; art?: string; id?: string }) {
  return (
    <section className="plate section--s" id={id}>
      <div className={`container cta${art ? "" : " cta--wide"}`}>
        <div className="cta__copy">
          <Split as="h2">{title}</Split>
          {lead && <p className="lead">{lead}</p>}
          <div className="actions">{actions}</div>
        </div>
        {art && <Art name={art} />}
      </div>
    </section>
  );
}

/** A row: the title (with its icon inline) on the left, its line on the right. */
export function Row({ icon, title, text }: { icon?: Parameters<typeof Icon>[0]["name"]; title: string; text: string }) {
  return (
    <li>
      <h3>{icon && <Icon name={icon} />}{title}</h3>
      <p>{text}</p>
    </li>
  );
}

export const EnquireButton = ({ topic, children, ghost }: { topic: string; children: ReactNode; ghost?: boolean }) => (
  <button className={`btn btn--lg ${ghost ? "btn--ghost" : "btn--primary"}`} type="button" data-enquire={topic}>
    {children} <Icon name="arrow" className="i--arrow" />
  </button>
);
