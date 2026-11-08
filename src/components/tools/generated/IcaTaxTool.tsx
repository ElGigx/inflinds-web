"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function IcaTaxTool() {
  const [base, setBase] = useState(10000000);
  const [tarifaPorMil, setTarifaPorMil] = useState(0.7);
  const [retePct, setRetePct] = useState(15);

  const baseGravable = Math.max(0, base);
  const tarifa = Math.max(0, tarifaPorMil);
  const rete = Math.max(0, Math.min(100, retePct));
  const ica = (baseGravable * tarifa) / 1000;
  const reteica = ica * (rete / 100);
  const saldo = ica - reteica;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-3`}>
        <Field
          label="Base gravable"
          value={base}
          onChange={setBase}
          step={100000}
          suffix="COP"
          hint="Los ingresos gravados del periodo o el valor de la operación."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Tarifa por mil"
            value={tarifaPorMil}
            onChange={setTarifaPorMil}
            step={0.1}
            suffix="‰"
            hint="Referencia: 0,7 por mil. Confirma con tu contador o con la norma vigente."
          />
          <Field
            label="reteICA"
            value={retePct}
            onChange={setRetePct}
            step={1}
            max={100}
            suffix="% ICA"
            hint="Referencia: 15 % del ICA. Confirma con tu contador o con la norma vigente."
          />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "ICA del periodo", value: cop(ica) },
            { label: "reteICA que te retienen", value: cop(reteica) },
            { label: "Saldo de ICA a pagar", value: cop(saldo), hi: true },
          ]}
          note="La tarifa del ICA depende del municipio y de la actividad: Bogotá no es igual a Medellín, y el porcentaje de reteICA también varía. Es una estimación; las tarifas y las reglas municipales cambian, así que confirma con tu contador o con la norma vigente."
        />
        <p className="text-sm leading-relaxed text-slate">
          La reteICA es un anticipo: el cliente descuenta una parte del ICA y tú declaras el
          impuesto completo. El saldo es lo que te queda por pagar después de ese descuento.
        </p>
      </div>
    </div>
  );
}
