"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function ProvisionPrestacionesTool() {
  const [salary, setSalary] = useState(2000000);
  const [days, setDays] = useState(30);
  const [primaRate, setPrimaRate] = useState(8.33);
  const [cesantiasRate, setCesantiasRate] = useState(8.33);
  const [interestRate, setInterestRate] = useState(1);
  const [vacationRate, setVacationRate] = useState(4.17);

  const period = Math.max(0, days);
  const base = (Math.max(0, salary) * period) / 30;
  const prima = (base * primaRate) / 100;
  const cesantias = (base * cesantiasRate) / 100;
  const interests = (cesantias * interestRate) / 100;
  const vacations = (base * vacationRate) / 100;
  const total = prima + cesantias + interests + vacations;

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
            label="Días del período"
            value={days}
            onChange={setDays}
            max={360}
            suffix="días"
            hint="Días a provisionar; 30 es un mes completo."
          />
          <Field
            label="Prima"
            value={primaRate}
            onChange={setPrimaRate}
            max={30}
            step={0.01}
            suffix="%"
            hint="Referencia: 8,33 %. Verifica con tu contador."
          />
          <Field
            label="Cesantías"
            value={cesantiasRate}
            onChange={setCesantiasRate}
            max={30}
            step={0.01}
            suffix="%"
            hint="Referencia: 8,33 %. Verifica con tu contador."
          />
          <Field
            label="Intereses sobre cesantías"
            value={interestRate}
            onChange={setInterestRate}
            max={24}
            step={0.01}
            suffix="%"
            hint="Referencia: 1 % mensual sobre las cesantías. Verifica con tu contador."
          />
          <Field
            label="Vacaciones"
            value={vacationRate}
            onChange={setVacationRate}
            max={20}
            step={0.01}
            suffix="%"
            hint="Referencia: 4,17 %. Verifica con tu contador."
          />
        </div>
      </div>

      <div>
        <Result
          items={[
            { label: "Provisión de prima", value: cop(prima) },
            { label: "Provisión de cesantías", value: cop(cesantias) },
            { label: "Provisión de intereses", value: cop(interests) },
            { label: "Provisión de vacaciones", value: cop(vacations) },
            { label: "Total mensual", value: cop(total), hi: true },
          ]}
          note="Es una estimación y no reemplaza al contador ni a la nómina. Los porcentajes son referencias editables. La base es el salario por los días del período sobre 30, y los intereses se calculan sobre la provisión de cesantías."
        />
      </div>
    </div>
  );
}
