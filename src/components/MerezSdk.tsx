"use client";

import Script from "next/script";

/**
 * Carga el SDK de navegador de Merez (merez.js) desde el CDN y lo inicializa con
 * la clave de ingest del sitio. A partir de aquí, `MerezAnalytics` (latido por
 * vista) y `ContactForm` (leads) delegan en `window.Merez` en lugar de duplicar la
 * lógica de red (sendBeacon, cookie de visitante, honeypot, text/plain sin
 * preflight). Una sola fuente de verdad, la misma que usan los sitios de clientes.
 *
 * ⚠️ El init es EXPLÍCITO (onLoad), no por `data-merez-key`: el auto-arranque del
 * SDK depende de `document.currentScript`, que con next/script no es fiable. La
 * clave de ingest es pública por diseño (ligada a orígenes de inflinds.com +
 * habilidades track/leads, revocable desde el panel). Sin clave no carga nada.
 */

const API = process.env.NEXT_PUBLIC_MEREZ_API_URL ?? "https://api.merez.co/api/v1";
const KEY = process.env.NEXT_PUBLIC_MEREZ_INGEST_KEY ?? "";

export default function MerezSdk() {
  if (!KEY) return null;

  return (
    <Script
      src="https://cdn.merez.co/merez.js"
      strategy="afterInteractive"
      onLoad={() => window.Merez?.init({ key: KEY, api: API })}
    />
  );
}
