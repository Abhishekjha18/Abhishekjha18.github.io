"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export type PaletteItem = {
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  href: string;
  external?: boolean;
};

export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setCursor(0);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((i) => `${i.label} ${i.hint ?? ""} ${i.group} ${i.keywords ?? ""}`.toLowerCase().includes(needle));
  }, [items, q]);

  useEffect(() => setCursor(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  function go(item: PaletteItem | undefined) {
    if (!item) return;
    setOpen(false);
    if (item.external) window.open(item.href, "_blank", "noopener");
    else router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[cursor]);
    }
  }

  if (!open) return null;

  let lastGroup = "";
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/40 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-rule bg-elev shadow-2xl">
        <div className="flex items-center gap-3 border-b border-rule px-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-muted" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Jump to a paper, project or section…"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-faint"
            aria-label="Search"
          />
          <kbd className="rounded border border-rule px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
        </div>
        <ul ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-muted">Nothing matches “{q}”.</li>}
          {results.map((item, idx) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <li key={`${item.group}-${item.href}-${item.label}`}>
                {showGroup && <div className="eyebrow px-3 pb-1 pt-3 text-faint">{item.group}</div>}
                <button
                  type="button"
                  data-i={idx}
                  onMouseEnter={() => setCursor(idx)}
                  onClick={() => go(item)}
                  className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm ${
                    idx === cursor ? "bg-accent-soft text-accent" : ""
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <span className="shrink-0 font-mono text-[11px] text-muted">{item.hint}{item.external ? " ↗" : ""}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
