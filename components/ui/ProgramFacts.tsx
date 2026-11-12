import Icon, { type IconName } from "@/components/Icon";

/** The three programme facts (who, how long, where) with the same icons on every programme card. */
export default function ProgramFacts({ facts, compact }: { facts: { icon: IconName; title: string; sub: string }[]; compact?: boolean }) {
  return (
    <div className={`pfacts${compact ? " pfacts--compact" : ""}`}>
      {facts.map((f) => (
        <div key={f.title} className="pfacts__item">
          <Icon name={f.icon} />
          <div><b>{f.title}</b>{f.sub && <span>{f.sub}</span>}</div>
        </div>
      ))}
    </div>
  );
}
