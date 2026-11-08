"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function BreakEvenTool() {
  const [fixed, setFixed] = useState(4000000);
  const [price, setPrice] = useState(120000);
  const [variable, setVariable] = useState(45000);

  const contribution = price - variable;
  const units = contribution > 0 ? fixed / contribution : 0;
  const revenue = units * price;
  const margin = price > 0 ? contribution / price : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field label="Costos fijos del mes" value={fixed} onChange={setFixed} step={100000} suffix="COP" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Precio de venta" value={price} onChange={setPrice} step={1000} suffix="COP" />
          <Field label="Costo variable por unidad" value={variable} onChange={setVariable} step={1000} suffix="COP" />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Margen de contribución", value: cop(contribution) },
            { label: "Unidades para no perder", value: `${num(units)}` },
            { label: "Ventas necesarias", value: cop(revenue), hi: true },
            { label: "Margen sobre el precio", value: `${num(margin * 100)} %` },
          ]}
          note="El punto de equilibrio no incluye utilidad: es el piso. Todo lo que vendas por encima empieza a dejar."
        />
        {contribution <= 0 && (
          <p className="rounded-xl border border-magenta/40 bg-magenta/5 p-4 text-sm text-ink">
            Con ese precio y ese costo variable, cada venta pierde plata: el punto de equilibrio
            no existe hasta que el precio supere al costo variable.
          </p>
        )}
      </div>
    </div>
  );
}
