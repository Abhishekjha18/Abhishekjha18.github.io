"use client";

import { useMemo, useState } from "react";

const W = 720;
const H = 290;
const PAD = 22;
const N = 360;

// A smooth stand-in for a weight/activation distribution, kept inside [-1, 1].
function signal(t: number) {
  return (
    0.58 * Math.sin(2 * Math.PI * 1.15 * t) +
    0.27 * Math.sin(2 * Math.PI * 3.1 * t + 0.8) +
    0.11 * Math.sin(2 * Math.PI * 7.4 * t + 2.1)
  );
}

const presets = [
  { bits: 8, label: "INT8" },
  { bits: 5, label: "5-bit · YOLOv5s" },
  { bits: 4, label: "4-bit" },
  { bits: 2, label: "2-bit" },
];

export function QuantPlayground() {
  const [bits, setBits] = useState(5);

  const model = useMemo(() => {
    const L = 2 ** bits;
    const xs: number[] = [];
    const f: number[] = [];
    const q: number[] = [];
    let sig = 0;
    let err = 0;
    for (let k = 0; k < N; k++) {
      const t = k / (N - 1);
      const v = signal(t);
      // mid-rise uniform quantizer over [-1, 1]
      const idx = Math.min(L - 1, Math.max(0, Math.floor(((v + 1) / 2) * L)));
      const qv = -1 + (idx + 0.5) * (2 / L);
      xs.push(PAD + t * (W - 2 * PAD));
      f.push(v);
      q.push(qv);
      sig += v * v;
      err += (v - qv) ** 2;
    }
    const sqnr = 10 * Math.log10(sig / Math.max(err, 1e-12));
    const y = (v: number) => H / 2 - v * (H / 2 - PAD);

    const orig = xs.map((x, k) => `${k ? "L" : "M"}${x.toFixed(1)} ${y(f[k]).toFixed(1)}`).join("");
    const quant = xs.map((x, k) => `${k ? "L" : "M"}${x.toFixed(1)} ${y(q[k]).toFixed(1)}`).join("");
    const errPath = xs
      .filter((_, k) => k % 2 === 0)
      .map((x, j) => {
        const k = j * 2;
        return `M${x.toFixed(1)} ${y(f[k]).toFixed(1)}V${y(q[k]).toFixed(1)}`;
      })
      .join("");
    let grid = "";
    if (L <= 32) {
      for (let k = 0; k < L; k++) {
        const gy = y(-1 + (k + 0.5) * (2 / L)).toFixed(1);
        grid += `M${PAD} ${gy}H${W - PAD}`;
      }
    }
    return { L, sqnr, orig, quant, errPath, grid, ratio: 32 / bits };
  }, [bits]);

  const gb = (bits / 8).toFixed(bits % 8 === 0 ? 0 : 2).replace(/\.?0+$/, "");

  return (
    <div
      className="rounded-2xl border border-rule bg-elev p-4 sm:p-7"
      style={{ boxShadow: "0 1px 0 var(--rule), 0 40px 80px -56px color-mix(in srgb, var(--ink) 40%, transparent)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label={`A smooth curve and its ${bits}-bit quantized approximation using ${model.L} levels`}
      >
        <path d={model.grid} stroke="var(--rule)" strokeWidth="1" strokeDasharray="2 5" fill="none" />
        <line x1={PAD} x2={W - PAD} y1={H / 2} y2={H / 2} stroke="var(--rule)" strokeWidth="1" />
        <path d={model.errPath} stroke="var(--bad)" strokeOpacity="0.45" strokeWidth="1.2" fill="none" />
        <path d={model.orig} stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
        <path d={model.quant} stroke="var(--accent)" strokeWidth="2.4" fill="none" strokeLinejoin="miter" />
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-2">
          <i className="inline-block h-0.5 w-5 bg-ink" /> original signal (FP32)
        </span>
        <span className="flex items-center gap-2">
          <i className="inline-block h-0.5 w-5 bg-accent" /> {bits}-bit approximation
        </span>
        <span className="flex items-center gap-2">
          <i className="inline-block h-3 w-px bg-bad" /> rounding error
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-1 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted">
          <label htmlFor="bits">Bit-width</label>
          <span className="text-ink">{bits} bits per value</span>
        </div>
        <input
          id="bits"
          className="qslider"
          type="range"
          min={1}
          max={16}
          step={1}
          value={bits}
          onChange={(e) => setBits(Number(e.target.value))}
          aria-valuetext={`${bits} bits, ${model.ratio.toFixed(1)} times smaller than FP32`}
        />
        <div className="flex justify-between font-mono text-[10px] text-faint">
          <span>1</span>
          <span>4</span>
          <span>8</span>
          <span>12</span>
          <span>16</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setBits(p.bits)}
            aria-pressed={bits === p.bits}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] transition ${
              bits === p.bits ? "border-accent bg-accent text-accent-ink" : "border-rule text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-4">
        <Readout label="Levels" value={model.L.toLocaleString()} />
        <Readout label="Compression" value={`${model.ratio.toFixed(model.ratio >= 10 ? 0 : 1)}×`} sub="vs. FP32" accent />
        <Readout label="1B params" value={`${gb} GB`} sub="from 4 GB at FP32" />
        <Readout label="SNR" value={`${model.sqnr.toFixed(1)} dB`} sub="higher is cleaner" />
      </dl>
    </div>
  );
}

function Readout({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-elev px-4 py-3.5">
      <dt className="eyebrow">{label}</dt>
      <dd className={`mt-1 whitespace-nowrap font-display text-2xl tabular-nums ${accent ? "text-accent" : ""}`}>{value}</dd>
      <dd className="mt-0.5 text-[11px] leading-tight text-faint">{sub ?? "\u00a0"}</dd>
    </div>
  );
}
