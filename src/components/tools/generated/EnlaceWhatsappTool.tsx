"use client";

import { useState } from "react";
import { Result, cardClass } from "../ui";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-base text-ink outline-none transition focus:border-magenta focus:ring-2 focus:ring-magenta/20";

export default function EnlaceWhatsappTool() {
  const [phone, setPhone] = useState("300 123 4567");
  const [message, setMessage] = useState("Hola, te escribo desde la página. Quiero más información.");
  const [copied, setCopied] = useState(false);

  const digits = phone.replace(/\D/g, "");
  const national =
    digits.length === 12 && digits.startsWith("57")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  const valid = national.length === 10;
  const mobile = valid && national.startsWith("3");
  const formatted = valid
    ? `+57 ${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6)}`
    : "";
  const link = valid
    ? `https://wa.me/57${national}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ""}`
    : "";

  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div className={`${cardClass} space-y-4`}>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Número de WhatsApp</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+57 300 123 4567"
            className={`mt-1.5 ${inputClass}`}
          />
          <span className="mt-1 block text-xs text-slate">
            Acepta espacios, guiones y el +57. Un celular colombiano son 10 dígitos.
          </span>
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-ink">Mensaje prellenado</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            placeholder="Hola, quiero más información."
            className={`mt-1.5 ${inputClass}`}
          />
        </label>

        {phone.trim() !== "" && !mobile && (
          <p className="text-sm leading-relaxed text-magenta">
            {valid
              ? "Son 10 dígitos, pero no empiezan por 3: revisa que sea un celular."
              : "No parece válido: deja 10 dígitos, con o sin +57 y espacios."}
          </p>
        )}

        <div className="space-y-2">
          <span className="text-sm font-semibold text-ink">Enlace</span>
          <input
            readOnly
            value={link}
            placeholder="Completa un número válido."
            className={inputClass}
          />
          <button
            type="button"
            onClick={copy}
            disabled={!valid}
            className="w-full rounded-xl bg-night px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {copied ? "Copiado" : "Copiar enlace"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <Result
          items={[
            { label: "Número", value: formatted || "—", hi: true },
            {
              label: "Estado",
              value: !valid ? "Falta el número" : mobile ? "Listo para copiar" : "Revisa el número",
            },
          ]}
          note="wa.me solo abre el chat: no confirma que el número exista ni que tenga WhatsApp. Las tildes del mensaje viajan codificadas en el enlace."
        />
        <p className="text-sm leading-relaxed text-slate">
          El enlace sirve para un botón del sitio, una campaña o una firma. Escribe el número como
          lo tengas: acá se quitan espacios, guiones y el 57 de más antes de armar la URL.
        </p>
      </div>
    </div>
  );
}
