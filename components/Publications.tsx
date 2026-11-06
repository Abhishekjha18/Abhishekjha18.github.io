import Link from "next/link";
import { papers } from "@/lib/content";
import { Reveal } from "./Reveal";

function Authors({ names }: { names: string[] }) {
  return (
    <span>
      {names.map((n, i) => (
        <span key={n}>
          {n === "Abhishek Jha" ? <b className="font-semibold text-ink">{n}</b> : n}
          {i < names.length - 1 ? ", " : ""}
        </span>
      ))}
    </span>
  );
}

export function Publications() {
  return (
    <ul className="border-t border-ink">
      {papers.map((p, i) => (
        <li key={p.slug}>
          <Reveal delay={i * 60}>
            <Link
              href={`/research/${p.slug}/`}
              className="group grid gap-x-8 gap-y-3 border-b border-rule py-8 transition-colors hover:bg-elev md:grid-cols-[170px_1fr_auto] md:items-start md:px-3"
            >
              <div className="eyebrow md:pt-2">
                {p.venueShort}
                <span className="mt-1 block text-faint normal-case tracking-normal">{p.year}</span>
              </div>
              <div>
                <h3 className="display text-[clamp(1.5rem,2.6vw,2.15rem)] leading-[1.1] transition-colors group-hover:text-accent">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[70ch] text-[0.95rem] text-muted">{p.tldr}</p>
                <p className="mt-3 text-xs leading-relaxed text-faint">
                  <Authors names={p.authors} />
                </p>
              </div>
              <div className="flex items-center gap-4 md:pt-2">
                <span className="badge">{p.status}</span>
                <span className="hidden text-xl transition group-hover:translate-x-1 group-hover:text-accent md:block" aria-hidden>
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
