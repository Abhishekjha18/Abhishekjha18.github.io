import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { papers, projects } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = papers.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.short,
    description: `${p.title} — ${p.venue}. ${p.tldr}`.slice(0, 290),
    alternates: { canonical: "./" },
  };
}

export default async function PaperPage({ params }: Props) {
  const { slug } = await params;
  const idx = papers.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const p = papers[idx];
  const next = papers[(idx + 1) % papers.length];
  const prev = papers[(idx - 1 + papers.length) % papers.length];
  const related = (p.related ?? []).map((s) => projects.find((x) => x.slug === s)).filter(Boolean);

  return (
    <article className="mx-auto max-w-[1000px] px-5 pb-28 pt-32 sm:px-8 sm:pt-40">
      <Link href="/#research" className="eyebrow link-u inline-block hover:text-ink">
        ← Research
      </Link>

      <header className="mt-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge">{p.status}</span>
          <span className="eyebrow">{p.venue}</span>
        </div>
        <h1 className="display mt-6 text-[clamp(2.2rem,5.4vw,4.2rem)] leading-[1.05]">{p.title}</h1>
        <p className="mt-6 text-[0.98rem] leading-relaxed text-muted">
          {p.authors.map((n, i) => (
            <span key={n}>
              {n === "Abhishek Jha" ? <b className="font-semibold text-ink">{n}</b> : n}
              {i < p.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        {(p.link || p.doi) && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {p.link && (
              <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                {p.link.label} <span aria-hidden>↗</span>
              </a>
            )}
            {p.doi && <span className="font-mono text-xs text-muted">DOI {p.doi}</span>}
          </div>
        )}
      </header>

      <blockquote className="mt-14 border-l-2 border-accent pl-6 font-display text-[clamp(1.5rem,3vw,2.2rem)] italic leading-snug">
        {p.tldr}
      </blockquote>

      <div className="mt-16 space-y-5 text-[1.1rem] leading-relaxed">
        <h2 className="eyebrow !mb-6">Summary</h2>
        {p.summary.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="eyebrow mb-4">Key results</h2>
        <ol className="border-t border-ink">
          {p.points.map((pt, i) => (
            <li key={pt} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-rule py-5">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="leading-relaxed">{pt}</span>
            </li>
          ))}
        </ol>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="eyebrow mb-4">The same pattern, in practice</h2>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-3">
            {related.map((r) => (
              <li key={r!.slug} className="bg-elev">
                <Link href={`/projects/${r!.slug}/`} className="group block h-full p-6 transition hover:bg-bg">
                  <div className="display text-2xl transition-colors group-hover:text-accent">{r!.title}</div>
                  <p className="mt-2 text-sm text-muted">{r!.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <nav className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2" aria-label="More papers">
        <Link href={`/research/${prev.slug}/`} className="group bg-elev p-7 transition hover:bg-bg">
          <div className="eyebrow">← Previous</div>
          <div className="display mt-2 text-2xl transition-colors group-hover:text-accent">{prev.short}</div>
        </Link>
        <Link href={`/research/${next.slug}/`} className="group bg-elev p-7 text-right transition hover:bg-bg">
          <div className="eyebrow">Next →</div>
          <div className="display mt-2 text-2xl transition-colors group-hover:text-accent">{next.short}</div>
        </Link>
      </nav>
    </article>
  );
}
