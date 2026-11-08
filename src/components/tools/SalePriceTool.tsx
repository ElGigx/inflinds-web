"use client";

import { useState } from "react";
import { cop, pct } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function SalePriceTool() {
  const [cost, setCost] = useState(120000);
  const [margin, setMargin] = useState(35);
  const [discount, setDiscount] = useState(0);

  const marginRatio = Math.min(Math.max(margin / 100, 0), 0.95);
  const price = marginRatio >= 0.95 ? 0 : cost / (1 - marginRatio);
  const finalPrice = price * (1 - Math.min(Math.max(discount, 0), 90) / 100);
  const profit = finalPrice - cost;
  const realMargin = finalPrice > 0 ? profit / finalPrice : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field label="Costo unitario" value={cost} onChange={setCost} step={1000} suffix="COP" />
        <Field
          label="Margen que quieres"
          value={margin}
          onChange={setMargin}
          max={90}
          suffix="% sobre el precio"
          hint="El margen se calcula sobre el precio de venta, no sobre el costo."
        />
        <Field
          label="Descuento previsto"
          value={discount}
          onChange={setDiscount}
          max={90}
          suffix="%"
          hint="Déjalo en 0 si no piensas negociar."
        />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Precio sin descuento", value: cop(price) },
            { label: "Precio con descuento", value: cop(finalPrice), hi: true },
            { label: "Utilidad por unidad", value: cop(profit) },
            { label: "Margen real", value: pct(realMargin) },
          ]}
          note="Cifras en pesos, sin IVA. Si vendes con IVA, el precio final al cliente sube y el margen no cambia."
        />
        <p className="text-sm leading-relaxed text-slate">
          Si el margen real queda por debajo del que querías, el descuento se lo comió. Ese es
          el número que conviene mirar antes de negociar.
        </p>
      </div>
    </div>
  );
}
