"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function FacturaRetencionesTool() {
  const [subtotal, setSubtotal] = useState(1000000);
  const [ivaPct, setIvaPct] = useState(19);
  const [retefuentePct, setRetefuentePct] = useState(4);
  const [reteivaPct, setReteivaPct] = useState(15);
  const [icaPorMil, setIcaPorMil] = useState(0.7);

  const base = Math.max(0, subtotal);
  const ivaTarifa = Math.max(0, Math.min(100, ivaPct));
  const retefuenteTarifa = Math.max(0, Math.min(100, retefuentePct));
  const reteivaTarifa = Math.max(0, Math.min(100, reteivaPct));
  const icaTarifa = Math.max(0, icaPorMil);

  const iva = base * (ivaTarifa / 100);
  const totalFactura = base + iva;
  const retefuente = base * (retefuenteTarifa / 100);
  const reteiva = iva * (reteivaTarifa / 100);
  const ica = (base * icaTarifa) / 1000;
  const totalRetenciones = retefuente + reteiva + ica;
  const neto = totalFactura - totalRetenciones;
  const efectivo = totalFactura > 0 ? (totalRetenciones / totalFactura) * 100 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-3`}>
        <Field
          label="Subtotal"
          value={subtotal}
          onChange={setSubtotal}
          step={100000}
          suffix="COP"
          hint="La base antes de IVA y antes de retenciones."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="IVA"
            value={ivaPct}
            onChange={setIvaPct}
            step={1}
            max={100}
            suffix="%"
            hint="Referencia: 19 %. Confirma con tu contador o con la norma vigente."
          />
          <Field
            label="Retefuente"
            value={retefuentePct}
            onChange={setRetefuentePct}
            step={0.1}
            max={100}
            suffix="%"
            hint="Referencia: 4 %. Confirma con tu contador o con la norma vigente."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="ReteIVA"
            value={reteivaPct}
            onChange={setReteivaPct}
            step={1}
            max={100}
            suffix="%"
            hint="Referencia: 15 %. Confirma con tu contador o con la norma vigente."
          />
          <Field
            label="ICA (por mil)"
            value={icaPorMil}
            onChange={setIcaPorMil}
            step={0.1}
            suffix="‰"
            hint="Referencia: 0,7 por mil. Confirma con tu contador o con la norma vigente."
          />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Total de la factura", value: cop(totalFactura) },
            { label: "Total de retenciones", value: cop(totalRetenciones) },
            { label: "Neto a recibir", value: cop(neto), hi: true },
            { label: "Porcentaje efectivo retenido", value: `${num(efectivo)} %` },
          ]}
          note="Es una estimación con las tarifas que escribas: no valida cuantías mínimas, autorretención ni la tarifa de tu municipio. La retefuente y el ICA se calculan sobre el subtotal, y el reteIVA sobre el IVA. Las reglas cambian con el Estatuto Tributario, los decretos y la norma municipal; confirma cada retención con tu contador."
        />
        <p className="text-sm leading-relaxed text-slate">
          El porcentaje efectivo no es la suma de las tarifas: cada una se aplica sobre una base
          distinta. Sirve para ver cuánto pesan las retenciones sobre el total de la factura.
        </p>
      </div>
    </div>
  );
}
