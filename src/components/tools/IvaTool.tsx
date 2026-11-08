"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function IvaTool() {
  const [amount, setAmount] = useState(250000);
  const [rate, setRate] = useState(19);
  const [mode, setMode] = useState<"sumar" | "quitar">("sumar");

  const r = rate / 100;
  const base = mode === "sumar" ? amount : amount / (1 + r);
  const iva = base * r;
  const total = base + iva;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div>
          <span className="text-sm font-semibold text-ink">¿Qué tienes?</span>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-paper-soft p-1">
            {(["sumar", "quitar"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMode(option)}
                aria-pressed={mode === option}
                className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                  mode === option ? "bg-night text-white" : "text-ink hover:bg-white"
                }`}
              >
                {option === "sumar" ? "Monto sin IVA" : "Total con IVA"}
              </button>
            ))}
          </div>
        </div>
        <Field label="Monto" value={amount} onChange={setAmount} step={1000} suffix="COP" />
        <Field label="Tarifa de IVA" value={rate} onChange={setRate} max={50} suffix="%" hint="19 % es la general en Colombia." />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Base gravable", value: cop(base) },
            { label: "IVA", value: cop(iva) },
            { label: "Total", value: cop(total), hi: true },
          ]}
          note="El IVA se calcula sobre la base, no sobre el total. Si la factura trae retenciones, esas van aparte."
        />
      </div>
    </div>
  );
}
