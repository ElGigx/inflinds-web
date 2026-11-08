"use client";

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
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
        {label}
        {suffix && <span className="text-xs font-normal text-slate">{suffix}</span>}
      </span>
      <input
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
      />
      {hint && <span className="mt-1 block text-xs text-slate">{hint}</span>}
    </label>
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
    <div className="rounded-2xl bg-night p-5 text-white sm:p-6">
      <dl className="space-y-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-slate-300/80">{item.label}</dt>
            <dd
              className={
                item.hi
                  ? "font-display text-2xl font-black text-yellow sm:text-3xl"
                  : "font-display text-lg font-bold text-white"
              }
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-relaxed text-slate-400">{note}</p>}
    </div>
  );
}

export const cardClass = "rounded-2xl border border-line bg-white p-5 sm:p-6";
