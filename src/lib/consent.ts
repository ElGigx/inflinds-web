import { useSyncExternalStore } from "react";
import { POLICY_VERSION } from "@/lib/policy";

export type ConsentChoice = "accepted" | "rejected";
export type ConsentStatus = "pending" | "accepted" | "rejected" | "unset";

type ConsentRecord = {
  choice: ConsentChoice;
  at: string;
  policy: string;
};

const CONSENT_STORAGE_NAME = "inflinds.consent.v1";
const COOKIE_NAME = "inflinds_consent";
const COOKIE_MAX_AGE = 183 * 24 * 60 * 60;
const CHANGE_EVENT = "inflinds:consent-change";

const TRACKING_COOKIES = [
  "_fbp",
  "_fbc",
  "merez_vid",
  "merez_attr",
  "_ga",
  "_gid",
  "_gcl_au",
  "_gcl_aw",
  "_ttp",
  "_tt_enable_cookie",
  "_uetsid",
  "_uetvid",
  "_uetmsclkid",
  "MUID",
];

const TRACKING_COOKIE_PREFIXES = ["_ga_", "_gac_", "_gcl_"];

let preferencesOpen = false;
let cachedRaw: string | null | undefined;
let cachedRecord: ConsentRecord | null = null;

function isRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    (record.choice === "accepted" || record.choice === "rejected") &&
    typeof record.at === "string" &&
    typeof record.policy === "string"
  );
}

function parseRecord(raw: string | null): ConsentRecord | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function readCookieRaw(): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return null;
  }
}

function readStorageRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_NAME);
  } catch {
    return null;
  }
}

function readRecord(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  const raw = readStorageRaw() ?? readCookieRaw();
  if (raw === cachedRaw) return cachedRecord;
  cachedRaw = raw;
  cachedRecord = parseRecord(raw);
  return cachedRecord;
}

export function getConsentStatus(): ConsentStatus {
  const record = readRecord();
  if (!record || record.policy !== POLICY_VERSION) return "unset";
  return record.choice;
}

export function hasConsent(): boolean {
  return typeof window !== "undefined" && getConsentStatus() === "accepted";
}

function notify(): void {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function expireCookie(name: string): void {
  const parts = window.location.hostname.split(".");
  const domains = [""];
  for (let index = 0; index < parts.length - 1; index += 1) {
    const domain = parts.slice(index).join(".");
    domains.push(`;domain=${domain}`, `;domain=.${domain}`);
  }
  for (const domain of domains) {
    document.cookie = `${name}=;path=/;max-age=0;expires=Thu, 01 Jan 1970 00:00:00 GMT${domain}`;
  }
}

export function clearTrackingCookies(): void {
  if (typeof document === "undefined") return;
  const names = new Set(TRACKING_COOKIES);
  for (const entry of document.cookie.split("; ")) {
    const name = entry.split("=")[0];
    if (name && TRACKING_COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix))) {
      names.add(name);
    }
  }
  names.forEach(expireCookie);
}

export function setConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  const wasAccepted = getConsentStatus() === "accepted";
  const record: ConsentRecord = {
    choice,
    at: new Date().toISOString(),
    policy: POLICY_VERSION,
  };
  const raw = JSON.stringify(record);
  try {
    window.localStorage.setItem(CONSENT_STORAGE_NAME, raw);
  } catch {
    cachedRaw = undefined;
  }
  const secure = window.location.protocol === "https:" ? ";Secure" : "";
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(raw)};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax${secure}`;
  preferencesOpen = false;
  if (choice === "rejected") {
    clearTrackingCookies();
    if (wasAccepted) {
      window.location.reload();
      return;
    }
  }
  notify();
}

export function openPreferences(): void {
  if (typeof window === "undefined") return;
  preferencesOpen = true;
  notify();
}

export function closePreferences(): void {
  if (typeof window === "undefined") return;
  preferencesOpen = false;
  notify();
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getServerStatus(): ConsentStatus {
  return "pending";
}

export function useConsentStatus(): ConsentStatus {
  return useSyncExternalStore(subscribe, getConsentStatus, getServerStatus);
}

export function useConsentGranted(): boolean {
  return useConsentStatus() === "accepted";
}

export function usePreferencesOpen(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => preferencesOpen,
    () => false,
  );
}
