"use client";

import Script from "next/script";
import { MEREZ_API, MEREZ_INGEST_KEY, MEREZ_SDK_URL, PORTAL_PARTNER } from "@/lib/merez";
import { POLICY_VERSION } from "@/lib/policy";

export default function MerezSdk() {
  if (!MEREZ_INGEST_KEY) return null;

  return (
    <Script
      id="merez-sdk"
      src={MEREZ_SDK_URL}
      strategy="afterInteractive"
      onReady={() =>
        window.Merez?.init({
          key: MEREZ_INGEST_KEY,
          api: MEREZ_API,
          chat: {
            partner: PORTAL_PARTNER,
            title: "Inflinds",
            greeting: "Hola, soy el asistente de Inflinds. Cuéntame qué necesitas: tu sitio web, vender en línea o ayuda con tu servicio.",
            policyUrl: "/privacy/",
            policyVersion: POLICY_VERSION,
          },
        })
      }
    />
  );
}
