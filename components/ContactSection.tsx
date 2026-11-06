import { person } from "@/lib/content";
import { asset } from "@/lib/site";
import { ProfileLinks } from "./ProfileLinks";
import { Reveal } from "./Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_20%_100%,#000_0%,transparent_75%)]" aria-hidden />
      <div className="relative mx-auto max-w-[1200px] px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span>contact</span>
          </div>
          <h2 className="display max-w-[16ch] text-[clamp(3rem,8vw,6.8rem)]">
            Let&rsquo;s build something that can be <em className="text-accent">checked.</em>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="prose-lede mt-8">
            I&rsquo;m always glad to talk about verifiable LLM systems, agent memory, quantization, or the hardware that
            runs them — research collaborations, internships and interesting problems.
          </p>
          <a
            href={`mailto:${person.email}`}
            className="link-u mt-10 inline-block font-display text-[clamp(1.6rem,4.4vw,3.2rem)] leading-tight break-all sm:break-normal"
          >
            {person.email}
          </a>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={`mailto:${person.email}`} className="btn btn-solid">
              Say hello <span aria-hidden>→</span>
            </a>
            <a href={asset(person.resume)} download className="btn btn-ghost">
              Résumé ↓
            </a>
          </div>
          <div className="mt-10">
            <p className="eyebrow mb-3">Elsewhere</p>
            <ProfileLinks set="all" />
          </div>
          <p className="mt-8 font-mono text-[12px] text-muted">{person.location} · IST (UTC+5:30)</p>
        </Reveal>
      </div>
    </section>
  );
}
