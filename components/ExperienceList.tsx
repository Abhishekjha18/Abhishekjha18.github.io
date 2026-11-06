import Link from "next/link";
import { experience } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

/** Full timeline — lives on /experience. */
export function ExperienceList() {
  return (
    <ol className="border-t border-ink">
      {experience.map((r, i) => (
        <li key={r.org + r.dates}>
          <Reveal delay={i * 40}>
            <article className="grid gap-x-10 gap-y-4 border-b border-rule py-10 md:grid-cols-[210px_1fr]">
              <div className="md:pt-1.5">
                <div className="font-mono text-xs text-muted">{r.dates}</div>
                {i === 0 && <span className="badge mt-3">Latest</span>}
              </div>
              <div>
                <h2 className="display text-[clamp(1.9rem,3vw,2.6rem)]">
                  {r.org}
                  {r.place && <span className="ml-3 align-middle font-sans text-sm text-faint">{r.place}</span>}
                </h2>
                <p className="mt-1.5 text-lg text-accent">{r.title}</p>
                {r.blurb && <p className="mt-3 max-w-[68ch] text-muted">{r.blurb}</p>}

                <ul className="mt-5 max-w-[78ch] space-y-3">
                  {r.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.98rem] leading-relaxed">
                      <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {r.more && (
                  <details className="group mt-4 max-w-[78ch]">
                    <summary className="eyebrow cursor-pointer list-none text-accent marker:hidden [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">+ {r.more.length} more at {r.org.split(" ")[0]}</span>
                      <span className="hidden group-open:inline">− Show less</span>
                    </summary>
                    <ul className="mt-4 space-y-3">
                      {r.more.map((pt) => (
                        <li key={pt} className="flex gap-3 text-[0.98rem] leading-relaxed">
                          <span className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-faint" aria-hidden />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** Three-line summary for the landing page. */
export function ExperienceTeaser() {
  const rows = experience.filter((r) => r.oneLine);
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
      <SectionHeader eyebrow="Experience" title="Where I've worked" action={{ href: "/experience/", label: "Full experience" }} />
      <ul className="border-t border-ink">
        {rows.map((r, i) => (
          <li key={r.org}>
            <Reveal delay={i * 60}>
              <Link
                href="/experience/"
                className="group grid gap-x-8 gap-y-1 border-b border-rule py-7 transition-colors hover:bg-elev md:grid-cols-[190px_1fr_1.5fr_auto] md:items-baseline md:px-3"
              >
                <span className="font-mono text-xs text-muted">{r.dates}</span>
                <span className="display text-[1.7rem] leading-tight transition-colors group-hover:text-accent">{r.org}</span>
                <span className="text-[0.95rem] text-muted">{r.oneLine}</span>
                <span className="hidden text-xl transition group-hover:translate-x-1 group-hover:text-accent md:block" aria-hidden>
                  →
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
