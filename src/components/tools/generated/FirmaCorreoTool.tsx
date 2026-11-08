"use client";

import { useState } from "react";
import { num } from "@/lib/format";
import { Result, cardClass } from "../ui";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20";

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

export default function FirmaCorreoTool() {
  const [form, setForm] = useState({
    name: "Ana Torres",
    role: "Gerente comercial",
    company: "Tu empresa",
    phone: "+57 300 123 4567",
    email: "ana@tuempresa.com",
    website: "tuempresa.com",
  });
  const [copied, setCopied] = useState(false);

  const signature = [
    form.name.trim(),
    [form.role.trim(), form.company.trim()].filter(Boolean).join(" · "),
    form.phone.trim(),
    form.email.trim(),
    form.website.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(signature);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Nombre"
            value={form.name}
            onChange={(value) => setForm({ ...form, name: value })}
          />
          <TextField
            label="Cargo"
            value={form.role}
            onChange={(value) => setForm({ ...form, role: value })}
          />
          <TextField
            label="Empresa"
            value={form.company}
            onChange={(value) => setForm({ ...form, company: value })}
          />
          <TextField
            label="Teléfono"
            value={form.phone}
            onChange={(value) => setForm({ ...form, phone: value })}
          />
          <TextField
            label="Correo"
            value={form.email}
            onChange={(value) => setForm({ ...form, email: value })}
          />
          <TextField
            label="Sitio web"
            value={form.website}
            onChange={(value) => setForm({ ...form, website: value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className={`${cardClass} space-y-3`}>
          <span className="text-sm font-semibold text-ink">Firma en texto plano</span>
          <pre className="whitespace-pre-wrap rounded-xl border border-line bg-paper-soft p-4 text-sm leading-relaxed text-ink">
            {signature || "—"}
          </pre>
          <button
            type="button"
            onClick={copy}
            disabled={!signature}
            className="w-full rounded-xl bg-night px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "Copiado" : "Copiar firma"}
          </button>
        </div>

        <Result
          items={[
            { label: "Nombre en la firma", value: form.name.trim() || "—", hi: true },
            { label: "Caracteres", value: num(signature.length) },
          ]}
          note="Es texto plano: no lleva logo, colores ni enlaces con formato. Cada cliente de correo decide si convierte el sitio en un enlace, y algunos lo dejan tal cual."
        />
        <p className="text-sm leading-relaxed text-slate">
          Una firma corta se lee mejor en el móvil. Si el cargo y la empresa caben en una línea, no
          los separes: el correo ya de por sí tiene poco espacio.
        </p>
      </div>
    </div>
  );
}
