"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function PropinaCuentaTool() {
  const [cuenta, setCuenta] = useState(185000);
  const [personas, setPersonas] = useState(4);
  const [porcentaje, setPorcentaje] = useState(10);

  const comensales = Math.max(1, Math.floor(personas));
  const propina = (cuenta * Math.max(0, porcentaje)) / 100;
  // COP has no cents: rounding the total first keeps the split from gaining a peso.
  const total = Math.round(cuenta + propina);
  const porPersona = Math.ceil(total / comensales);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field
          label="Total de la cuenta"
          value={cuenta}
          onChange={setCuenta}
          step={1000}
          suffix="COP"
        />
        <Field
          label="Personas"
          value={personas}
          onChange={setPersonas}
          min={1}
          max={50}
          suffix="personas"
        />
        <Field
          label="Propina"
          value={porcentaje}
          onChange={setPorcentaje}
          max={30}
          suffix="%"
          hint="En Colombia es voluntaria; el 10 % es la costumbre."
        />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Propina", value: cop(propina) },
            { label: "Total con propina", value: cop(total) },
            { label: "Pago por persona", value: cop(porPersona), hi: true },
          ]}
          note="No reparte montos distintos por persona ni cuenta lo que cada uno pidió por aparte."
        />
        <p className="text-sm leading-relaxed text-slate">
          El pago por persona se redondea hacia arriba al peso para que nadie quede corto, así que
          lo recogido puede quedar unos pesos por encima del total. Cuando pasa, esa diferencia
          termina siendo propina de más.
        </p>
      </div>
    </div>
  );
}
