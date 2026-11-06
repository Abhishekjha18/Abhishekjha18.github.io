"use client";

import { useEffect, useState } from "react";

type Scenario = {
  system: string;
  claim: string;
  check: string;
  ok: boolean;
  verdict: string;
};

// Illustrative, but each one is modelled on a real system in the Verified Confinement case study.
const scenarios: Scenario[] = [
  {
    system: "Policy reader",
    claim: "“Room rent is capped at 1% of the sum insured.” (cites clause 4.2)",
    check: "Is the quoted text present, verbatim, in the policy PDF?",
    ok: true,
    verdict: "Quote found in source — released to the deterministic engine.",
  },
  {
    system: "Policy reader",
    claim: "“A 20% co-pay applies to this claim.”",
    check: "Is the quoted text present, verbatim, in the policy PDF?",
    ok: false,
    verdict: "No matching text in the source — flagged, never silently trusted.",
  },
  {
    system: "Dafny repair loop",
    claim: "“Proof repaired — the method now verifies.” (empty reply)",
    check: "Run the verifier on a non-empty, mutated artifact.",
    ok: false,
    verdict: "An empty reply trivially “verifies” — the harness rejects it.",
  },
  {
    system: "Spreadsheet auditor",
    claim: "“The total in column F should be 1,240.”",
    check: "Recompute the column deterministically.",
    ok: true,
    verdict: "Recomputed sum matches — finding accepted.",
  },
  {
    system: "Affordability agent",
    claim: "“Safe to pay in full today.”",
    check: "Re-run the 90-day cash-flow safety rule.",
    ok: false,
    verdict: "Balance dips below the safety floor inside 90 days — decision overridden.",
  },
];

const PHASE_MS = [1500, 1800, 3000];

export function VerifierDemo() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(true);

  // Respect reduced motion: no autoplay, show the finished verdict.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      setPhase(2);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (phase < 2) setPhase(phase + 1);
      else {
        setI((i + 1) % scenarios.length);
        setPhase(0);
      }
    }, PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase, i, playing]);

  const s = scenarios[i];
  const resolved = scenarios.slice(0, i + (phase === 2 ? 1 : 0));
  const released = resolved.filter((x) => x.ok).length;
  const blocked = resolved.length - released;

  function pick(n: number) {
    setI(n);
    setPhase(playing ? 0 : 2);
  }

  return (
    <div
      className="relative rounded-2xl border border-rule bg-elev p-5 sm:p-6"
      style={{ boxShadow: "0 1px 0 var(--rule), 0 40px 80px -48px color-mix(in srgb, var(--ink) 45%, transparent)" }}
      role="group"
      aria-label="Animated demonstration of a deterministic verifier checking model output"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="eyebrow ml-2">verified-confinement.demo</span>
        </div>
        <span className="eyebrow text-faint">illustrative</span>
      </div>

      <div className="mt-6" aria-live="polite">
        <Step n={1} label="Model" tag="untrusted" on tint="faint" last={false}>
          <div className="eyebrow mb-1.5 text-faint">{s.system}</div>
          <div key={`c-${i}`} className="min-h-[4.1rem] rounded-lg border border-dashed border-rule bg-bg px-3.5 py-3 font-display text-[1.1rem] italic leading-snug">
            {s.claim}
          </div>
        </Step>

        <Step n={2} label="Verifier" tag="deterministic" on={phase >= 1} tint="accent" last={false}>
          <div className="min-h-[2.6rem] text-sm text-muted">{s.check}</div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-rule">
            {phase >= 1 && (
              <div
                key={`b-${i}`}
                className={`h-full w-full rounded-full bg-accent ${phase === 1 ? "vd-scan" : ""}`}
              />
            )}
          </div>
        </Step>

        <Step n={3} label="Output" tag={phase === 2 ? (s.ok ? "verified" : "rejected") : "pending"} on={phase >= 2} tint={s.ok ? "ok" : "bad"} last>
          <div className="min-h-[4rem]">
            {phase >= 2 && (
              <div key={`v-${i}`} className="flex items-start gap-3">
                <span
                  className={`vd-stamp grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg font-semibold ${
                    s.ok ? "bg-ok-soft text-ok" : "bg-bad-soft text-bad"
                  }`}
                  aria-hidden
                >
                  {s.ok ? "✓" : "✕"}
                </span>
                <p className={`text-sm leading-snug ${s.ok ? "text-ok" : "text-bad"}`}>
                  <span className="font-medium">{s.ok ? "Verified." : "Blocked."}</span> {s.verdict}
                </p>
              </div>
            )}
          </div>
        </Step>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-4">
        <div className="flex items-center gap-4 font-mono text-xs text-muted">
          <span>
            <span className="text-ok">●</span> released {released}
          </span>
          <span>
            <span className="text-bad">●</span> blocked {blocked}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {scenarios.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => pick(n)}
              aria-label={`Show example ${n + 1} of ${scenarios.length}`}
              aria-current={n === i}
              className={`h-1.5 rounded-full transition-all ${n === i ? "w-6 bg-ink" : "w-1.5 bg-rule hover:bg-faint"}`}
            />
          ))}
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause demo" : "Play demo"}
            className="ml-2 grid h-7 w-7 place-items-center rounded-full border border-rule text-[10px] text-ink transition hover:border-ink"
          >
            {playing ? "❚❚" : "▶"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Step({
  n,
  label,
  tag,
  on,
  tint,
  last,
  children,
}: {
  n: number;
  label: string;
  tag: string;
  on: boolean;
  tint: "faint" | "accent" | "ok" | "bad";
  last: boolean;
  children: React.ReactNode;
}) {
  const tagCls = {
    faint: "text-faint",
    accent: "text-accent",
    ok: "text-ok",
    bad: "text-bad",
  }[tint];
  return (
    <div className="vd-row relative flex gap-4" data-on={on}>
      <div className="flex flex-col items-center">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-rule bg-bg font-mono text-[10px] text-muted">
          {n}
        </span>
        {!last && <span className="my-1 w-px flex-1 bg-rule" />}
      </div>
      <div className={`min-w-0 flex-1 ${last ? "" : "pb-4"}`}>
        <div className="mb-1.5 flex items-baseline gap-2">
          <span className="eyebrow text-ink">{label}</span>
          <span className={`eyebrow ${tagCls}`}>· {tag}</span>
        </div>
        {children}
      </div>
    </div>
  );
}
