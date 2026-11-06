import Link from "next/link";
import { beyond, education, honors, skills } from "@/lib/content";
import { Reveal } from "./Reveal";

export function HonorsList() {
  return (
    <ul className="border-t border-ink">
      {honors.map((h, i) => {
        const inner = (
          <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-rule py-6 md:grid-cols-[110px_110px_1fr]">
            <span className="font-mono text-xs text-muted">{h.when}</span>
            <span className={`display text-[2.4rem] leading-none ${h.big ? "text-accent" : ""}`}>{h.big ?? ""}</span>
            <div>
              <h3 className="text-[1.05rem] font-medium leading-snug">{h.title}</h3>
              <p className="mt-1 text-[0.95rem] text-muted">{h.detail}</p>
            </div>
          </div>
        );
        return (
          <li key={h.title}>
            <Reveal delay={(i % 4) * 50}>
              {h.href ? (
                <Link href={h.href} className="group block transition-colors hover:bg-elev md:px-2">
                  {inner}
                </Link>
              ) : (
                <div className="md:px-2">{inner}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

export function Skills() {
  return (
    <Reveal>
      <dl className="border-t border-ink">
        {skills.map((g) => (
          <div key={g.group} className="grid gap-x-6 gap-y-2 border-b border-rule py-5 sm:grid-cols-[170px_1fr]">
            <dt className="font-display text-xl">{g.group}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {g.items.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

export function EducationBlock() {
  return (
    <Reveal>
      <div className="border-t border-ink pt-5">
        <p className="font-mono text-xs text-muted">{education.dates}</p>
        <p className="display mt-2 text-[1.9rem] leading-tight">{education.school}</p>
        <p className="mt-2 text-accent">{education.degree}</p>
        <p className="eyebrow mb-3 mt-6">Relevant coursework</p>
        <div className="flex flex-wrap gap-1.5">
          {education.coursework.map((c) => (
            <span key={c} className="chip">
              {c}
            </span>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">{education.earlier}</p>
      </div>
    </Reveal>
  );
}

export function BeyondList() {
  return (
    <Reveal>
      <ul className="border-t border-ink">
        {beyond.map((b) => (
          <li key={b.title} className="border-b border-rule py-4">
            <div className="font-medium">{b.title}</div>
            <div className="text-sm text-muted">{b.detail}</div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
