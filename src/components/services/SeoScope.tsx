"use client";

import { useState } from "react";
import Link from "next/link";

const pageOptions = [
  { label: "Hasta 20", value: 20 },
  { label: "21 a 80", value: 50 },
  { label: "81 a 300", value: 150 },
  { label: "Más de 300", value: 400 },
];

const languageOptions = [1, 2, 3];

const platformOptions = [
  { label: "Merez", factor: 1 },
  { label: "WordPress", factor: 1.25 },
  { label: "Next.js", factor: 1.15 },
  { label: "Otra", factor: 1.35 },
];

const scopeOptions = [
  { label: "Solo auditoría", factor: 0.35 },
  { label: "Auditoría + implementación", factor: 1 },
  { label: "Acompañamiento mensual", factor: 1.6 },
];

export default function SeoScope() {
  const [pages, setPages] = useState(50);
  const [languages, setLanguages] = useState(1);
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [scope, setScope] = useState(scopeOptions[1]);

  const base = 12 + pages * 0.35 + (languages - 1) * 8;
  const hours = Math.round(base * platform.factor * scope.factor);
  const low = Math.round(hours * 0.85);
  const high = Math.round(hours * 1.25);
  const days = Math.max(1, Math.round(hours / 6));

  return (
    <div className="rounded-3xl border border-line bg-white p-5 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-2xl font-black text-ink">¿Cuánto trabajo es en tu caso?</h2>
        <p className="text-xs text-slate">Esfuerzo estimado, no una cotización.</p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Páginas del sitio</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {pageOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setPages(option.value)}
                aria-pressed={pages === option.value}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  pages === option.value ? "bg-night text-white" : "bg-paper-soft text-ink hover:bg-line/60"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Idiomas</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {languageOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguages(option)}
                aria-pressed={languages === option}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  languages === option ? "bg-night text-white" : "bg-paper-soft text-ink hover:bg-line/60"
                }`}
              >
                {option === 3 ? "3 o más" : option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Plataforma</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {platformOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setPlatform(option)}
                aria-pressed={platform.label === option.label}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  platform.label === option.label ? "bg-night text-white" : "bg-paper-soft text-ink hover:bg-line/60"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Qué necesitas</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {scopeOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setScope(option)}
                aria-pressed={scope.label === option.label}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  scope.label === option.label ? "bg-night text-white" : "bg-paper-soft text-ink hover:bg-line/60"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl bg-night p-5 text-white sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-xs text-slate-300/80">Esfuerzo estimado</p>
          <p className="font-display text-2xl font-black text-yellow">
            {low} a {high} horas
          </p>
          <p className="mt-1 text-xs text-slate-300/80">
            Alrededor de {days} día{days === 1 ? "" : "s"} de trabajo efectivo. El precio se cierra
            después de la auditoría, con el alcance escrito.
          </p>
        </div>
        <Link
          href="/contact/"
          className="inline-flex items-center justify-center rounded-xl bg-yellow px-5 py-3 text-sm font-bold text-ink"
        >
          Pedir cotización
        </Link>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          {
            name: "Auditoría",
            text: "Rastreo, indexación, canónicos, sitemap, datos estructurados y rendimiento. Sale un informe con prioridades.",
          },
          {
            name: "Implementación",
            text: "Se ejecuta lo que la auditoría marcó: plantillas, schema, enlazado interno, contenido base y medición.",
          },
          {
            name: "Acompañamiento",
            text: "Contenido y medición mes a mes: qué se publica, qué se movió y qué se corrige en el siguiente ciclo.",
          },
        ].map((item) => (
          <div key={item.name} className="rounded-xl border border-line p-4">
            <p className="font-display text-base font-bold text-ink">{item.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate">{item.text}</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-magenta">Se cotiza por alcance</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-slate">
        No hay precio de lista porque el trabajo depende de cuántas páginas haya, en qué plataforma
        estén y cuánto contenido falte. Publicar una cifra antes de mirar el sitio sería inventarla;
        después de la auditoría, el número se sostiene.
      </p>
    </div>
  );
}
