"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function DescuentosCascadaTool() {
  const [lista, setLista] = useState(480000);
  const [primero, setPrimero] = useState(20);
  const [segundo, setSegundo] = useState(10);
  const [iva, setIva] = useState(19);

  const d1 = Math.min(100, Math.max(0, primero));
  const d2 = Math.min(100, Math.max(0, segundo));
  const t = Math.max(0, iva);

  const base = lista * (1 - d1 / 100) * (1 - d2 / 100);
  const ahorro = lista - base;
  const ivaMonto = (base * t) / 100;
  const total = base + ivaMonto;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field
          label="Precio de lista"
          value={lista}
          onChange={setLista}
          step={10000}
          suffix="COP"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Descuento 1"
            value={primero}
            onChange={setPrimero}
            max={100}
            suffix="%"
          />
          <Field
            label="Descuento 2"
            value={segundo}
            onChange={setSegundo}
            max={100}
            suffix="%"
          />
        </div>
        <Field label="IVA" value={iva} onChange={setIva} max={50} suffix="%" hint="Se aplica al final, sobre el precio ya descontado." />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Precio antes de IVA", value: cop(base) },
            { label: "Ahorro total", value: cop(ahorro) },
            { label: "IVA", value: cop(ivaMonto) },
            { label: "Total final", value: cop(total), hi: true },
          ]}
          note="No incluye envío, retenciones ni descuentos condicionados al medio de pago."
        />
        <p className="text-sm leading-relaxed text-slate">
          El segundo descuento cae sobre lo que quedó después del primero, y el IVA va al final
          sobre el precio ya rebajado. Por eso 20 % + 10 % no suma 30 %.
        </p>
      </div>
    </div>
  );
}
