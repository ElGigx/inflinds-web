"use client";

import { useMemo, useState } from "react";
import { num } from "@/lib/format";
import { Result, cardClass } from "../ui";

const DAY = 86_400_000;

function toIso(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function parseIso(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function DiasEntreFechasTool() {
  const [start, setStart] = useState(() => toIso(new Date()));
  const [end, setEnd] = useState(() => toIso(new Date()));

  const result = useMemo(() => {
    const from = parseIso(start);
    const to = parseIso(end);
    if (!from || !to) return { valid: false, days: 0, weeks: 0, business: 0 };

    const days = Math.round((to.getTime() - from.getTime()) / DAY);
    let business = 0;
    const cursor = new Date(from);
    for (let index = 0; index < days; index += 1) {
      const weekday = cursor.getDay();
      if (weekday !== 0 && weekday !== 6) business += 1;
      cursor.setDate(cursor.getDate() + 1);
    }

    return { valid: true, days, weeks: days / 7, business };
  }, [start, end]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-semibold text-ink">Fecha inicial</span>
            <button
              type="button"
              onClick={() => setStart(toIso(new Date()))}
              className="text-xs font-semibold text-magenta underline-offset-2 hover:underline"
            >
              Hoy
            </button>
          </div>
          <input
            type="date"
            value={start}
            onChange={(event) => setStart(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
          />
        </div>
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-semibold text-ink">Fecha final</span>
            <button
              type="button"
              onClick={() => setEnd(toIso(new Date()))}
              className="text-xs font-semibold text-magenta underline-offset-2 hover:underline"
            >
              Hoy
            </button>
          </div>
          <input
            type="date"
            value={end}
            onChange={(event) => setEnd(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
          />
        </div>
        <p className="text-xs leading-relaxed text-slate">
          Los días hábiles se cuentan desde la fecha inicial, sin incluir el día final.
        </p>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Días calendario", value: result.valid ? num(result.days) : "—", hi: true },
            { label: "Semanas", value: result.valid ? num(result.weeks) : "—" },
            { label: "Días hábiles aprox.", value: result.valid ? num(result.business) : "—" },
          ]}
          note="Los días hábiles son lunes a viernes y no descuentan festivos colombianos: si el rango cruza un puente o una semana santa, el número real baja."
        />
        <p className="text-sm leading-relaxed text-slate">
          Esto mide lo que ya pasó entre dos fechas. Para saber cuándo vence un plazo hay que sumar los
          días hábiles hacia adelante, no restarlos.
        </p>
      </div>
    </div>
  );
}
