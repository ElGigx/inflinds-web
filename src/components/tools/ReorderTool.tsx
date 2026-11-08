"use client";

import { useState } from "react";
import { num } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function ReorderTool() {
  const [daily, setDaily] = useState(8);
  const [lead, setLead] = useState(7);
  const [safety, setSafety] = useState(5);
  const [stock, setStock] = useState(40);

  const reorder = daily * (lead + safety);
  const minimum = daily * safety;
  const buy = Math.max(0, Math.ceil(reorder - stock));
  const coverage = daily > 0 ? stock / daily : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field label="Consumo diario" value={daily} onChange={setDaily} step={1} suffix="unidades / día" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Entrega del proveedor" value={lead} onChange={setLead} suffix="días" />
          <Field label="Colchón de seguridad" value={safety} onChange={setSafety} suffix="días" />
        </div>
        <Field label="Stock que tienes hoy" value={stock} onChange={setStock} suffix="unidades" />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Punto de reorden", value: `${num(reorder)} uds`, hi: true },
            { label: "Stock mínimo", value: `${num(minimum)} uds` },
            { label: "Comprar ahora", value: buy > 0 ? `${buy} uds` : "No hace falta" },
            { label: "Alcanza para", value: `${num(coverage)} días` },
          ]}
          note="El punto de reorden cubre lo que vendes mientras llega el proveedor, más el colchón. Si el proveedor se demora más de lo que dice, sube el colchón."
        />
      </div>
    </div>
  );
}
