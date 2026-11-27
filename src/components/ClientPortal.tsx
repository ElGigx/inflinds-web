"use client";

import { useEffect, useRef } from "react";
import MerezScript from "@/components/MerezScript";
import { MEREZ_API } from "@/lib/merez";

const WAIT_MS = 200;
const MAX_TRIES = 75;

export default function ClientPortal({ partner }: { partner: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      if (root.current && window.Merez?.mountPortal) {
        window.Merez.mountPortal(root.current, { partner, api: MEREZ_API });
        window.clearInterval(timer);
      } else if (tries >= MAX_TRIES) {
        window.clearInterval(timer);
        if (root.current) {
          root.current.textContent = "No pudimos cargar el área de clientes. Recarga la página en un momento.";
        }
      }
    }, WAIT_MS);
    return () => window.clearInterval(timer);
  }, [partner]);

  return (
    <>
      <MerezScript />
      <div ref={root} className="client-portal" />
    </>
  );
}
