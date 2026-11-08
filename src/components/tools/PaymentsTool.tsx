"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function PaymentsTool() {
  const [ticket, setTicket] = useState(80000);
  const [sales, setSales] = useState(120);
  const [pct, setPct] = useState(2.99);
  const [fixed, setFixed] = useState(900);
  const [verifyMinutes, setVerifyMinutes] = useState(1);
  const [hourRate, setHourRate] = useState(30000);

  const gatewayMonth = sales * (ticket * (pct / 100) + fixed);
  const verifyMonth = (sales * verifyMinutes) / 60 * hourRate;
  const brebMonth = verifyMonth;
  const savingMonth = gatewayMonth - brebMonth;
  const savingYear = savingMonth * 12;
  const breakEvenMinutes = sales > 0 && hourRate > 0 ? (gatewayMonth / sales) / (hourRate / 60) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Ticket promedio" value={ticket} onChange={setTicket} step={1000} suffix="COP" />
          <Field label="Ventas al mes" value={sales} onChange={setSales} suffix="transacciones" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Comisión de pasarela" value={pct} onChange={setPct} step={0.01} suffix="%" hint="Referencia de mercado: 2,99 %." />
          <Field label="Cargo fijo" value={fixed} onChange={setFixed} step={100} suffix="COP por venta" hint="Referencia: $900." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Minutos por verificar" value={verifyMinutes} onChange={setVerifyMinutes} step={0.5} suffix="min" hint="Solo para Bre-B manual." />
          <Field label="Tu hora" value={hourRate} onChange={setHourRate} step={1000} suffix="COP / hora" />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Pasarela, al mes", value: cop(gatewayMonth) },
            { label: "Bre-B, al mes (solo tiempo)", value: cop(brebMonth) },
            { label: "Diferencia mensual", value: cop(savingMonth), hi: true },
            { label: "Diferencia al año", value: cop(savingYear) },
          ]}
          note={`Una venta tendría que tomarte más de ${num(breakEvenMinutes)} minutos de verificación para que Bre-B manual salga más caro que la pasarela, con estos números.`}
        />
        <p className="text-sm leading-relaxed text-slate">
          La comparación es contra el tiempo, no contra la comisión: Bre-B no cobra, pero alguien
          confirma cada pago. Cuando el volumen pasa de unas 15 transacciones al día, el cuello de
          botella deja de ser barato.
        </p>
      </div>
    </div>
  );
}
