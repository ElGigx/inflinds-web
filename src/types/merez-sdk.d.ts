// Tipos del SDK de navegador de Merez (merez.js), cargado desde cdn.merez.co.
// Solo lo que inflinds-web consume de `window.Merez`; el contrato completo vive en
// el repo merez-js.

interface MerezLeadFields {
  type?: "contact" | "quote" | "maintenance" | "newsletter" | "email" | "order" | "whatsapp";
  name?: string;
  company?: string | null;
  email?: string;
  phone?: string;
  [extra: string]: unknown;
}

interface MerezSdk {
  /** Fija la clave de ingest y la base de la API; mide la primera vista. */
  init(cfg: { key: string; api?: string }): void;
  /** Latido de la vista actual. No reintenta. */
  track(): void;
  /** Envía un lead. Devuelve la respuesta del backend (200 al crear). */
  lead(fields?: MerezLeadFields): Promise<Response>;
}

interface Window {
  Merez?: MerezSdk;
}
