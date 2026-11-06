"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { asset } from "@/lib/site";

const links = [
  { href: "/research/", label: "Research" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/about/", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav({ resume }: { resume: string }) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "border-b border-rule bg-bg/92 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8" aria-label="Primary">
        <Link href="/" className="group flex items-center gap-3" aria-label="Abhishek Jha — home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-[1.05rem] italic text-bg transition group-hover:bg-accent group-hover:text-accent-ink">
            aj
          </span>
          <span className="hidden font-display text-xl sm:block">Abhishek Jha</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive(l.href) ? "bg-accent-soft text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="hidden h-9 items-center gap-2 rounded-full border border-rule px-3 font-mono text-[11px] text-muted transition hover:border-ink hover:text-ink lg:flex"
            aria-label="Open command palette"
          >
            <span>Search</span>
            <kbd className="rounded border border-rule px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
          <ThemeToggle />
          <a href={asset(resume)} className="btn btn-solid hidden !py-2 text-[13px] sm:inline-flex" download>
            Résumé
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-rule md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-rule bg-bg px-5 pb-6 pt-3 md:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex items-center justify-between border-b border-rule py-3.5 font-display text-2xl">
                  {l.label}
                  <span className="text-muted">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <a href={asset(resume)} download className="btn btn-solid mt-5 w-full justify-center">
            Download résumé
          </a>
        </div>
      )}
    </header>
  );
}
