"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function UnitPriceTool() {
  const [priceA, setPriceA] = useState(18000);
  const [qtyA, setQtyA] = useState(900);
  const [priceB, setPriceB] = useState(27000);
  const [qtyB, setQtyB] = useState(1500);

  const perA = qtyA > 0 ? priceA / qtyA : 0;
  const perB = qtyB > 0 ? priceB / qtyB : 0;
  const cheaper = perA <= perB ? "A" : "B";
  const saving = Math.max(perA, perB) > 0 ? Math.abs(perA - perB) / Math.max(perA, perB) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <p className="text-sm font-semibold text-ink">Opción A</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Precio" value={priceA} onChange={setPriceA} step={500} suffix="COP" />
          <Field label="Contenido" value={qtyA} onChange={setQtyA} suffix="g o ml" />
        </div>
        <div className="border-t border-line pt-4">
          <p className="text-sm font-semibold text-ink">Opción B</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="Precio" value={priceB} onChange={setPriceB} step={500} suffix="COP" />
            <Field label="Contenido" value={qtyB} onChange={setQtyB} suffix="g o ml" />
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate">
          Usa la misma medida en las dos opciones: gramos, mililitros o unidades.
        </p>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "A, por unidad", value: cop(perA) },
            { label: "B, por unidad", value: cop(perB) },
            { label: "Conviene", value: `Opción ${cheaper}`, hi: true },
            { label: "Diferencia", value: `${num(saving * 100)} %` },
          ]}
          note="Comparar por unidad evita la trampa de la presentación grande: a veces el bulto cuesta más por kilo que el paquete pequeño."
        />
      </div>
    </div>
  );
}
