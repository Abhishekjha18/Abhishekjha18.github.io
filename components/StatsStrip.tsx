import { stats } from "@/lib/content";
import { CountUp } from "./CountUp";
import { Reveal } from "./Reveal";

export function StatsStrip() {
  return (
    <section aria-label="Highlights" className="border-y border-rule bg-elev">
      <Reveal>
        <dl className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`border-rule px-5 py-8 sm:px-8 ${i % 2 === 0 ? "border-r" : ""} ${
                i < 2 ? "border-b lg:border-b-0" : ""
              } lg:border-r lg:last:border-r-0`}
            >
              <dd className="display text-[clamp(2.6rem,4.2vw,3.6rem)] leading-none text-ink">
                <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </dd>
              <dt className="mt-3 text-sm font-medium leading-snug">{s.label}</dt>
              <dd className="mt-1 text-xs leading-snug text-muted">{s.sub}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
