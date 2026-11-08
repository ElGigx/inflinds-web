"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function SocialSecurityTool() {
  const [salario, setSalario] = useState(2500000);
  const [salud, setSalud] = useState(8.5);
  const [pension, setPension] = useState(12);
  const [arl, setArl] = useState(0.522);
  const [caja, setCaja] = useState(4);
  const [sena, setSena] = useState(2);
  const [icbf, setIcbf] = useState(3);

  const base = Math.max(0, salario);
  const saludValor = base * (Math.max(0, salud) / 100);
  const pensionValor = base * (Math.max(0, pension) / 100);
  const arlValor = base * (Math.max(0, arl) / 100);
  const cajaValor = base * (Math.max(0, caja) / 100);
  const senaValor = base * (Math.max(0, sena) / 100);
  const icbfValor = base * (Math.max(0, icbf) / 100);

  const total = saludValor + pensionValor + arlValor + cajaValor + senaValor + icbfValor;
  const anual = total * 12;
  const peso = base > 0 ? (total / base) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-3`}>
        <Field
          label="Salario base"
          value={salario}
          onChange={setSalario}
          step={100000}
          suffix="COP"
          hint="El salario mensual sobre el que se calculan los aportes."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Salud"
            value={salud}
            onChange={setSalud}
            step={0.1}
            max={100}
            suffix="%"
            hint="Referencia: 8,5 %. Confirma con tu contador o con la norma vigente."
          />
          <Field
            label="Pensión"
            value={pension}
            onChange={setPension}
            step={0.1}
            max={100}
            suffix="%"
            hint="Referencia: 12 %. Confirma con tu contador o con la norma vigente."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="ARL"
            value={arl}
            onChange={setArl}
            step={0.001}
            max={100}
            suffix="%"
            hint="Referencia: 0,522 % (riesgo I). Confirma con tu contador o con la norma vigente."
          />
          <Field
            label="Caja de compensación"
            value={caja}
            onChange={setCaja}
            step={0.1}
            max={100}
            suffix="%"
            hint="Referencia: 4 %. Confirma con tu contador o con la norma vigente."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="SENA"
            value={sena}
            onChange={setSena}
            step={0.1}
            max={100}
            suffix="%"
            hint="Referencia: 2 %. Confirma con tu contador o con la norma vigente."
          />
          <Field
            label="ICBF"
            value={icbf}
            onChange={setIcbf}
            step={0.1}
            max={100}
            suffix="%"
            hint="Referencia: 3 %. Confirma con tu contador o con la norma vigente."
          />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Salud", value: cop(saludValor) },
            { label: "Pensión", value: cop(pensionValor) },
            { label: "ARL", value: cop(arlValor) },
            { label: "Caja de compensación", value: cop(cajaValor) },
            { label: "SENA", value: cop(senaValor) },
            { label: "ICBF", value: cop(icbfValor) },
            { label: "Total mensual", value: cop(total), hi: true },
            { label: "Total anual", value: cop(anual) },
            { label: "Peso sobre el salario", value: `${num(peso)} %` },
          ]}
          note="SENA e ICBF aplican según el número de empleados, el tipo de nómina y las exoneraciones vigentes; la caja depende de la afiliación y la ARL, del nivel de riesgo. Es una estimación: las tarifas y las reglas cambian con la ley y los decretos; confirma con tu contador."
        />
        <p className="text-sm leading-relaxed text-slate">
          El peso sobre el salario suma las tarifas que dejaste arriba, sin prestaciones. Sirve
          para presupuestar el costo real de cada empleado antes de contratar.
        </p>
      </div>
    </div>
  );
}
