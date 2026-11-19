import { methodology } from "@/lib/site";

const stages = [
  {
    number: "01",
    title: "Entender",
    desc: "Qué duele, qué se puede resolver sin construir y qué sí exige un proyecto.",
    deliverable: "Brief, alcance y prioridades.",
    phases: methodology.slice(0, 3),
  },
  {
    number: "02",
    title: "Diseñar",
    desc: "La solución antes de escribir código: arquitectura, flujos y pantallas.",
    deliverable: "Arquitectura, prototipo y UI.",
    phases: methodology.slice(3, 6),
  },
  {
    number: "03",
    title: "Construir",
    desc: "Código, pruebas y puesta en producción con entregas que se pueden revisar.",
    deliverable: "Producto en producción.",
    phases: methodology.slice(6, 8),
  },
  {
    number: "04",
    title: "Evolucionar",
    desc: "Medición, soporte y nuevas funciones cuando el negocio cambia.",
    deliverable: "Soporte y siguiente iteración.",
    phases: methodology.slice(8, 10),
  },
];

export default function ProcessStrip() {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((stage) => (
        <li
          key={stage.number}
          className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <span className="font-display text-4xl font-black leading-none text-yellow">
            {stage.number}
          </span>
          <h3 className="mt-4 font-display text-xl font-black text-white">{stage.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{stage.desc}</p>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-yellow">
              Te queda
            </p>
            <p className="mt-1 text-sm text-slate-300">{stage.deliverable}</p>
          </div>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {stage.phases.map((phase) => (
              <li
                key={phase.n}
                className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
              >
                {phase.name}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
