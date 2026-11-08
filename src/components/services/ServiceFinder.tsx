"use client";

import Link from "next/link";

const problems = [
  {
    id: "whatsapp",
    label: "Vendo por WhatsApp y pierdo pedidos",
    service: "desarrollo",
    title: "Pedidos y catálogo en un solo lugar",
    text: "El problema no es el chat: es que el pedido vive en la conversación. Se monta catálogo, pedido y cobro para que el chat sea el canal, no el sistema.",
    cta: "Ver desarrollo",
  },
  {
    id: "convierte",
    label: "Mi sitio no convierte",
    service: "diseno",
    title: "La página no explica ni deja decidir",
    text: "Antes de cambiar colores: qué pregunta el cliente, qué le falta para decidir y dónde se pierde. Después, interfaz y copy alineados a esa decisión.",
    cta: "Ver diseño",
  },
  {
    id: "manual",
    label: "El equipo repite lo mismo a mano",
    service: "automatizacion",
    title: "El trabajo manual es el proceso",
    text: "Copiar entre herramientas, avisar por correo, pasar datos a una hoja. Se conectan las piezas y queda un flujo que corre sin que nadie lo empuje.",
    cta: "Ver automatización",
  },
  {
    id: "ia",
    label: "Quiero usar IA, pero con criterio",
    service: "inteligencia-artificial",
    title: "IA donde el criterio humano manda",
    text: "Un asistente que responde con tu catálogo, o que prepara el trabajo para que una persona decida. Sin inventar datos y con verificación.",
    cta: "Ver IA aplicada",
  },
  {
    id: "interno",
    label: "Necesito una plataforma interna",
    service: "desarrollo",
    title: "El sistema que tu operación ya tiene en la cabeza",
    text: "Paneles, permisos, historial y reportes sobre los datos que ya usas. Lo construimos sobre Merez o a la medida, según lo que cueste sostenerlo.",
    cta: "Ver desarrollo",
  },
  {
    id: "rumbo",
    label: "No sé por dónde empezar",
    service: "consultoria",
    title: "Primero el rumbo, después el código",
    text: "Diagnóstico corto: qué duele, qué se puede resolver sin desarrollo y qué sí exige construirlo. Con prioridades y costos, no con una lista de deseos.",
    cta: "Ver consultoría",
  },
];

export default function ServiceFinder() {
  return (
    <div className="rounded-3xl border border-line bg-white p-5 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl font-black text-ink">¿Qué te está pasando?</h2>
        <p className="text-xs text-slate">Elige lo que más se parezca. Te dice por dónde entrar.</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {problems.map((problem) => (
          <a
            key={problem.id}
            href={`#${problem.service}`}
            className="rounded-full border border-line bg-paper-soft px-3.5 py-2 text-xs font-bold text-ink transition hover:border-magenta hover:text-magenta"
          >
            {problem.label}
          </a>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => (
          <article key={problem.id} className="rounded-2xl border border-line p-4 transition hover:border-magenta">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-magenta">{problem.label}</p>
            <h3 className="mt-2 font-display text-base font-bold leading-tight text-ink">{problem.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate">{problem.text}</p>
            <Link href={`#${problem.service}`} className="mt-3 inline-block text-xs font-bold text-magenta hover:underline">
              {problem.cta} →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
