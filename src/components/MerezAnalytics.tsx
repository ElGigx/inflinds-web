"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Latido de medición por VISTA de página.
 *
 * La lógica de red —sendBeacon con text/plain (sin preflight), cookie de visitante
 * anónima, referrer externo— vive ahora en el SDK que carga `MerezSdk`. Aquí solo
 * se dispara `window.Merez.track()` en cada cambio de ruta del router de Next.
 *
 * La PRIMERA vista la mide `Merez.init()` (en MerezSdk) al cargar el SDK, así que
 * se salta el primer render para no contarla dos veces. Las navegaciones SPA no
 * disparan `popstate`, por lo que el SDK por sí solo no las vería: este componente
 * las cubre. Si el SDK aún no cargó, `track()` es un no-op (una vista perdida no
 * rompe nada).
 */
export default function MerezAnalytics() {
  const pathname = usePathname();
  const primera = useRef(true);

  useEffect(() => {
    if (primera.current) {
      primera.current = false;
      return;
    }
    window.Merez?.track();
  }, [pathname]);

  return null;
}
