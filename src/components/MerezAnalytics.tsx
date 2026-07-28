"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Latido de medición de Merez: un POST por cada vista de página.
 *
 * Es el prototipo de lo que hará el SDK de navegador, así que sigue sus reglas:
 *
 *  - `sendBeacon` con un Blob `text/plain`. No lleva cabeceras propias ni un
 *    content-type "no simple", así que NO dispara preflight de CORS. Eso es lo que
 *    permite medir desde un sitio estático sin declarar su origen en el backend, y
 *    además sobrevive al cierre de la pestaña.
 *  - La clave de ingest es PÚBLICA (`NEXT_PUBLIC_`), como el measurement ID de
 *    GA4. Solo sirve para insertar una visita, y el backend únicamente la acepta
 *    desde los orígenes declarados en la propia clave.
 *  - El visitante se identifica con un id anónimo de cookie propia. Sin PII, sin
 *    fingerprinting y sin cookies de terceros.
 *
 * Sin clave configurada no hace nada: en local y en un despliegue sin configurar
 * queda callado en vez de fallar.
 */

const API = process.env.NEXT_PUBLIC_MEREZ_API_URL ?? "https://api.merez.co/api";
const KEY = process.env.NEXT_PUBLIC_MEREZ_INGEST_KEY ?? "";
const COOKIE = "merez_vid";

/** Id anónimo del visitante, en cookie propia a un año. */
function visitorId(): string {
  const actual = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (actual) return actual;

  const nuevo =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2) + Date.now().toString(36);

  document.cookie = `${COOKIE}=${nuevo}; path=/; max-age=31536000; SameSite=Lax`;

  return nuevo;
}

/**
 * El referrer solo cuenta si viene de FUERA: una navegación interna no es una
 * fuente de tráfico, y contarla llenaría el informe con el propio dominio.
 */
function referrerExterno(): string | undefined {
  const ref = document.referrer;
  if (!ref) return undefined;
  try {
    return new URL(ref).host === location.host ? undefined : ref;
  } catch {
    return undefined;
  }
}

export default function MerezAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!KEY) return;

    const cuerpo = JSON.stringify({
      site_key: KEY,
      visitor_id: visitorId(),
      path: pathname,
      referrer: referrerExterno(),
    });

    const url = `${API}/track`;
    const blob = new Blob([cuerpo], { type: "text/plain;charset=UTF-8" });

    if (!navigator.sendBeacon?.(url, blob)) {
      // Respaldo si el navegador no tiene beacon o lo rechaza (cola llena).
      // `keepalive` para que la petición sobreviva a la navegación.
      fetch(url, {
        method: "POST",
        body: cuerpo,
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        keepalive: true,
        mode: "no-cors",
      }).catch(() => {
        // Medir nunca debe romper la página.
      });
    }
  }, [pathname]);

  return null;
}
