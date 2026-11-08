"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

const POUND_IN_KG = 0.45359237;

export default function PrecioPorLibraTool() {
  const [direction, setDirection] = useState<"kilo" | "libra">("kilo");
  const [price, setPrice] = useState(12500);

  const pricePerKg = direction === "kilo" ? price : price / POUND_IN_KG;
  const pricePerLb = direction === "kilo" ? price * POUND_IN_KG : price;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Dirección</span>
          <select
            value={direction}
            onChange={(event) => setDirection(event.target.value === "libra" ? "libra" : "kilo")}
            className="mt-1.5 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20"
          >
            <option value="kilo">De precio por kilo a libra</option>
            <option value="libra">De precio por libra a kilo</option>
          </select>
        </label>
        <Field
          label={direction === "kilo" ? "Precio por kilo" : "Precio por libra"}
          value={price}
          onChange={setPrice}
          step={100}
          suffix="COP"
          hint="El precio que ya usas en la balanza o en la etiqueta."
        />
        <p className="text-xs leading-relaxed text-slate">
          Una libra son 0,45359237 kg, así que la libra siempre sale más barata que el kilo.
        </p>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Precio por kilo", value: cop(pricePerKg), hi: direction === "libra" },
            { label: "Precio por libra", value: cop(pricePerLb), hi: direction === "kilo" },
            { label: "Media libra (500 g)", value: cop((pricePerKg * 500) / 1000) },
            { label: "Precio por 100 gramos", value: cop(pricePerKg / 10) },
          ]}
          note="Conversión lineal con la libra exacta de 0,45359237 kg. No incluye empaque, merma, flete ni redondeos de la balanza."
        />
        <p className="text-sm leading-relaxed text-slate">
          Sirve para poner el mismo precio en dos unidades sin hacer la regla de tres a mano: el precio por
          kilo se multiplica por 0,45359237 y el precio por libra se divide por lo mismo.
        </p>
      </div>
    </div>
  );
}
