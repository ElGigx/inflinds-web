"use client";

import Script from "next/script";
import { MEREZ_SDK_URL } from "@/lib/merez";

export default function MerezScript({ onReady }: { onReady?: () => void }) {
  return <Script id="merez-sdk" src={MEREZ_SDK_URL} strategy="afterInteractive" onReady={onReady} />;
}
