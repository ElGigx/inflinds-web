"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

function asPercent(value: number) {
  return Number.isFinite(value) ? `${num(value)} %` : "—";
}

export default function RealMarginTool() {
  const [salePrice, setSalePrice] = useState(120000);
  const [cost, setCost] = useState(70000);
  const [discount, setDiscount] = useState(10);

  const finalPrice = salePrice * (1 - discount / 100);
  const profit = finalPrice - cost;
  const margin = finalPrice > 0 ? (profit / finalPrice) * 100 : Number.NaN;
  const markup = cost > 0 ? (profit / cost) * 100 : Number.NaN;
  const losesMoney = profit < 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field label="Precio de venta" value={salePrice} onChange={setSalePrice} step={1000} suffix="COP" />
        <Field label="Costo del producto" value={cost} onChange={setCost} step={1000} suffix="COP" />
        <Field
          label="Descuento aplicado"
          value={discount}
          onChange={setDiscount}
          max={100}
          step={1}
          suffix="%"
          hint="Sobre el precio de venta, antes de impuestos."
        />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Precio final", value: cop(finalPrice) },
            { label: "Utilidad", value: cop(profit) },
            { label: "Margen sobre el precio final", value: asPercent(margin), hi: true },
            { label: "Markup sobre el costo", value: asPercent(markup) },
          ]}
          note="No incluye IVA, retenciones ni costos indirectos como flete o empaque. El margen se mide sobre lo que cobras y el markup sobre lo que te costó."
        />
        {losesMoney && (
          <div className="rounded-xl border border-magenta bg-paper-soft p-4 text-sm font-semibold leading-relaxed text-magenta">
            Con ese descuento pierdes plata: lo que cobras queda por debajo del costo. Revisa el descuento,
            el costo o los dos antes de vender.
          </div>
        )}
        <p className="text-sm leading-relaxed text-slate">
          Un margen bajo no es un error por sí solo: depende de cuánto vendas y de cuánto cueste reponer.
          Lo que no se sostiene es vender por debajo del costo esperando que el volumen lo compense.
        </p>
      </div>
    </div>
  );
}
