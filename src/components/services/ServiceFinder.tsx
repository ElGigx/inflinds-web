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
  {
    id: "visibilidad",
    label: "No aparezco ni en Google ni en los asistentes",
    service: "seo-geo",
    title: "Existir no es aparecer",
    text: "Rastreo, canónicos, datos estructurados y contenido con fuente. La misma base sirve para el buscador y para la respuesta de una IA.",
    cta: "Ver visibilidad",
  },
];

export default function ServiceFinder() {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <span className="inline-block rounded-md bg-yellow px-2.5 py-1 font-display text-xs font-bold uppercase tracking-[0.18em] text-ink">
          Diagnóstico
        </span>
        <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">
          ¿Qué te está pasando?
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate">
          Elige lo que más se parezca. Te dice por dónde entrar.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate">
          Siete problemas típicos. Si el tuyo no está en la lista, se parece a alguno.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {problems.map((problem, index) => {
          const wide = index === problems.length - 1;
          return (
            <article
              key={problem.id}
              className={`rounded-2xl border p-5 transition ${
                wide
                  ? "border-night bg-night text-white sm:col-span-2"
                  : "border-line bg-white hover:border-magenta"
              }`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-[0.12em] ${
                  wide ? "text-yellow" : "text-magenta"
                }`}
              >
                {problem.label}
              </p>
              <h3
                className={`mt-2 font-display text-lg font-black leading-tight ${
                  wide ? "text-white" : "text-ink"
                }`}
              >
                {problem.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  wide ? "text-slate-300" : "text-slate"
                }`}
              >
                {problem.text}
              </p>
              <Link
                href={`#${problem.service}`}
                className={`mt-3 inline-block text-sm font-bold hover:underline ${
                  wide ? "text-yellow" : "text-magenta"
                }`}
              >
                {problem.cta} →
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
