import { person } from "@/lib/content";

/** The ORCID iD mark (green circle with "iD"), per ORCID's display guidelines. */
function OrcidMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden className="shrink-0">
      <circle cx="128" cy="128" r="128" fill="#A6CE39" />
      <g fill="#fff">
        <path d="M86.3 186.2H70.9V79.1h15.4v107.1z" />
        <path d="M108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7 0-21.5-13.7-39.7-43.7-39.7h-23.7v79.4z" />
        <circle cx="78.6" cy="56.4" r="9.4" />
      </g>
    </svg>
  );
}

type Item = { key: string; label: string; href: string; icon?: React.ReactNode; detail?: string };

const items: Record<string, Item> = {
  scholar: { key: "scholar", label: "Google Scholar", href: person.scholar },
  orcid: { key: "orcid", label: "ORCID", href: person.orcid, icon: <OrcidMark />, detail: person.orcidId },
  openreview: { key: "openreview", label: "OpenReview", href: person.openreview },
  github: { key: "github", label: "GitHub", href: person.github },
  linkedin: { key: "linkedin", label: "LinkedIn", href: person.linkedin },
};

/**
 * Pill links to profiles elsewhere.
 * research = where the papers live; all = research profiles + code + LinkedIn.
 */
export function ProfileLinks({ set = "research" }: { set?: "research" | "all" }) {
  const keys = set === "research" ? ["scholar", "orcid", "openreview"] : ["github", "linkedin", "scholar", "orcid", "openreview"];
  return (
    <ul className="flex flex-wrap gap-2.5">
      {keys.map((k) => {
        const it = items[k];
        return (
          <li key={it.key}>
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm transition hover:border-ink hover:bg-elev"
            >
              {it.icon}
              {it.label}
              {it.detail && <span className="hidden font-mono text-[11px] text-muted sm:inline">{it.detail}</span>}
              <span className="text-muted" aria-hidden>
                ↗
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
