"use client";

import { openPreferences } from "@/lib/consent";

export default function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openPreferences}>
      Preferencias de cookies
    </button>
  );
}
