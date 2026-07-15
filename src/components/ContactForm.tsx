"use client";

import { useState, type FormEvent } from "react";
import { projectTypes } from "@/lib/site";

/**
 * Formulario de contacto.
 *
 * IMPORTANTE (pendiente / follow-up): todavía NO existe un endpoint backend.
 * Este formulario funciona 100% en el cliente: valida, simula el envío y muestra
 * un estado de éxito. Para ponerlo en producción hay que conectar `handleSubmit`
 * a un canal real, por ejemplo:
 *   - una función/Worker de Cloudflare Pages (POST a /api/contacto), o
 *   - un servicio de formularios (Formspree, Web3Forms, etc.), o
 *   - el CRM propio (Merez) vía su API.
 * Mientras tanto, los datos NO se envían a ningún lado.
 */

type FormState = "idle" | "submitting" | "success";

const fieldBase =
  "w-full rounded-xl border border-line bg-paper-soft px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    // TODO (follow-up): reemplazar esta simulación por un envío real.
    // Aquí solo simulamos latencia de red y pasamos al estado de éxito.
    setTimeout(() => setState("success"), 700);
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
