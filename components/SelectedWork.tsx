import { projects } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const picks = ["agent-memory-bus", "claimcast", "buy-or-wait"];

export function SelectedWork() {
  const items = picks.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
  return (
    <section className="border-y border-rule bg-elev">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work"
          action={{ href: "/projects/", label: `All ${projects.length} projects` }}
        >
          Three things I&rsquo;m proud of. Everything else lives in the archive.
        </SectionHeader>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProjectCard p={p} brief />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
