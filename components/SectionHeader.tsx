import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Heading for a landing-page section, with an optional "see all" link that leads to the detail page. */
export function SectionHeader({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
      <div className="max-w-[40rem]">
        <div className="eyebrow mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </div>
        <h2 className="section-title">{title}</h2>
        {children && <p className="prose-lede mt-4">{children}</p>}
      </div>
      {action && (
        <Link href={action.href} className="btn btn-ghost shrink-0">
          {action.label} <span aria-hidden>→</span>
        </Link>
      )}
    </Reveal>
  );
}

/** Heading for the top of a detail page. */
export function PageHeader({
  eyebrow,
  title,
  children,
  extra,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  extra?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-[1200px] px-5 pb-14 pt-32 sm:px-8 sm:pt-40">
      <div className="eyebrow mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
      </div>
      <h1 className="section-title !text-[clamp(3rem,7vw,5.6rem)]">{title}</h1>
      {children && <p className="prose-lede mt-6">{children}</p>}
      {extra && <div className="mt-8">{extra}</div>}
    </header>
  );
}
