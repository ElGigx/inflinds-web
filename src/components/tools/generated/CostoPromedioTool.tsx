"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

const purchases = ["Compra 1", "Compra 2", "Compra 3"];

function signed(value: number) {
  if (!Number.isFinite(value)) return "—";
  return `${value < 0 ? "−" : ""}${cop(Math.abs(value))}`;
}

export default function CostoPromedioTool() {
  const [qty, setQty] = useState([10, 8, 15]);
  const [price, setPrice] = useState([4200, 5200, 3900]);

  const totalUnits = qty.reduce((sum, item) => sum + item, 0);
  const totalCost = qty.reduce((sum, item, index) => sum + item * price[index], 0);
  const weighted = totalUnits > 0 ? totalCost / totalUnits : 0;
  const simple = (price[0] + price[1] + price[2]) / 3;
  const difference = weighted - simple;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        {purchases.map((name, index) => (
          <div key={name} className={index > 0 ? "border-t border-line pt-4" : undefined}>
            <p className="text-sm font-semibold text-ink">{name}</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <Field
                label="Cantidad"
                value={qty[index]}
                onChange={(value) => setQty((prev) => prev.map((item, i) => (i === index ? value : item)))}
                suffix="unidades"
              />
              <Field
                label="Precio unitario"
                value={price[index]}
                onChange={(value) => setPrice((prev) => prev.map((item, i) => (i === index ? value : item)))}
                step={100}
                suffix="COP"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Unidades totales", value: num(totalUnits) },
            { label: "Costo total", value: cop(totalCost) },
            { label: "Costo promedio ponderado", value: cop(weighted), hi: true },
            { label: "Promedio simple de precios", value: cop(simple) },
            { label: "Diferencia", value: signed(difference) },
          ]}
          note="El ponderado pesa cada precio por lo que compraste; el simple reparte los tres precios por igual. No incluye IVA, flete ni descuentos."
        />
        <p className="text-sm leading-relaxed text-slate">
          Si una compra tiene cantidad cero, el ponderado la ignora y el simple no: ahí la diferencia se
          abre sin que el costo real haya cambiado.
        </p>
      </div>
    </div>
  );
}
