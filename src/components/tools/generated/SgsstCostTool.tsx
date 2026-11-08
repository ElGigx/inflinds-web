"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function SgsstCostTool() {
  const [empleados, setEmpleados] = useState(10);
  const [nominaMensual, setNominaMensual] = useState(25000000);
  const [horas, setHoras] = useState(8);
  const [tarifaHora, setTarifaHora] = useState(60000);
  const [examenes, setExamenes] = useState(80000);
  const [arlPct, setArlPct] = useState(0.522);
  const [otros, setOtros] = useState(500000);

  const personas = Math.max(0, Math.floor(empleados));
  const nomina = Math.max(0, nominaMensual);
  const costoArl = nomina * 12 * (Math.max(0, arlPct) / 100);
  const costoCapacitacion = personas * Math.max(0, horas) * Math.max(0, tarifaHora);
  const costoExamenes = personas * Math.max(0, examenes);
  const costoOtros = Math.max(0, otros);
  const total = costoArl + costoCapacitacion + costoExamenes + costoOtros;
  const porEmpleado = personas > 0 ? total / personas : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-3`}>
        <Field
          label="Nómina mensual total"
          value={nominaMensual}
          onChange={setNominaMensual}
          step={500000}
          suffix="COP"
          hint="La nómina de un mes; no se deriva del salario mínimo."
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Empleados"
            value={empleados}
            onChange={setEmpleados}
            min={1}
            suffix="personas"
            hint="Personas cubiertas por el SG-SST."
          />
          <Field
            label="Horas de capacitación"
            value={horas}
            onChange={setHoras}
            suffix="al año"
            hint="Por empleado, al año."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Tarifa por hora"
            value={tarifaHora}
            onChange={setTarifaHora}
            step={5000}
            suffix="COP"
            hint="Lo que cuesta la hora de capacitación."
          />
          <Field
            label="Exámenes por empleado"
            value={examenes}
            onChange={setExamenes}
            step={10000}
            suffix="COP"
            hint="Exámenes médicos ocupacionales al año."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="ARL"
            value={arlPct}
            onChange={setArlPct}
            step={0.001}
            max={100}
            suffix="%"
            hint="Referencia: 0,522 % (riesgo I). Confirma con tu contador o con la norma vigente."
          />
          <Field
            label="Otros"
            value={otros}
            onChange={setOtros}
            step={50000}
            suffix="COP"
            hint="EPP, señalización, botiquín, asesoría."
          />
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "ARL anual", value: cop(costoArl) },
            { label: "Capacitación anual", value: cop(costoCapacitacion) },
            { label: "Exámenes médicos", value: cop(costoExamenes) },
            { label: "Otros (EPP y señalización)", value: cop(costoOtros) },
            { label: "Total anual", value: cop(total), hi: true },
            { label: "Costo por empleado", value: cop(porEmpleado) },
          ]}
          note="Es un presupuesto de referencia: el SG-SST depende del nivel de riesgo, del tamaño de la empresa y de las obligaciones que te apliquen. Los costos de las casillas son ejemplos editables; usa tus cotizaciones. Las tarifas y los requisitos cambian con la norma; confirma con tu contador o con tu asesor de seguridad y salud en el trabajo."
        />
        <p className="text-sm leading-relaxed text-slate">
          La ARL se calcula sobre la nómina; la capacitación y los exámenes escalan por persona.
          Por eso el costo por empleado cambia según cómo se reparta la nómina.
        </p>
      </div>
    </div>
  );
}
