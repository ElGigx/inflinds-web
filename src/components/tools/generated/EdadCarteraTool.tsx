"use client";

import { useMemo, useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

const DAY = 86_400_000;

function toIso(date: Date) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function parseIso(value: string) {
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function daysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

export default function EdadCarteraTool() {
  const [invoiceDate, setInvoiceDate] = useState(() => toIso(daysAgo(45)));
  const [amount, setAmount] = useState(1800000);
  const [term, setTerm] = useState(30);
  const [rate, setRate] = useState(2.5);

  const result = useMemo(() => {
    const invoice = parseIso(invoiceDate);
    const today = parseIso(toIso(new Date()));
    if (!invoice || !today) return { elapsed: 0, overdue: 0, interest: 0, total: 0 };

    const elapsed = Math.max(0, Math.round((today.getTime() - invoice.getTime()) / DAY));
    const overdue = Math.max(0, elapsed - Math.max(0, Math.round(term)));
    const interest = amount * (rate / 100) * (overdue / 30);

    return { elapsed, overdue, interest, total: amount + interest };
  }, [invoiceDate, amount, term, rate]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-semibold text-ink">Fecha de la factura</span>
            <button
              type="button"
              onClick={() => setInvoiceDate(toIso(new Date()))}
              className="text-xs font-semibold text-magenta underline-offset-2 hover:underline"
            >
              Hoy
            </button>
          </div>
          <input
            type="date"
            value={invoiceDate}
            onChange={(event) => setInvoiceDate(event.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
          />
        </div>
        <Field label="Valor de la factura" value={amount} onChange={setAmount} step={10000} suffix="COP" />
        <Field
          label="Plazo de pago"
          value={term}
          onChange={setTerm}
          max={365}
          suffix="días"
          hint="Días de crédito desde la fecha de la factura."
        />
        <Field
          label="Tasa de mora mensual"
          value={rate}
          onChange={setRate}
          step={0.1}
          suffix="% mes"
          hint="La que diga el contrato o la factura."
        />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Días transcurridos", value: num(result.elapsed) },
            { label: "Días vencidos", value: num(result.overdue) },
            { label: "Estado", value: result.overdue > 0 ? "Vencida" : "Al día" },
            { label: "Interés de mora", value: cop(result.interest) },
            { label: "Total a cobrar", value: cop(result.total), hi: true },
          ]}
          note="La mora es simple: la tasa mensual se aplica sobre el capital y se prorratea por los días vencidos con un mes de 30 días. No incluye IVA, retenciones ni capitalización de intereses."
        />
        <p className="text-sm leading-relaxed text-slate">
          La tasa de mora no se inventa: sale del contrato o de la factura, y en Colombia tiene un tope
          legal. Los días transcurridos se cuentan contra la fecha de hoy del equipo donde abres esto; una
          factura con fecha futura cuenta como cero días.
        </p>
      </div>
    </div>
  );
}
