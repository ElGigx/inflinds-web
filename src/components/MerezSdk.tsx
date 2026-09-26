"use client";

import Script from "next/script";
import { MEREZ_API, MEREZ_INGEST_KEY, MEREZ_SDK_URL } from "@/lib/merez";

export default function MerezSdk() {
  if (!MEREZ_INGEST_KEY) return null;

  return (
    <Script
      id="merez-sdk"
      src={MEREZ_SDK_URL}
      strategy="afterInteractive"
      onReady={() => window.Merez?.init({ key: MEREZ_INGEST_KEY, api: MEREZ_API })}
    />
  );
}
