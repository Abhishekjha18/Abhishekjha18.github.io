import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every project: LLM verification systems, agent memory, RL environments, competition models, full-stack apps and VLSI designs.",
  alternates: { canonical: "./" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 pb-28 pt-32 sm:px-8 sm:pt-40">
      <div className="eyebrow mb-5 flex items-center gap-3">
        <span className="text-accent">Archive</span>
        <span className="h-px w-10 bg-rule" />
        <span>{projects.length} projects</span>
      </div>
      <h1 className="section-title max-w-[14ch]">Everything I&rsquo;ve built.</h1>
      <p className="prose-lede mt-6">
        From a RISC-V assembler in 2023 to a zero-dependency Rust photo tool in 2026. Filter by kind, or open any
        project for the full write-up.
      </p>
      <div className="mt-14">
        <ProjectsExplorer />
      </div>
    </div>
  );
}
