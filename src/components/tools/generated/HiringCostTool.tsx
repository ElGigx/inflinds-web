"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function HiringCostTool() {
  const [salary, setSalary] = useState(2000000);
  const [transport, setTransport] = useState(200000);
  const [benefits, setBenefits] = useState(21.83);
  const [social, setSocial] = useState(20.5);
  const [parafiscal, setParafiscal] = useState(9);
  const [fixed, setFixed] = useState(0);

  const salaryBase = Math.max(0, salary);
  const load = (salaryBase * (benefits + social + parafiscal)) / 100;
  const monthly = salaryBase + Math.max(0, transport) + load + Math.max(0, fixed);
  const annual = monthly * 12;
  const daily = monthly / 22;
  const over = salaryBase > 0 ? ((monthly - salaryBase) / salaryBase) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-3`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Salario base mensual"
            value={salary}
            onChange={setSalary}
            step={50000}
            suffix="COP"
          />
          <Field
            label="Auxilio de transporte"
            value={transport}
            onChange={setTransport}
            step={10000}
            suffix="COP"
            hint="Se suma al costo pero no es factor salarial. Referencia editable: confirma el auxilio vigente con tu contador."
          />
          <Field
            label="Prestaciones"
            value={benefits}
            onChange={setBenefits}
            max={60}
            step={0.01}
            suffix="%"
            hint="Referencia: 21,83 % (8,33 % prima + 8,33 % cesantías + 1 % intereses + 4,17 % vacaciones). Verifica con tu contador."
          />
          <Field
            label="Seguridad social empleador"
            value={social}
            onChange={setSocial}
            max={60}
            step={0.01}
            suffix="%"
            hint="Referencia: 20,5 % (8,5 % salud + 12 % pensión + 0,522 % ARL, aprox.). Verifica con tu contador."
          />
          <Field
            label="Parafiscales"
            value={parafiscal}
            onChange={setParafiscal}
            max={40}
            step={0.01}
            suffix="%"
            hint="Referencia: 9 % (4 % caja + 2 % SENA + 3 % ICBF). Verifica con tu contador."
          />
          <Field
            label="Otros costos fijos"
            value={fixed}
            onChange={setFixed}
            step={50000}
            suffix="COP"
            hint="Dotación, bonos fijos u otros costos del mes."
          />
        </div>
      </div>

      <div>
        <Result
          items={[
            { label: "Costo mensual total", value: cop(monthly), hi: true },
            { label: "Costo anual (12 meses)", value: cop(annual) },
            { label: "Costo por día hábil (22)", value: cop(daily) },
            { label: "Recargo sobre el salario", value: `${num(over)} %` },
          ]}
          note="Es una estimación y no reemplaza al contador ni a la nómina. Los porcentajes son referencias editables: aportes y parafiscales se calculan sobre el salario base, no sobre el auxilio. Se asumen 12 pagos al año y 22 días hábiles al mes."
        />
      </div>
    </div>
  );
}
