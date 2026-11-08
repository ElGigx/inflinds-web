"use client";

import { useState } from "react";
import { cop, num } from "@/lib/format";
import { Field, Result, cardClass } from "./ui";

export default function AutomationTool() {
  const [people, setPeople] = useState(3);
  const [hoursWeek, setHoursWeek] = useState(6);
  const [hourRate, setHourRate] = useState(35000);
  const [automatable, setAutomatable] = useState(50);

  const annual = people * hoursWeek * 52 * hourRate;
  const ratio = Math.min(Math.max(automatable, 0), 100) / 100;
  const saved = annual * ratio;
  const hoursMonth = people * hoursWeek * 4.33 * ratio;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Personas" value={people} onChange={setPeople} min={1} />
          <Field label="Horas repetidas por semana" value={hoursWeek} onChange={setHoursWeek} suffix="por persona" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Costo de la hora" value={hourRate} onChange={setHourRate} step={1000} suffix="COP" />
          <Field
            label="Qué parte se puede automatizar"
            value={automatable}
            onChange={setAutomatable}
            max={100}
            suffix="%"
            hint="Sé conservador: copiar, pegar y confirmar es lo primero que se automatiza."
          />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Costo de esas horas al año", value: cop(annual) },
            { label: "Horas liberadas al mes", value: `${num(hoursMonth)} h` },
            { label: "Ahorro potencial al año", value: cop(saved), hi: true },
          ]}
          note="El ahorro es potencial: automatizar también cuesta implementación. La cifra sirve para decidir si vale la pena mirarlo."
        />
        <p className="text-sm leading-relaxed text-slate">
          Casi nunca se automatiza el 100 %. Empieza por lo que pasa todas las semanas y no
          necesita criterio: avisos, registros, seguimientos y copias entre herramientas.
        </p>
      </div>
    </div>
  );
}
