import { hasConsent } from "@/lib/consent";
import { MEREZ_API, MEREZ_INGEST_KEY } from "@/lib/merez";

export function sendLead(fields: Record<string, unknown>): Promise<Response> {
  if (hasConsent() && window.Merez) {
    return window.Merez.lead(fields);
  }
  if (!MEREZ_INGEST_KEY) {
    return Promise.reject(new Error("missing ingest key"));
  }
  const body = JSON.stringify({
    site_key: MEREZ_INGEST_KEY,
    type: "contact",
    url: window.location.origin + window.location.pathname,
    ...fields,
  });
  return fetch(`${MEREZ_API.replace(/\/$/, "")}/leads`, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body,
    keepalive: true,
  });
}
