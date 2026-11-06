import Link from "next/link";
import { papers, projects, threads, type ThreadId } from "@/lib/content";
import { Reveal } from "./Reveal";

const threadProjects: Record<ThreadId, string[]> = {
  verify: ["buy-or-wait", "claimcast"],
  remember: ["agent-memory-bus"],
  compress: [],
};

/**
 * The three research threads.
 * compact = landing page: a short card per thread that links through.
 * full    = research page: adds the related papers, projects and the playground link.
 */
export function Threads({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const full = variant === "full";
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule md:grid-cols-3">
      {threads.map((t, i) => {
        const related = papers.filter((p) => p.thread === t.id);
        const projs = threadProjects[t.id].map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
        return (
          <Reveal key={t.id} delay={i * 90} className="flex flex-col bg-elev p-7 sm:p-8">
            <div className="flex items-baseline justify-between">
              <h3 className="display text-[2.6rem]">{t.verb}</h3>
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
            </div>
            <p className="mt-2 font-display text-xl italic text-accent">{t.line}</p>
            {full && <p className="mt-4 text-[0.95rem] text-muted">{t.body}</p>}

            <ul className="mt-auto space-y-1.5 pt-6 font-mono text-[12px]">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/research/${p.slug}/`} className="link-u text-ink">
                    ↳ {p.short}
                  </Link>
                  <span className="text-faint"> · {p.venueShort}</span>
                </li>
              ))}
              {full &&
                projs.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}/`} className="link-u text-ink">
                      ↳ {p.title}
                    </Link>
                    <span className="text-faint"> · project</span>
                  </li>
                ))}
              {full && t.id === "compress" && (
                <li>
                  <Link href="#quantization" className="link-u text-ink">
                    ↳ Try the bit-width slider
                  </Link>
                  <span className="text-faint"> · interactive</span>
                </li>
              )}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}
