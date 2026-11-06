import type { Metadata } from "next";
import { PageHeader } from "@/components/SectionHeader";
import { Threads } from "@/components/Threads";
import { Publications } from "@/components/Publications";
import { QuantSection } from "@/components/QuantSection";
import { ProfileLinks } from "@/components/ProfileLinks";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Four 2026 papers on verifiable LLM systems, long-horizon agent memory and extreme model quantization — NeurIPS WS, COLM WS, AAAI-27 and ISLPED.",
  alternates: { canonical: "./" },
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader eyebrow="Research" title="Trust, memory, efficiency." extra={<ProfileLinks set="research" />}>
        Four papers in 2026, every one accepted or published — organised around three questions: can the output be
        trusted, can the agent learn, and can the model be made small enough to ship?
      </PageHeader>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Threads variant="full" />

        <div className="mb-24 mt-20">
          <h2 className="eyebrow mb-4">Publications · 2026</h2>
          <Publications />
        </div>
      </div>

      <QuantSection />
    </>
  );
}
