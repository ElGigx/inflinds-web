"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function CostoViajeTool() {
  const [distancia, setDistancia] = useState(320);
  const [rendimiento, setRendimiento] = useState(42);
  const [precioGalon, setPrecioGalon] = useState(16500);
  const [peajes, setPeajes] = useState(52000);
  const [otros, setOtros] = useState(30000);

  const km = Math.max(0, distancia);
  const galones = rendimiento > 0 ? km / rendimiento : 0;
  const combustible = galones * Math.max(0, precioGalon);
  const total = combustible + Math.max(0, peajes) + Math.max(0, otros);
  const porKm = km > 0 ? total / km : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <Field
          label="Distancia"
          value={distancia}
          onChange={setDistancia}
          step={10}
          suffix="km"
          hint="Ida y vuelta incluida."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Rendimiento"
            value={rendimiento}
            onChange={setRendimiento}
            step={0.5}
            suffix="km/gal"
          />
          <Field
            label="Precio del galón"
            value={precioGalon}
            onChange={setPrecioGalon}
            step={100}
            suffix="COP"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Peajes" value={peajes} onChange={setPeajes} step={1000} suffix="COP" />
          <Field
            label="Otros costos"
            value={otros}
            onChange={setOtros}
            step={1000}
            suffix="COP"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Galones usados", value: `${num(galones)} gal` },
            { label: "Costo de combustible", value: cop(combustible) },
            { label: "Costo total", value: cop(total), hi: true },
            { label: "Costo por km", value: cop(porKm) },
          ]}
          note="No incluye desgaste, mantenimiento, SOAT ni el mayor consumo que traen la carga y el aire acondicionado."
        />
        <p className="text-sm leading-relaxed text-slate">
          El rendimiento de la ficha técnica casi nunca es el del viaje real: el tráfico, la loma y
          el peso movido lo bajan. Si usas el dato de tu última tanqueada, la cuenta queda más
          cerca de la verdad.
        </p>
      </div>
    </div>
  );
}
