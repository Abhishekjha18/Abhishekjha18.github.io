"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { categories, projects, type CategoryId } from "@/lib/content";

export function ProjectsExplorer() {
  const [cat, setCat] = useState<CategoryId | "all">("all");

  // Deep links such as /projects/#silicon preselect a category.
  useEffect(() => {
    const apply = () => {
      const h = window.location.hash.slice(1);
      setCat(categories.some((c) => c.id === h) ? (h as CategoryId) : "all");
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  function choose(id: CategoryId | "all") {
    setCat(id);
    history.replaceState(null, "", id === "all" ? window.location.pathname : `#${id}`);
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    for (const p of projects) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const list = useMemo(
    () =>
      [...projects]
        .filter((p) => cat === "all" || p.category === cat)
        .sort((a, b) => Number(b.year) - Number(a.year)),
    [cat],
  );

  const tabs: { id: CategoryId | "all"; label: string }[] = [{ id: "all", label: "Everything" }, ...categories];

  return (
    <div>
      <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={cat === t.id}
            onClick={() => choose(t.id)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              cat === t.id ? "border-ink bg-ink text-bg" : "border-rule text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {t.label}
            <span className={`ml-2 font-mono text-[11px] ${cat === t.id ? "text-bg/60" : "text-faint"}`}>
              {counts[t.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-5 min-h-6 text-sm text-muted">
        {cat === "all" ? "Newest first." : categories.find((c) => c.id === cat)?.blurb}
      </p>

      <ul className="mt-4 border-t border-ink">
        {list.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}/`}
              className="group grid gap-x-8 gap-y-3 border-b border-rule py-7 transition-colors hover:bg-elev md:grid-cols-[80px_1.2fr_1fr_auto] md:items-center md:px-3"
            >
              <span className="font-mono text-xs text-muted">{p.year}</span>
              <div>
                <h2 className="display text-[1.8rem] leading-tight transition-colors group-hover:text-accent">
                  {p.title}
                  {p.badge && <span className="badge ml-3 align-middle">{p.badge}</span>}
                </h2>
                <p className="mt-1.5 text-[0.95rem] text-muted">{p.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              <span className="hidden text-xl transition group-hover:translate-x-1 group-hover:text-accent md:block" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
