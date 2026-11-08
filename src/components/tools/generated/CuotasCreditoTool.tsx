"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function CuotasCreditoTool() {
  const [monto, setMonto] = useState(8000000);
  const [tasa, setTasa] = useState(1.8);
  const [meses, setMeses] = useState(24);

  const n = Math.max(1, Math.floor(meses));
  const i = tasa / 100;
  const cuota = i <= 0 ? monto / n : (monto * i) / (1 - Math.pow(1 + i, -n));
  const total = cuota * n;
  const intereses = total - monto;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field
          label="Monto del crédito"
          value={monto}
          onChange={setMonto}
          step={100000}
          suffix="COP"
        />
        <Field
          label="Tasa mensual"
          value={tasa}
          onChange={setTasa}
          step={0.1}
          max={20}
          suffix="%"
          hint="La tasa que te da el banco, no la efectiva anual."
        />
        <Field
          label="Plazo"
          value={meses}
          onChange={setMeses}
          min={1}
          max={120}
          suffix="meses"
        />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Cuota fija mensual", value: cop(cuota), hi: true },
            { label: "Total pagado", value: cop(total) },
            { label: "Total de intereses", value: cop(intereses) },
          ]}
          note="No incluye seguros, cuota de manejo, aval ni cambios de tasa: la cuenta es la del crédito puro."
        />
        <p className="text-sm leading-relaxed text-slate">
          La amortización francesa reparte el mismo pago todos los meses: al principio la mayor
          parte de la cuota se va en intereses y hacia el final casi toda abona capital. Si la tasa
          se mueve, la cuota también.
        </p>
      </div>
    </div>
  );
}
