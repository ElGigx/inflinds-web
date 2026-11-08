"use client";

import { useId, useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Info, Result, cardClass } from "../ui";

type ConceptoKey =
  | "servicios"
  | "compras"
  | "honorarios"
  | "arrendamiento"
  | "transporte"
  | "rendimientos";

const CONCEPTOS: { key: ConceptoKey; label: string; tarifa: number }[] = [
  { key: "servicios", label: "Servicios", tarifa: 4 },
  { key: "compras", label: "Compras", tarifa: 2.5 },
  { key: "honorarios", label: "Honorarios", tarifa: 11 },
  { key: "arrendamiento", label: "Arrendamiento", tarifa: 3.5 },
  { key: "transporte", label: "Transporte", tarifa: 1 },
  { key: "rendimientos", label: "Rendimientos", tarifa: 7 },
];

const selectClass =
  "w-full rounded-lg border border-line bg-white px-2.5 py-2 text-sm text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20";

export default function RetencionFuenteTool() {
  const [base, setBase] = useState(2000000);
  const [concepto, setConcepto] = useState<ConceptoKey>("servicios");
  const [tarifa, setTarifa] = useState(4);
  const conceptoId = useId();

  const referencia = CONCEPTOS.find((item) => item.key === concepto)?.tarifa ?? 0;
  const baseGravable = Math.max(0, base);
  const tarifaAplicada = Math.max(0, Math.min(100, tarifa));
  const retencion = baseGravable * (tarifaAplicada / 100);
  const neto = baseGravable - retencion;
  const efectiva = baseGravable > 0 ? (retencion / baseGravable) * 100 : 0;

  function cambiarConcepto(key: ConceptoKey) {
    setConcepto(key);
    const item = CONCEPTOS.find((opcion) => opcion.key === key);
    if (item) setTarifa(item.tarifa);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-3`}>
        <Field
          label="Base gravable"
          value={base}
          onChange={setBase}
          step={100000}
          suffix="COP"
          hint="El valor del servicio o de la compra antes de IVA."
        />

        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor={conceptoId} className="text-xs font-semibold leading-tight text-ink">
              Concepto
            </label>
            <Info text="Cada concepto tiene su tarifa de referencia. Si tu caso no encaja, ajusta la tarifa a mano." />
          </div>
          <select
            id={conceptoId}
            value={concepto}
            onChange={(event) => cambiarConcepto(event.target.value as ConceptoKey)}
            className={`mt-1 ${selectClass}`}
          >
            {CONCEPTOS.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <Field
          label="Tarifa de retención"
          value={tarifa}
          onChange={setTarifa}
          step={0.1}
          max={100}
          suffix="%"
          hint={`Referencia: ${num(referencia)} %. Confirma con tu contador o con la norma vigente.`}
        />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Retención en la fuente", value: cop(retencion), hi: true },
            { label: "Valor a pagar al proveedor", value: cop(neto) },
            { label: "Tarifa efectiva sobre la base", value: `${num(efectiva)} %` },
          ]}
          note="La cuenta no aplica cuantías mínimas ni autorretención: si el pago no llega a la base mínima del concepto o el proveedor es autorretenedor, la retención se ajusta. Es una estimación; las tarifas y los requisitos cambian con el Estatuto Tributario y los decretos. Verifica el concepto con tu contador."
        />
        <p className="text-sm leading-relaxed text-slate">
          El proveedor recibe el neto y tú declaras lo retenido. Al cambiar de concepto, la tarifa
          vuelve a su valor de referencia para que compares sin arrastrar el anterior.
        </p>
      </div>
    </div>
  );
}
