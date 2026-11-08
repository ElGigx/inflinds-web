"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function CurrencyTool() {
  const [usd, setUsd] = useState(100);
  const [rate, setRate] = useState(4000);
  const [margin, setMargin] = useState(2);

  const copBase = usd * rate;
  const copWithMargin = copBase * (1 + margin / 100);
  const backToUsd = copWithMargin / rate;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field label="Dólares" value={usd} onChange={setUsd} step={1} suffix="USD" />
        <Field label="Tasa de cambio" value={rate} onChange={setRate} step={10} suffix="COP por USD" hint="Usa la tasa que te cobra hoy tu banco o la casa de cambio." />
        <Field label="Margen de seguridad" value={margin} onChange={setMargin} max={30} suffix="%" hint="Para cubrir la diferencia del día y la comisión." />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Sin margen", value: cop(copBase) },
            { label: `Margen ${num(margin)} %`, value: cop(copWithMargin - copBase) },
            { label: "Con margen", value: cop(copWithMargin), hi: true },
            { label: "Vuelta a dólares", value: `${num(backToUsd)} USD` },
          ]}
          note="La tasa la pones tú: aquí no se consulta el mercado. Si la tasa cambia en el día, vuelve a convertir."
        />
      </div>
    </div>
  );
}
