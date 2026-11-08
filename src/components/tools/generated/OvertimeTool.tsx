"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function OvertimeTool() {
  const [salary, setSalary] = useState(2000000);
  const [hours, setHours] = useState(168);
  const [dayHours, setDayHours] = useState(8);
  const [nightHours, setNightHours] = useState(4);
  const [holidayHours, setHolidayHours] = useState(0);
  const [dayRate, setDayRate] = useState(25);
  const [nightRate, setNightRate] = useState(75);
  const [holidayRate, setHolidayRate] = useState(100);

  const hourValue = Math.max(0, salary) / Math.max(1, hours);
  const dayValue = hourValue * (1 + dayRate / 100);
  const nightValue = hourValue * (1 + nightRate / 100);
  const holidayValue = hourValue * (1 + holidayRate / 100);

  const extras =
    Math.max(0, dayHours) * dayValue +
    Math.max(0, nightHours) * nightValue +
    Math.max(0, holidayHours) * holidayValue;
  const total = Math.max(0, salary) + extras;

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
            label="Horas del período"
            value={hours}
            onChange={setHours}
            max={744}
            suffix="horas"
            hint="Horas ordinarias del período; 168 es una referencia de mes completo."
          />
          <Field
            label="Horas extra diurnas"
            value={dayHours}
            onChange={setDayHours}
            max={744}
            suffix="horas"
            hint="Se suman aparte de las horas del período."
          />
          <Field
            label="Horas extra nocturnas"
            value={nightHours}
            onChange={setNightHours}
            max={744}
            suffix="horas"
          />
          <Field
            label="Horas dominicales/festivas"
            value={holidayHours}
            onChange={setHolidayHours}
            max={744}
            suffix="horas"
          />
          <Field
            label="Recargo diurno"
            value={dayRate}
            onChange={setDayRate}
            max={200}
            step={0.01}
            suffix="%"
            hint="Referencia: 25 %. Verifica con tu contador."
          />
          <Field
            label="Recargo nocturno"
            value={nightRate}
            onChange={setNightRate}
            max={200}
            step={0.01}
            suffix="%"
            hint="Referencia: 75 %. Verifica con tu contador."
          />
          <Field
            label="Recargo dominical/festivo"
            value={holidayRate}
            onChange={setHolidayRate}
            max={200}
            step={0.01}
            suffix="%"
            hint="Referencia: 100 %. Verifica con tu contador."
          />
        </div>
      </div>

      <div>
        <Result
          items={[
            { label: "Valor hora ordinaria", value: cop(hourValue) },
            { label: "Hora extra diurna", value: cop(dayValue) },
            { label: "Hora extra nocturna", value: cop(nightValue) },
            { label: "Hora dominical/festiva", value: cop(holidayValue) },
            { label: "Total con recargos", value: cop(total), hi: true },
          ]}
          note="Es una estimación y no reemplaza al contador ni a la nómina. El valor de la hora sale del salario sobre las horas del período; cada recargo se aplica sobre esa hora base y las horas extra se suman aparte del salario. Los porcentajes son referencias editables."
        />
      </div>
    </div>
  );
}
