import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, papers, projects } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.tagline} ${p.summary}`.slice(0, 280),
    alternates: { canonical: "./" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = projects[idx];
  const cat = categories.find((c) => c.id === p.category)?.label;
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const relatedPapers = papers.filter((x) => x.related?.includes(p.slug));

  return (
    <article className="mx-auto max-w-[1200px] px-5 pb-28 pt-32 sm:px-8 sm:pt-40">
      <Link href="/projects/" className="eyebrow link-u inline-block hover:text-ink">
        ← All projects
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow">
            {cat} · {p.year}
          </span>
          {p.badge && <span className="badge">{p.badge}</span>}
        </div>
        <h1 className="display mt-5 max-w-[18ch] text-[clamp(2.8rem,8vw,6.4rem)]">{p.title}</h1>
        <p className="prose-lede mt-6 !max-w-[56ch] !text-[clamp(1.15rem,1.8vw,1.45rem)] !text-ink">{p.tagline}</p>

        {p.links && (
          <div className="mt-8 flex flex-wrap gap-3">
            {p.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${i === 0 ? "btn-solid" : "btn-ghost"}`}
              >
                {l.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
        )}
      </header>

      {p.metrics && (
        <dl className="mt-14 grid grid-cols-2 border-y border-rule sm:grid-cols-3">
          {p.metrics.map((m, i) => (
            <div key={m.label} className={`px-1 py-7 sm:px-8 ${i > 0 ? "sm:border-l sm:border-rule" : ""}`}>
              <dd className="display text-[clamp(2.4rem,5vw,4rem)] leading-none text-accent">{m.value}</dd>
              <dt className="eyebrow mt-3">{m.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <h2 className="eyebrow mb-4">Overview</h2>
          <p className="text-[1.12rem] leading-relaxed">{p.summary}</p>

          <h2 className="eyebrow mb-4 mt-14">What&rsquo;s inside</h2>
          <ol className="border-t border-ink">
            {p.highlights.map((h, i) => (
              <li key={h} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-rule py-5">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
          {p.role && (
            <div>
              <h2 className="eyebrow mb-3">Role</h2>
              <p className="text-[0.98rem] leading-relaxed">{p.role}</p>
            </div>
          )}
          <div>
            <h2 className="eyebrow mb-3">Stack</h2>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
          {relatedPapers.length > 0 && (
            <div>
              <h2 className="eyebrow mb-3">Related research</h2>
              <ul className="space-y-2">
                {relatedPapers.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/research/${r.slug}/`} className="link-u">
                      {r.short}
                    </Link>
                    <span className="text-sm text-faint"> · {r.venueShort}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {p.note && <p className="text-sm text-muted">{p.note}</p>}
        </aside>
      </div>

      <nav className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2" aria-label="More projects">
        <Link href={`/projects/${prev.slug}/`} className="group bg-elev p-7 transition hover:bg-bg">
          <div className="eyebrow">← Previous</div>
          <div className="display mt-2 text-2xl transition-colors group-hover:text-accent">{prev.title}</div>
        </Link>
        <Link href={`/projects/${next.slug}/`} className="group bg-elev p-7 text-right transition hover:bg-bg">
          <div className="eyebrow">Next →</div>
          <div className="display mt-2 text-2xl transition-colors group-hover:text-accent">{next.title}</div>
        </Link>
      </nav>
    </article>
  );
}
