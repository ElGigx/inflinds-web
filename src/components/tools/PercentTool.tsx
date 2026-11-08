"use client";

import { useState } from "react";
import { num } from "@/lib/format";
import { Field, cardClass } from "./ui";

export default function PercentTool() {
  const [value, setValue] = useState(850000);
  const [percent, setPercent] = useState(15);

  const [part, setPart] = useState(120);
  const [whole, setWhole] = useState(480);

  const [from, setFrom] = useState(900000);
  const [to, setTo] = useState(1150000);

  const ofValue = (value * percent) / 100;
  const partOf = whole !== 0 ? (part / whole) * 100 : 0;
  const variation = from !== 0 ? ((to - from) / from) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className={`${cardClass} space-y-4`}>
        <p className="font-display text-lg font-bold text-ink">El X % de un valor</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Valor" value={value} onChange={setValue} step={1000} />
          <Field label="Porcentaje" value={percent} onChange={setPercent} suffix="%" />
        </div>
        <div className="rounded-xl bg-night px-4 py-3 text-white">
          <span className="text-xs text-slate-300/80">Resultado</span>
          <p className="font-display text-2xl font-black text-yellow">{num(ofValue)}</p>
        </div>
      </div>

      <div className={`${cardClass} space-y-4`}>
        <p className="font-display text-lg font-bold text-ink">Qué porcentaje es A de B</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="A (la parte)" value={part} onChange={setPart} />
          <Field label="B (el total)" value={whole} onChange={setWhole} />
        </div>
        <div className="rounded-xl bg-night px-4 py-3 text-white">
          <span className="text-xs text-slate-300/80">Resultado</span>
          <p className="font-display text-2xl font-black text-yellow">{num(partOf)} %</p>
        </div>
      </div>

      <div className={`${cardClass} space-y-4 md:col-span-2`}>
        <p className="font-display text-lg font-bold text-ink">Cuánto cambió entre dos cifras</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Antes" value={from} onChange={setFrom} step={1000} />
          <Field label="Después" value={to} onChange={setTo} step={1000} />
        </div>
        <div className="flex flex-wrap items-baseline gap-3 rounded-xl bg-night px-4 py-3 text-white">
          <span className="text-xs text-slate-300/80">Variación</span>
          <p className={`font-display text-2xl font-black ${variation >= 0 ? "text-yellow" : "text-magenta"}`}>
            {variation >= 0 ? "+" : ""}
            {num(variation)} %
          </p>
          <span className="text-sm text-slate-300/80">
            {variation >= 0 ? "subió" : "bajó"} frente a la cifra anterior
          </span>
        </div>
      </div>
    </div>
  );
}
