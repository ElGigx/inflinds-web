"use client";

import { useId } from "react";

/**
 * Campo compacto: la ayuda ya no ocupa una línea debajo; vive en un icono de
 * información con tooltip, para que el bloque pese lo mismo con o sin ayuda.
 */
export function Field({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-xs font-semibold leading-tight text-ink">
          {label}
        </label>
        {hint && <Info text={hint} />}
      </div>
      <div className="relative mt-1">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : 0}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-lg border border-line bg-white px-2.5 py-2 pr-14 text-sm tabular-nums text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-[11px] font-medium text-slate">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function Info({ text }: { text: string }) {
  return (
    <details className="group relative shrink-0">
      <summary
        className="grid h-4 w-4 cursor-help list-none place-items-center rounded-full border border-line text-[10px] font-bold text-slate transition hover:border-magenta hover:text-magenta"
        aria-label={`Información: ${text}`}
      >
        i
      </summary>
      <span
        role="tooltip"
        className="absolute right-0 top-6 z-20 w-56 rounded-lg border border-line bg-white p-2.5 text-[11px] font-normal leading-relaxed text-ink shadow-lg"
      >
        {text}
      </span>
    </details>
  );
}

export function Result({
  items,
  note,
}: {
  items: { label: string; value: string; hi?: boolean }[];
  note?: string;
}) {
  return (
    <div className="rounded-xl bg-night p-4 text-white">
      <dl className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-baseline justify-between gap-3">
            <dt className="text-xs text-slate-300/80">{item.label}</dt>
            <dd
              className={
                item.hi
                  ? "font-display text-xl font-black tabular-nums text-yellow sm:text-2xl"
                  : "font-display text-sm font-bold tabular-nums text-white"
              }
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      {note && (
        <details className="group mt-3 border-t border-white/10 pt-2">
          <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[11px] font-semibold text-slate-300/70 hover:text-yellow">
            <span className="grid h-4 w-4 place-items-center rounded-full border border-white/25 text-[10px]">
              i
            </span>
            Cómo se calcula
          </summary>
          <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">{note}</p>
        </details>
      )}
    </div>
  );
}

export const cardClass = "rounded-xl border border-line bg-white p-4";
