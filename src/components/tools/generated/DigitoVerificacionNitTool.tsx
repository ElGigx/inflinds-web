"use client";

import { useState } from "react";
import { Result, cardClass } from "../ui";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20";

const WEIGHTS = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];

function checkDigit(digits: string): number {
  const reversed = digits.split("").reverse();
  let sum = 0;
  for (let i = 0; i < reversed.length; i += 1) {
    sum += Number(reversed[i]) * WEIGHTS[i];
  }
  const remainder = sum % 11;
  return remainder <= 1 ? remainder : 11 - remainder;
}

export default function DigitoVerificacionNitTool() {
  const [base, setBase] = useState("901494116");
  const digits = base.replace(/\D/g, "");
  const tooLong = digits.length > 15;
  const dv = digits.length > 0 && !tooLong ? checkDigit(digits) : null;
  const complete = dv === null ? "" : `${digits}-${dv}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Base del NIT</span>
          <input
            type="text"
            inputMode="numeric"
            value={base}
            onChange={(event) => setBase(event.target.value)}
            placeholder="901494116"
            className={`mt-1.5 ${inputClass}`}
          />
          <span className="mt-1 block text-xs text-slate">Solo dígitos, sin puntos ni guion.</span>
        </label>

        {tooLong && (
          <p className="text-sm leading-relaxed text-magenta">
            Un NIT no pasa de 15 dígitos: revisa la base antes de seguir.
          </p>
        )}

        <div className="rounded-xl bg-paper-soft p-4 text-sm leading-relaxed text-slate">
          <p className="font-semibold text-ink">Cómo se calcula</p>
          <p className="mt-1">
            Cada dígito se multiplica por un peso que va de derecha a izquierda (3, 7, 13, 17, 19,
            23, 29, 37, 41, 43, 47, 53, 59, 67, 71). La suma se divide entre 11: si el residuo es 0
            o 1, ese es el dígito; si no, es 11 menos el residuo.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Dígito de verificación", value: dv === null ? "—" : String(dv), hi: true },
            { label: "NIT completo", value: complete || "—" },
          ]}
          note="El DV solo confirma que el número está bien escrito; no dice si el NIT existe ni si está activo en la DIAN. El cálculo es el mismo para personas naturales y jurídicas."
        />
        <p className="text-sm leading-relaxed text-slate">
          Sirve para revisar el NIT de una factura, de un proveedor o de un cliente antes de
          guardarlo. Si el DV no coincide, casi siempre hay un dígito mal copiado.
        </p>
      </div>
    </div>
  );
}
