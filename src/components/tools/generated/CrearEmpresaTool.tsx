"use client";

import { useState } from "react";
import { cop } from "@/lib/format";
import { Field, Result, cardClass } from "../ui";

export default function CrearEmpresaTool() {
  const [matricula, setMatricula] = useState(350000);
  const [notaria, setNotaria] = useState(250000);
  const [firma, setFirma] = useState(180000);
  const [contador, setContador] = useState(500000);
  const [otros, setOtros] = useState(150000);
  const [capitalInicial, setCapitalInicial] = useState(1000000);
  const [gastosMensuales, setGastosMensuales] = useState(3000000);

  const costos = [matricula, notaria, firma, contador, otros].reduce(
    (total, valor) => total + Math.max(0, valor),
    0,
  );
  const capital = Math.max(0, capitalInicial);
  const constitucion = costos + capital;
  const gastos = Math.max(0, gastosMensuales);
  const capitalTrabajo = gastos * 3;
  const costoTresMeses = constitucion + capitalTrabajo;
  const primerAno = constitucion + gastos * 12;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-3`}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Matrícula mercantil"
            value={matricula}
            onChange={setMatricula}
            step={50000}
            suffix="COP"
            hint="Ejemplo editable: depende de la cámara y del tipo societario."
          />
          <Field
            label="Notaría y escritura"
            value={notaria}
            onChange={setNotaria}
            step={50000}
            suffix="COP"
            hint="Varía por ciudad y por la cuantía de la escritura."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Firma electrónica"
            value={firma}
            onChange={setFirma}
            step={10000}
            suffix="COP"
            hint="Según el proveedor y el tipo de firma."
          />
          <Field
            label="Contador y asesoría"
            value={contador}
            onChange={setContador}
            step={50000}
            suffix="COP"
            hint="Según el alcance de la asesoría."
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Otros"
            value={otros}
            onChange={setOtros}
            step={50000}
            suffix="COP"
            hint="Trámites adicionales o gastos que no encajan arriba."
          />
          <Field
            label="Capital inicial"
            value={capitalInicial}
            onChange={setCapitalInicial}
            step={100000}
            suffix="COP"
            hint="Equipos, inventario o reserva de arranque; no lo mezcles con los gastos mensuales."
          />
        </div>

        <Field
          label="Gastos mensuales"
          value={gastosMensuales}
          onChange={setGastosMensuales}
          step={100000}
          suffix="COP"
          hint="Operación de un mes: arriendo, servicios, nómina."
        />
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Total de constitución", value: cop(constitucion) },
            { label: "Capital de trabajo (3 meses)", value: cop(capitalTrabajo) },
            { label: "Costo con capital de trabajo (3 meses)", value: cop(costoTresMeses), hi: true },
            { label: "Costo total del primer año", value: cop(primerAno) },
          ]}
          note="Las casillas traen valores de ejemplo para que veas la cuenta: cámbialos por lo que te coticen. El capital inicial se suma a la constitución y los gastos mensuales cubren la operación, así que no pongas el mismo dinero en los dos. Los costos cambian por cámara de comercio, ciudad y tipo societario (SAS, Ltda). Es una estimación; confirma los valores y los requisitos con tu contador o con la norma vigente."
        />
        <p className="text-sm leading-relaxed text-slate">
          La constitución y el capital inicial se cubren una vez; el capital de trabajo sostiene la
          operación mientras llegan los primeros ingresos. El costo con capital de trabajo suma los
          tres para que sepas cuánto necesitas antes de abrir.
        </p>
      </div>
    </div>
  );
}
