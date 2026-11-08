"use client";

import { useMemo, useState } from "react";
import { Field, Result, cardClass } from "./ui";

const DAY = 86_400_000;

function toIso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatLong(date: Date) {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function BusinessDaysTool() {
  const today = toIso(new Date());
  const [start, setStart] = useState(today);
  const [days, setDays] = useState(5);
  const [includeSaturday, setIncludeSaturday] = useState(false);

  const result = useMemo(() => {
    const date = new Date(`${start}T12:00:00`);
    if (Number.isNaN(date.getTime())) return { end: null as Date | null, calendarDays: 0 };
    let added = 0;
    const cursor = new Date(date);
    while (added < Math.max(0, Math.round(days))) {
      cursor.setDate(cursor.getDate() + 1);
      const weekday = cursor.getDay();
      if (weekday === 0) continue;
      if (weekday === 6 && !includeSaturday) continue;
      added += 1;
    }
    return { end: cursor, calendarDays: Math.round((cursor.getTime() - date.getTime()) / DAY) };
  }, [start, days, includeSaturday]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <label className="block">
          <span className="flex items-baseline justify-between gap-3 text-sm font-semibold text-ink">
            Fecha de inicio
          </span>
          <input
            type="date"
            value={start}
            onChange={(event) => setStart(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
          />
        </label>
        <Field label="Días hábiles a sumar" value={days} onChange={setDays} max={365} suffix="días" />
        <label className="flex items-center gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3 text-sm font-semibold text-ink">
          <input
            type="checkbox"
            checked={includeSaturday}
            onChange={(event) => setIncludeSaturday(event.target.checked)}
            className="h-4 w-4 accent-magenta"
          />
          Contar sábados como hábiles
        </label>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            {
              label: "Fecha de vencimiento",
              value: result.end ? formatLong(result.end) : "—",
              hi: true,
            },
            {
              label: "Días calendario",
              value: result.end ? `${result.calendarDays} días` : "—",
            },
          ]}
          note="No incluye festivos: si el plazo cae en uno, mueve la fecha a mano. Los festivos cambian cada año y por eso no se adivinan aquí."
        />
      </div>
    </div>
  );
}
