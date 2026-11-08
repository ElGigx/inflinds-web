"use client";

import { useState } from "react";
import { num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

const units = {
  kg: { label: "Kilogramo (kg)", short: "kg", family: "peso", factor: 1000 },
  lb: { label: "Libra (lb)", short: "lb", family: "peso", factor: 453.59237 },
  g: { label: "Gramo (g)", short: "g", family: "peso", factor: 1 },
  arroba: { label: "Arroba (@)", short: "arroba", family: "peso", factor: 12500 },
  l: { label: "Litro (L)", short: "L", family: "volumen", factor: 1000 },
  ml: { label: "Mililitro (ml)", short: "ml", family: "volumen", factor: 1 },
  galon: { label: "Galón (gal)", short: "gal", family: "volumen", factor: 3785.411784 },
  unidad: { label: "Unidad", short: "unidad", family: "conteo", factor: 1 },
  docena: { label: "Docena", short: "docena", family: "conteo", factor: 12 },
} as const;

type UnitKey = keyof typeof units;

const groups: { label: string; keys: UnitKey[] }[] = [
  { label: "Peso", keys: ["kg", "lb", "g", "arroba"] },
  { label: "Volumen", keys: ["l", "ml", "galon"] },
  { label: "Conteo", keys: ["unidad", "docena"] },
];

const decimal = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 4 });

// num() keeps one decimal, which would turn 0,0022 lb into "0".
function qty(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return Math.abs(value) < 0.1 && value !== 0 ? decimal.format(value) : num(value);
}

function UnitSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: UnitKey;
  onChange: (value: UnitKey) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as UnitKey)}
        className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
      >
        {groups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.keys.map((key) => (
              <option key={key} value={key}>
                {units[key].label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

export default function ConversionMedidasTool() {
  const [valor, setValor] = useState(2.5);
  const [desde, setDesde] = useState<UnitKey>("kg");
  const [hasta, setHasta] = useState<UnitKey>("lb");

  const origen = units[desde];
  const destino = units[hasta];
  const mismaFamilia = origen.family === destino.family;
  const resultado = mismaFamilia ? (valor * origen.factor) / destino.factor : Number.NaN;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field label="Valor" value={valor} onChange={setValor} step={0.5} suffix="a convertir" />
        <UnitSelect label="Unidad de origen" value={desde} onChange={setDesde} />
        <UnitSelect label="Unidad de destino" value={hasta} onChange={setHasta} />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            {
              label: "Resultado",
              value: mismaFamilia ? `${qty(resultado)} ${destino.short}` : "—",
              hi: true,
            },
            {
              label: "Equivalencia",
              value: mismaFamilia
                ? `1 ${origen.short} = ${decimal.format(origen.factor / destino.factor)} ${destino.short}`
                : "Elige unidades de la misma familia",
            },
          ]}
          note="No convierte entre familias distintas, porque peso, volumen y conteo no tienen una equivalencia fija."
        />
        <p className="text-sm leading-relaxed text-slate">
          El galón de la tabla es el estadounidense, de 3,785 litros, y la arroba es la de 12,5 kg,
          la que se usa para granos y café en Colombia. Si tu proveedor maneja otra convención,
          conviene aclararla antes de cerrar el pedido.
        </p>
      </div>
    </div>
  );
}
