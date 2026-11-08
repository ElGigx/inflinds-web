"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

const opciones = [100, 500, 1000];

export default function PriceRoundingTool() {
  const [costo, setCosto] = useState(68000);
  const [margen, setMargen] = useState(35);
  const [paso, setPaso] = useState(1000);

  const base = Math.max(0, costo);
  const calculado = Math.round(base * (1 + Math.max(0, margen) / 100) * 10000) / 10000;
  const redondeado = paso > 0 ? Math.ceil(calculado / paso) * paso : calculado;
  const utilidad = redondeado - base;
  const margenReal = base > 0 ? (utilidad / base) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field label="Costo" value={costo} onChange={setCosto} step={1000} suffix="COP" />
        <Field
          label="Margen deseado"
          value={margen}
          onChange={setMargen}
          step={5}
          max={200}
          suffix="%"
          hint="Sobre el costo, no sobre el precio de venta."
        />
        <label className="block">
          <span className="text-sm font-semibold text-ink">Redondear a</span>
          <select
            value={paso}
            onChange={(event) => setPaso(Number(event.target.value))}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
          >
            {opciones.map((valor) => (
              <option key={valor} value={valor}>
                {cop(valor)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Precio calculado", value: cop(calculado) },
            { label: "Precio redondeado", value: cop(redondeado), hi: true },
            { label: "Utilidad", value: cop(utilidad) },
            { label: "Margen real", value: `${num(margenReal)} %` },
          ]}
          note="No descuenta IVA, comisiones ni costos fijos: redondea el precio de lista antes de impuestos."
        />
        <p className="text-sm leading-relaxed text-slate">
          El redondeo nunca baja el precio, así que el margen real queda igual o un poco por encima
          del que pediste. La diferencia es plata que no se pierde, pero también un precio que se
          aleja del que calculaste.
        </p>
      </div>
    </div>
  );
}
