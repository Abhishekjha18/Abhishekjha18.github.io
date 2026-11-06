import Link from "next/link";
import { QuantPlayground } from "./QuantPlayground";
import { Reveal } from "./Reveal";

export function QuantSection() {
  return (
    <section id="quantization" className="border-y border-rule bg-elev">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-24 sm:px-8 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="eyebrow mb-5 flex items-center gap-3">
            <span className="text-accent">Interactive</span>
            <span className="h-px w-10 bg-rule" />
            <span>try it</span>
          </div>
          <h2 className="section-title">What does 5&nbsp;bits cost?</h2>
          <p className="prose-lede mt-6">
            Quantization trades precision for size. Drag the slider and watch a signal get squeezed from 16 bits down to
            1 — and what the rounding takes in return.
          </p>
          <p className="mt-4 max-w-[62ch] text-[0.95rem] text-muted">
            This is plain uniform scalar quantization, the simplest case. At STMicroelectronics I worked on{" "}
            <b className="font-medium text-ink">vector quantization with sparse error compensation</b>, which took
            YOLOv5s to 5 bits at <b className="font-medium text-ink">6.4× compression</b> for a 3.3% relative accuracy
            drop; QUARTZ then removes the dequantization step from LLM attention altogether.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px]">
            <Link href="/research/quartz/" className="link-u">↳ QUARTZ, COLM 2026 WS</Link>
            <Link href="/research/cim-flex/" className="link-u">↳ CIM-FLEX, ISLPED 2026</Link>
            <Link href="/experience/" className="link-u">↳ The ST internship</Link>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <QuantPlayground />
        </Reveal>
      </div>
    </section>
  );
}
