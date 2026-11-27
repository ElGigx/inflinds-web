"use client";

import MerezScript from "@/components/MerezScript";
import { MEREZ_API, MEREZ_INGEST_KEY, PORTAL_PARTNER } from "@/lib/merez";
import { useConsentGranted } from "@/lib/consent";
import { POLICY_VERSION } from "@/lib/policy";

export default function MerezSdk() {
  const granted = useConsentGranted();

  if (!MEREZ_INGEST_KEY || !granted) return null;

  return (
    <MerezScript
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
