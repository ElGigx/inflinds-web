"use client";

import { useState, type FormEvent } from "react";
import { projectTypes } from "@/lib/site";
import { POLICY_VERSION } from "@/lib/policy";

type FormState = "idle" | "submitting" | "success" | "error" | "no-consent";

const fieldBase =
  "w-full rounded-xl border border-line bg-paper-soft px-4 py-3 text-ink placeholder:text-muted focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!window.Merez) {
      setState("error");
      return;
    }

    if (data.get("consent_granted") !== "1") {
      setState("no-consent");
      return;
    }

    setState("submitting");

    try {
      const res = await window.Merez.lead({
        type: "contact",
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: (data.get("company") as string) || null,
        project_type: String(data.get("project_type") ?? ""),
        message: String(data.get("message") ?? ""),
        consent_granted: true,
        marketing_consent: data.get("marketing_consent") === "1",
        consent_policy_version: POLICY_VERSION,
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
          <label htmlFor="name" className="block text-sm font-semibold text-ink mb-1.5">
            Nombre <span className="text-magenta">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldBase} placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1.5">
            Correo <span className="text-magenta">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldBase} placeholder="tucorreo@empresa.com" />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-ink mb-1.5">
          Empresa <span className="text-muted font-normal">(opcional)</span>
        </label>
        <input id="company" name="company" type="text" autoComplete="organization" className={fieldBase} placeholder="Nombre de tu empresa" />
      </div>

      <div>
        <label htmlFor="project_type" className="block text-sm font-semibold text-ink mb-1.5">
          Tipo de proyecto <span className="text-magenta">*</span>
        </label>
        <select id="project_type" name="project_type" required defaultValue="" className={fieldBase}>
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
        <label htmlFor="message" className="block text-sm font-semibold text-ink mb-1.5">
          Mensaje <span className="text-magenta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={fieldBase}
          placeholder="Cuéntanos qué necesitas, en qué punto estás y qué objetivo persigues."
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="consent_granted"
            value="1"
            className="mt-1 h-4 w-4 shrink-0 accent-magenta"
          />
          <span>
            Autorizo a Inflinds a tratar mis datos para atender esta solicitud, según la{" "}
            <a href="/privacy" target="_blank" rel="noopener" className="font-semibold underline">
              Política de Privacidad
            </a>
            .
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm text-ink">
          <input
            type="checkbox"
            name="marketing_consent"
            value="1"
            className="mt-1 h-4 w-4 shrink-0 accent-magenta"
          />
          <span>
            También quiero recibir novedades. <span className="text-muted">Opcional.</span>
          </span>
        </label>
      </div>

      {state === "no-consent" && (
        <p
          role="alert"
          className="rounded-xl border border-magenta/30 bg-magenta/5 px-4 py-3 text-sm text-magenta"
        >
          Para enviar la solicitud necesitamos tu autorización para tratar tus datos.
        </p>
      )}

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
        No compartimos tu información con terceros.
      </p>
    </form>
  );
}
