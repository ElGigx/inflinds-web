"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function ComisionesVentaTool() {
  const [sales, setSales] = useState(30000000);
  const [rate, setRate] = useState(3);
  const [goal, setGoal] = useState(25000000);
  const [bonus, setBonus] = useState(500000);

  const base = (sales * Math.min(Math.max(rate, 0), 100)) / 100;
  const met = goal > 0 && sales >= goal;
  const paidBonus = met ? bonus : 0;
  const total = base + paidBonus;
  const effective = sales > 0 ? (total / sales) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Ventas del mes"
            value={sales}
            onChange={setSales}
            step={100000}
            suffix="COP"
          />
          <Field label="Comisión" value={rate} onChange={setRate} max={100} step={0.5} suffix="%" />
          <Field
            label="Meta de ventas"
            value={goal}
            onChange={setGoal}
            step={100000}
            suffix="COP"
            hint="El bono solo se paga si las ventas la alcanzan."
          />
          <Field
            label="Bono por cumplir la meta"
            value={bonus}
            onChange={setBonus}
            step={50000}
            suffix="COP"
          />
        </div>
        <p className="text-xs leading-relaxed text-slate">
          La comisión se calcula sobre las ventas del mes. El bono es una suma fija y se paga una
          sola vez, no por cada peso que pase de la meta.
        </p>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Comisión base", value: cop(base) },
            { label: "Bono por meta", value: met ? cop(paidBonus) : "No se cumple" },
            { label: "Total a pagar", value: cop(total), hi: true },
            { label: "Porcentaje efectivo", value: `${num(effective)} %` },
          ]}
          note="El total no descuenta retenciones ni aportes: eso se aplica después, sobre lo que se paga. Tampoco reparte la comisión entre varios vendedores."
        />
        <p className="text-sm leading-relaxed text-slate">
          El porcentaje efectivo incluye el bono. Cuando las ventas apenas pasan la meta, el bono
          pesa más sobre el total; cuando la superan por mucho, el porcentaje se acerca al pactado.
        </p>
      </div>
    </div>
  );
}
