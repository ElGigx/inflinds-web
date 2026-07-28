"use client";

import { useState, type FormEvent } from "react";
import { projectTypes } from "@/lib/site";

/**
 * Formulario de contacto.
 *
 * Envía cada solicitud como lead al CRM propio (Merez) vía
 * POST {NEXT_PUBLIC_MEREZ_API_URL}/leads, con la CLAVE DE INGEST del sitio
 * (`NEXT_PUBLIC_MEREZ_INGEST_KEY`) dentro del cuerpo — la misma que usa
 * MerezAnalytics para el latido de visitas.
 *
 * ⚠️ Antes iba con el token de Sitio en una cabecera `Authorization`, y eso
 * estaba MAL: `NEXT_PUBLIC_` incrusta el valor en el bundle que descarga
 * cualquier visitante, así que el token —con habilidades `*`— quedaba publicado
 * en el JavaScript de inflinds.com. La clave de ingest está HECHA para ser
 * pública: solo autoriza lo que su lista de habilidades diga (aquí, `leads`),
 * solo desde los orígenes declarados, y se puede revocar y rotar desde el panel
 * sin tocar el token del sitio.
 *
 * Regla que sigue en pie: nada que no pueda leer un visitante va en una variable
 * `NEXT_PUBLIC_`.
 */

const MEREZ_API_URL = process.env.NEXT_PUBLIC_MEREZ_API_URL ?? "https://api.merez.co/api";
const MEREZ_INGEST_KEY = process.env.NEXT_PUBLIC_MEREZ_INGEST_KEY ?? "";

type FormState = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-xl border border-line bg-paper-soft px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("submitting");

    try {
      const res = await fetch(`${MEREZ_API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // La credencial va en el CUERPO, no en una cabecera: es lo que permite
          // que el mismo endpoint lo llame un SDK de navegador. El backend la
          // excluye antes de volcar el resto del formulario en `form_data`.
          site_key: MEREZ_INGEST_KEY,
          // Claves en INGLÉS (etapa 3 de ADR-006, en producción desde 2026-07-27).
          // "type" para Merez es el CANAL del lead, no el tipo de proyecto.
          //
          // ⚠️ Solo se traducen las claves que el backend reconoce como campos
          // directos (type, name, company, email, phone). El resto NO se toca:
          // LeadController::store() vuelca todo lo que no reconoce en form_data,
          // así que `tipo_proyecto` y `mensaje` son DATOS guardados con esa
          // clave — traducirlos cambiaría lo que queda en la base de datos y
          // rompería a quien los lea. El VALOR "contacto" tampoco se traduce:
          // es un enum en español a propósito.
          type: "contacto",
          name: data.get("nombre"),
          email: data.get("email"),
          company: data.get("empresa") || null,
          tipo_proyecto: data.get("tipo"),
          mensaje: data.get("mensaje"),
        }),
      });

      if (!res.ok) throw new Error(`Merez respondió ${res.status}`);
      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <div className="mx-auto h-14 w-14 rounded-full bg-gradient-brand grid place-items-center text-white text-2xl font-black">
          ✓
        </div>
        <h2 className="mt-5 font-display font-black text-2xl text-ink">¡Mensaje recibido!</h2>
        <p className="mt-3 text-slate leading-relaxed max-w-sm mx-auto">
          Gracias por escribirnos. Revisaremos tu solicitud y te contactaremos pronto para conversar
          sobre tu proyecto.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 inline-flex items-center rounded-xl border-2 border-brand-200 bg-white px-5 py-2.5 font-bold text-brand-600 transition-colors hover:bg-brand-50"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <h2 className="font-display font-black text-xl text-ink">Escríbenos</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-ink mb-1.5">
            Nombre <span className="text-magenta">*</span>
          </label>
          <input id="nombre" name="nombre" type="text" required autoComplete="name" className={fieldBase} placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1.5">
            Correo <span className="text-magenta">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldBase} placeholder="tucorreo@empresa.com" />
        </div>
      </div>

      <div>
        <label htmlFor="empresa" className="block text-sm font-semibold text-ink mb-1.5">
          Empresa <span className="text-muted font-normal">(opcional)</span>
        </label>
        <input id="empresa" name="empresa" type="text" autoComplete="organization" className={fieldBase} placeholder="Nombre de tu empresa" />
      </div>

      <div>
        <label htmlFor="tipo" className="block text-sm font-semibold text-ink mb-1.5">
          Tipo de proyecto <span className="text-magenta">*</span>
        </label>
        <select id="tipo" name="tipo" required defaultValue="" className={fieldBase}>
          <option value="" disabled>
            Selecciona una opción
          </option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-semibold text-ink mb-1.5">
          Mensaje <span className="text-magenta">*</span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          className={fieldBase}
          placeholder="Cuéntanos qué necesitas, en qué punto estás y qué objetivo persigues."
        />
      </div>

      {state === "error" && (
        <p
          role="alert"
          className="rounded-xl border border-magenta/30 bg-magenta/5 px-4 py-3 text-sm text-magenta"
        >
          No pudimos enviar tu mensaje. Inténtalo de nuevo en unos minutos o
          escríbenos directamente.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full inline-flex items-center justify-center rounded-xl bg-magenta px-6 py-3.5 font-bold text-white shadow-sm transition-all hover:bg-magenta-600 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "submitting" ? "Enviando…" : "Enviar mensaje"}
      </button>

      <p className="text-xs text-muted leading-relaxed">
        Al enviar, aceptas que Inflinds use tus datos para responder tu solicitud. No compartimos tu
        información con terceros.
      </p>
    </form>
  );
}
