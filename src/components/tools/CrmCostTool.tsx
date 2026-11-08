"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function CrmCostTool() {
  const [users, setUsers] = useState(4);
  const [priceUsd, setPriceUsd] = useState(20);
  const [trm, setTrm] = useState(4000);
  const [implementation, setImplementation] = useState(1500000);
  const [migrationHours, setMigrationHours] = useState(30);
  const [hourRate, setHourRate] = useState(60000);

  const licenseYear = users * priceUsd * trm * 12;
  const migration = migrationHours * hourRate;
  const total = licenseYear + implementation + migration;
  const perUserMonth = users > 0 ? total / users / 12 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Personas con acceso" value={users} onChange={setUsers} min={1} />
          <Field label="Precio por usuario" value={priceUsd} onChange={setPriceUsd} suffix="USD / mes" />
        </div>
        <Field label="Tasa de cambio" value={trm} onChange={setTrm} step={10} suffix="COP por USD" />
        <Field label="Implementación" value={implementation} onChange={setImplementation} step={100000} suffix="COP, una vez" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Horas de migración" value={migrationHours} onChange={setMigrationHours} suffix="horas" />
          <Field label="Tu hora" value={hourRate} onChange={setHourRate} step={5000} suffix="COP / hora" />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Licencia al año", value: cop(licenseYear) },
            { label: "Implementación + migración", value: cop(implementation + migration) },
            { label: "Costo a 12 meses", value: cop(total), hi: true },
            { label: "Por usuario y mes", value: cop(perUserMonth) },
          ]}
          note="La licencia en dólares se convierte a la tasa que escribiste. Si el proveedor cobra IVA o cobra en pesos, ajusta el número."
        />
        <p className="text-sm leading-relaxed text-slate">
          El precio de la lista casi nunca es el costo: el segundo año duele menos, pero cada
          persona nueva vuelve a subir la factura.
        </p>
      </div>
    </div>
  );
}
