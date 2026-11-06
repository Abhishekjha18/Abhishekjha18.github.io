import Link from "next/link";
import { categories, type Project } from "@/lib/content";

export function ProjectCard({ p, large, brief }: { p: Project; large?: boolean; brief?: boolean }) {
  const cat = categories.find((c) => c.id === p.category)?.label;
  return (
    <Link
      href={`/projects/${p.slug}/`}
      className="group flex h-full flex-col rounded-2xl border border-rule bg-elev p-6 transition duration-300 hover:-translate-y-1 hover:border-ink sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="eyebrow">
          {cat} · {p.year}
        </span>
        {p.badge && <span className="badge">{p.badge}</span>}
      </div>

      <h3 className={`display mt-5 ${large ? "text-[clamp(2.2rem,4vw,3.4rem)]" : "text-[2rem]"}`}>{p.title}</h3>
      <p className={`mt-3 text-muted ${large ? "max-w-[52ch] text-[1.05rem]" : ""}`}>{p.tagline}</p>

      {p.metrics && !brief && (
        <dl className="mt-6 grid grid-cols-3 gap-x-4 border-t border-rule pt-5">
          {p.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <dd className="font-display text-2xl leading-none">{m.value}</dd>
              <dt className="eyebrow mt-1.5 !text-[0.62rem]">{m.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div className="flex flex-wrap gap-1.5">
          {p.stack.slice(0, brief ? 3 : large ? 5 : 4).map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rule transition group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
          aria-hidden
        >
          →
        </span>
      </div>
    </Link>
  );
}
