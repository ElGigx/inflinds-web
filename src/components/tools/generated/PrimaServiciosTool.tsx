"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function PrimaServiciosTool() {
  const [salary, setSalary] = useState(2000000);
  const [days, setDays] = useState(180);
  const [transport, setTransport] = useState(200000);

  const base = Math.max(0, salary) + Math.max(0, transport);
  const prima = (base * Math.max(0, days)) / 360;
  const monthly = (base * 30) / 360;

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
            label="Días trabajados en el semestre"
            value={days}
            onChange={setDays}
            max={360}
            suffix="días"
            hint="180 días es el semestre completo."
          />
          <Field
            label="Auxilio de transporte"
            value={transport}
            onChange={setTransport}
            step={10000}
            suffix="COP"
            hint="Se incluye en la base de la prima. Referencia editable: confirma el auxilio vigente con tu contador."
          />
        </div>
      </div>

      <div>
        <Result
          items={[
            { label: "Base (salario + auxilio)", value: cop(base) },
            { label: "Prima del semestre", value: cop(prima), hi: true },
            { label: "Provisión mensual equivalente", value: cop(monthly) },
          ]}
          note="Es una estimación y no reemplaza al contador ni a la nómina. La prima se calcula sobre el salario más el auxilio de transporte, por los días trabajados sobre 360. La provisión mensual repite la cuenta con 30 días."
        />
      </div>
    </div>
  );
}
