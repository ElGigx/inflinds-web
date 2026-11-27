"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  closePreferences,
  setConsent,
  useConsentStatus,
  usePreferencesOpen,
} from "@/lib/consent";

const BUTTON =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-ink bg-ink px-5 py-2 text-sm font-bold text-white transition hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:min-w-32 sm:flex-none";

export default function ConsentBanner() {
  const status = useConsentStatus();
  const reopened = usePreferencesOpen();
  const dialogRef = useRef<HTMLDivElement>(null);
  const visible = status === "unset" || (reopened && status !== "pending");

  useEffect(() => {
    if (reopened && status !== "unset") dialogRef.current?.focus();
  }, [reopened, status]);

  useEffect(() => {
    if (!visible || status === "unset") return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closePreferences();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, status]);

  if (!visible) return null;

  const current =
    status === "accepted"
      ? "Hoy tienes aceptadas las cookies y las herramientas de medición y publicidad."
      : status === "rejected"
        ? "Hoy tienes rechazadas las cookies y las herramientas de medición y publicidad."
        : null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      tabIndex={-1}
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 outline-none sm:px-5 sm:pb-5"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-line bg-white p-4 shadow-xl sm:flex-row sm:items-center sm:gap-5 sm:p-5">
        <div className="min-w-0 flex-1">
          <p id="consent-title" className="text-sm font-bold text-ink">
            Cookies y publicidad
          </p>
          <p id="consent-text" className="mt-1 text-xs leading-relaxed text-ink-700 sm:text-sm">
            Usamos cookies y herramientas de medición y publicidad para saber qué
            campañas funcionan y mostrarte anuncios. Solo se activan si aceptas;
            puedes cambiar de opinión cuando quieras.{" "}
            <Link href="/privacy/" className="font-semibold text-ink underline underline-offset-2">
              Política de datos
            </Link>
            .{current ? ` ${current}` : ""}
          </p>
        </div>
        <div className="flex gap-2 sm:flex-none">
          <button type="button" className={BUTTON} onClick={() => setConsent("accepted")}>
            Aceptar
          </button>
          <button type="button" className={BUTTON} onClick={() => setConsent("rejected")}>
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
