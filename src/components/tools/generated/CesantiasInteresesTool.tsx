"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function CesantiasInteresesTool() {
  const [salary, setSalary] = useState(2000000);
  const [days, setDays] = useState(360);
  const [transport, setTransport] = useState(200000);
  const [rate, setRate] = useState(12);

  const period = Math.max(0, days);
  const base = Math.max(0, salary) + Math.max(0, transport);
  const cesantias = (base * period) / 360;
  const interests = cesantias * (rate / 100) * (period / 360);
  const total = cesantias + interests;

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
            label="Días trabajados"
            value={days}
            onChange={setDays}
            max={360}
            suffix="días"
            hint="360 días es el año completo."
          />
          <Field
            label="Auxilio de transporte"
            value={transport}
            onChange={setTransport}
            step={10000}
            suffix="COP"
            hint="Se incluye en la base de cesantías. Referencia editable: confirma el auxilio vigente con tu contador."
          />
          <Field
            label="Intereses sobre cesantías"
            value={rate}
            onChange={setRate}
            max={30}
            step={0.01}
            suffix="% anual"
            hint="Referencia: 12 % anual. Verifica con tu contador."
          />
        </div>
      </div>

      <div>
        <Result
          items={[
            { label: "Cesantías", value: cop(cesantias) },
            { label: "Intereses", value: cop(interests) },
            { label: "Total a consignar/pagar", value: cop(total), hi: true },
          ]}
          note="Es una estimación y no reemplaza al contador ni a la nómina. Las cesantías son el salario más el auxilio por los días trabajados sobre 360; los intereses se aplican sobre las cesantías a la tasa anual editable y se prorratean por los días."
        />
      </div>
    </div>
  );
}
