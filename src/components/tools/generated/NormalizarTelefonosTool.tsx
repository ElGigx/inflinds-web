"use client";

import { useState } from "react";
import { num } from "@/lib/format";
import { Result, cardClass } from "../ui";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20";

type Row = { original: string; formatted: string; valid: boolean };

export default function NormalizarTelefonosTool() {
  const [raw, setRaw] = useState("300 123 4567\n+57 601 234 5678\n300 12 34");
  const [copied, setCopied] = useState(false);

  const rows: Row[] = raw
    .split(/[\n,;]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((original) => {
      const digits = original.replace(/\D/g, "");
      const national =
        digits.length === 12 && digits.startsWith("57")
          ? digits.slice(2)
          : digits.length === 11 && digits.startsWith("0")
            ? digits.slice(1)
            : digits;
      const valid =
        national.length === 10 && (national.startsWith("3") || national.startsWith("6"));
      return {
        original,
        valid,
        formatted: valid
          ? `+57 ${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`
          : "",
      };
    });

  const validRows = rows.filter((row) => row.valid);
  const invalidRows = rows.filter((row) => !row.valid);
  const output = validRows.map((row) => row.formatted).join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Lista de teléfonos</span>
          <textarea
            value={raw}
            onChange={(event) => setRaw(event.target.value)}
            rows={6}
            placeholder={"300 123 4567\n+57 601 234 5678"}
            className={`mt-1.5 ${inputClass}`}
          />
          <span className="mt-1 block text-xs text-slate">Uno por línea o separados por coma.</span>
        </label>

        <div className="space-y-2">
          <span className="text-sm font-semibold text-ink">Lista normalizada</span>
          <textarea
            readOnly
            value={output}
            rows={5}
            placeholder="Aquí aparece la lista limpia."
            className={inputClass}
          />
          <button
            type="button"
            onClick={copy}
            disabled={validRows.length === 0}
            className="w-full rounded-xl bg-night px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "Copiado" : "Copiar lista"}
          </button>
        </div>

        {invalidRows.length > 0 && (
          <div className="rounded-xl bg-paper-soft p-3">
            <p className="text-xs font-semibold text-ink">Para revisar</p>
            <ul className="mt-1 space-y-1 text-xs text-slate">
              {invalidRows.map((row, index) => (
                <li key={`${row.original}-${index}`}>{row.original}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Válidos", value: num(validRows.length), hi: true },
            { label: "No válidos", value: num(invalidRows.length) },
            { label: "Total", value: num(rows.length) },
          ]}
          note="Solo se revisa la forma: celular de 10 dígitos que empieza por 3, o fijo de 10 dígitos que empieza por 6 (indicativo + 7 dígitos). No se comprueba que el número exista."
        />
        <p className="text-sm leading-relaxed text-slate">
          El mismo celular puede llegar como 300 123 4567, +57 300 123 4567 o 573001234567, y los
          tres salen igual. Las líneas que no encajan quedan aparte para que decidas qué hacer.
        </p>
      </div>
    </div>
  );
}
