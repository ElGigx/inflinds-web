"use client";

import { useState } from "react";
import { num } from "@/lib/format";
import { Result, cardClass } from "../ui";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20";

const LIMITS = [
  { name: "X", limit: 280 },
  { name: "Instagram", limit: 2200 },
  { name: "LinkedIn", limit: 3000 },
  { name: "Estado de WhatsApp", limit: 139 },
];

export default function CaracteresRedesTool() {
  const [text, setText] = useState("Escribir bien también es una forma de vender.");
  const characters = Array.from(text).length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Texto</span>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={10}
            placeholder="Escribe o pega el texto que vas a publicar."
            className={`mt-1.5 ${inputClass}`}
          />
          <span className="mt-1 block text-xs text-slate">
            Se cuentan caracteres Unicode, no bytes.
          </span>
        </label>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Caracteres", value: num(characters), hi: true },
            { label: "Palabras", value: num(words) },
          ]}
          note="Cada red aplica sus propias reglas a enlaces, emojis y espacios, así que el número que muestra la app puede diferir. Tómalo como referencia, no como garantía."
        />

        <div className={`${cardClass} space-y-4`}>
          {LIMITS.map(({ name, limit }) => {
            const over = characters - limit;
            const width = Math.min(100, (characters / limit) * 100);
            return (
              <div key={name} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">{name}</span>
                  <span className="text-xs text-slate">
                    {num(characters)} / {num(limit)} ·{" "}
                    {over <= 0 ? `faltan ${num(-over)}` : `sobran ${num(over)}`}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-paper-soft">
                  <div
                    className={`h-full rounded-full ${over > 0 ? "bg-magenta" : "bg-night"}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-sm leading-relaxed text-slate">
          El límite de X es el más corto y el que más se nota: si el texto pasa de 280, la
          publicación se recorta o se convierte en hilo. En Instagram y LinkedIn el margen es más
          amplio, pero los enlaces y las etiquetas también ocupan.
        </p>
      </div>
    </div>
  );
}
