import type { Metadata } from "next";
import { PageHeader } from "@/components/SectionHeader";
import { BeyondList, EducationBlock, HonorsList, Skills } from "@/components/AboutParts";

export const metadata: Metadata = {
  title: "About",
  description:
    "Honors and awards, skills, education and what I do outside the lab — IIIT Delhi (B.Tech, Electronics & VLSI, 2027).",
  alternates: { canonical: "./" },
};

const h2 = "section-title !text-[clamp(2rem,4vw,3rem)] mb-8";

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="The rest of the story.">
        Awards, the toolkit, the degree behind it, and the things I do when I&rsquo;m not in a lab.
      </PageHeader>

      <div className="mx-auto max-w-[1200px] space-y-24 px-5 pb-28 sm:px-8">
        <section id="honors">
          <h2 className={h2}>Honors &amp; awards</h2>
          <HonorsList />
        </section>

        <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <section id="skills">
            <h2 className={h2}>Skills</h2>
            <Skills />
          </section>
          <div className="space-y-16">
            <section id="education">
              <h2 className={h2}>Education</h2>
              <EducationBlock />
            </section>
            <section id="beyond">
              <h2 className={h2}>Beyond the lab</h2>
              <BeyondList />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
