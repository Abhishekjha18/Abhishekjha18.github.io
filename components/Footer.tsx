import Link from "next/link";
import { person } from "@/lib/content";
import { asset } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <div className="font-display text-2xl">{person.name}</div>
          <div className="mt-1 text-sm text-muted">{person.role} · {person.location}</div>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <li><Link className="link-u hover:text-ink" href="/research/">Research</Link></li>
          <li><Link className="link-u hover:text-ink" href="/experience/">Experience</Link></li>
          <li><Link className="link-u hover:text-ink" href="/projects/">Projects</Link></li>
          <li><Link className="link-u hover:text-ink" href="/about/">About</Link></li>
          <li><a className="link-u hover:text-ink" href={`mailto:${person.email}`}>Email</a></li>
          <li><a className="link-u hover:text-ink" href={person.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="link-u hover:text-ink" href={person.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a className="link-u hover:text-ink" href={person.scholar} target="_blank" rel="noopener noreferrer">Scholar</a></li>
          <li><a className="link-u hover:text-ink" href={person.orcid} target="_blank" rel="noopener noreferrer">ORCID</a></li>
          <li><a className="link-u hover:text-ink" href={asset(person.resume)} download>Résumé (PDF)</a></li>
        </ul>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-5 py-4 font-mono text-[11px] text-faint sm:px-8">
          <span>© 2026 Abhishek Jha</span>
          <span>Set in Instrument Serif, Geist &amp; Geist Mono · press ⌘K to jump anywhere</span>
        </div>
      </div>
    </footer>
  );
}
