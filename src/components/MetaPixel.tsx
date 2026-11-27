"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useConsentGranted } from "@/lib/consent";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1052833795244543";

const SNIPPET = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https:'+'//connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`;

export default function MetaPixel() {
  const pathname = usePathname();
  const granted = useConsentGranted();
  const tracked = useRef<string | null>(null);

  useEffect(() => {
    if (!PIXEL_ID || !granted) {
      tracked.current = null;
      return;
    }
    if (tracked.current === null) {
      tracked.current = pathname;
      return;
    }
    if (tracked.current !== pathname) {
      tracked.current = pathname;
      window.fbq?.("track", "PageView");
    }
  }, [pathname, granted]);

  if (!PIXEL_ID || !granted) {
    return null;
  }

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {SNIPPET}
    </Script>
  );
}
