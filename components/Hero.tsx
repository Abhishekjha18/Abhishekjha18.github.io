import Link from "next/link";
import { person } from "@/lib/content";
import { asset } from "@/lib/site";
import { Reveal } from "./Reveal";
import { VerifierDemo } from "./VerifierDemo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="blueprint pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1200px] gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-28">
        <div>
          <Reveal>
            <p className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-accent">●</span> {person.name}
              <span className="text-faint">/</span> AI/ML research
              <span className="text-faint">/</span> IIIT Delhi ’27
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display text-[clamp(3.4rem,7.6vw,6.6rem)]">
              Verify.
              <br />
              Remember.
              <br />
              <em className="text-accent">Compress.</em>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="prose-lede mt-7">{person.lede}</p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/#research" className="btn btn-solid">
                Read the research <span aria-hidden>→</span>
              </Link>
              <Link href="/projects/" className="btn btn-ghost">
                Browse projects
              </Link>
              <a href={asset(person.resume)} download className="btn btn-ghost">
                Résumé ↓
              </a>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-rule bg-elev py-1.5 pl-2.5 pr-4 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
              </span>
              {person.status}
            </div>
          </Reveal>

        </div>

        <Reveal delay={220} className="lg:pl-4">
          <VerifierDemo />
          <p className="mt-4 max-w-[46ch] font-mono text-[11px] leading-relaxed text-faint">
            The pattern behind my NeurIPS 2026 workshop paper: let the model propose, let something deterministic decide.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
