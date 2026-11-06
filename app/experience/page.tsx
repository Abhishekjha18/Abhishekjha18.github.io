import type { Metadata } from "next";
import { PageHeader } from "@/components/SectionHeader";
import { ExperienceList } from "@/components/ExperienceList";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Applied Science Intern at Amazon (Pre-Placement Offer), Deep Learning Quantization Research Intern at STMicroelectronics, and earlier research and product internships at IIIT Delhi.",
  alternates: { canonical: "./" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="Where I've worked.">
        From a product-prototyping centre to an industry research lab to Amazon&rsquo;s applied-science team — each step
        moving closer to the line where research meets production.
      </PageHeader>
      <div className="mx-auto max-w-[1200px] px-5 pb-28 sm:px-8">
        <ExperienceList />
      </div>
    </>
  );
}
