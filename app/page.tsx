import { Hero } from "@/components/Hero";
import { StatsStrip } from "@/components/StatsStrip";
import { SectionHeader } from "@/components/SectionHeader";
import { Threads } from "@/components/Threads";
import { SelectedWork } from "@/components/SelectedWork";
import { ExperienceTeaser } from "@/components/ExperienceList";
import { ContactSection } from "@/components/ContactSection";

// Landing page = the short story. Every section links to a detail page.
export default function Home() {
  return (
    <>
      <Hero />
      <StatsStrip />

      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeader eyebrow="Research" title="What I work on" action={{ href: "/research/", label: "All research" }}>
          Three questions run through everything I do: can the output be trusted, can the agent learn, and can the model
          be small enough to ship?
        </SectionHeader>
        <Threads variant="compact" />
      </section>

      <SelectedWork />
      <ExperienceTeaser />
      <ContactSection />
    </>
  );
}
