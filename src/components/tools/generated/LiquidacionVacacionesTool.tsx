"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function LiquidacionVacacionesTool() {
  const [salary, setSalary] = useState(2000000);
  const [days, setDays] = useState(15);

  const dayValue = Math.max(0, salary) / 30;
  const period = Math.max(0, days);
  const total = dayValue * period;
  const calendar = (period * 7) / 5;
  const difference = dayValue * (calendar - period);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-3`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Salario mensual"
            value={salary}
            onChange={setSalary}
            step={50000}
            suffix="COP"
          />
          <Field
            label="Días de vacaciones"
            value={days}
            onChange={setDays}
            max={30}
            suffix="días"
            hint="Días hábiles de descanso; 15 es la quincena típica."
          />
        </div>
      </div>

      <div>
        <Result
          items={[
            { label: "Valor por día", value: cop(dayValue) },
            { label: "Total a pagar", value: cop(total), hi: true },
            { label: "Días calendario que cubre", value: num(calendar) },
            { label: "Descuento hábiles vs calendario", value: cop(difference) },
          ]}
          note="Es una estimación y no reemplaza al contador ni a la nómina. La cuenta usa una base de 30 días por mes y toma los días como hábiles: 15 hábiles cubren unos 21 de calendario. Ese tramo extra de calendario no se paga como vacaciones, y por eso el descuento no es cero."
        />
      </div>
    </div>
  );
}
