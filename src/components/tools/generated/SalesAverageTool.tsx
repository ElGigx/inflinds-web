"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function SalesAverageTool() {
  const [sales, setSales] = useState([350000, 280000, 410000, 390000, 620000, 780000, 240000]);

  const total = sales.reduce((sum, value) => sum + value, 0);
  const average = total / days.length;
  const bestValue = Math.max(...sales);
  const worstValue = Math.min(...sales);
  const bestIndex = sales.indexOf(bestValue);
  const worstIndex = sales.indexOf(worstValue);
  const tie = total > 0 && bestValue === worstValue;
  const variation = average > 0 ? ((bestValue - average) / average) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          {days.map((day, index) => (
            <Field
              key={day}
              label={day}
              value={sales[index]}
              onChange={(value) => setSales((prev) => prev.map((item, i) => (i === index ? value : item)))}
              step={10000}
              suffix="COP"
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Total de la semana", value: cop(total) },
            { label: "Promedio diario", value: cop(average), hi: true },
            { label: "Mejor día", value: total > 0 ? (tie ? "Empate" : days[bestIndex]) : "—" },
            { label: "Peor día", value: total > 0 ? (tie ? "Empate" : days[worstIndex]) : "—" },
            {
              label: "El mejor frente al promedio",
              value: total > 0 ? `${num(variation)} %` : "—",
            },
          ]}
          note="El promedio reparte la semana en siete días iguales. No descuenta devoluciones, gastos ni días sin operación: si un día no vendiste, escríbelo en cero."
        />
        <p className="text-sm leading-relaxed text-slate">
          Mira el mejor día junto al promedio antes de decidir: un domingo alto puede ser una casualidad de
          una sola semana, no una regla del negocio.
        </p>
      </div>
    </div>
  );
}
