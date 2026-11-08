"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import ToolMark from "./ToolMark";
import { FAMILIES, FAMILY_ORDER, type FamilyKey } from "@/lib/tool-taxonomy";

export type ExplorerTool = {
  slug: string;
  title: string;
  eyebrow: string;
  promise: string;
  description: string;
  minutes: number;
  family: FamilyKey;
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function ToolsExplorer({ tools }: { tools: ExplorerTool[] }) {
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState<FamilyKey | "todas">("todas");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && document.activeElement === inputRef.current) {
        setQuery("");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
    return tools.filter((tool) => {
      if (family !== "todas" && tool.family !== family) return false;
      if (terms.length === 0) return true;
      const haystack = normalize(
        [tool.title, tool.promise, tool.description, tool.eyebrow, FAMILIES[tool.family].label, tool.slug].join(" "),
      );
      return terms.every((term) => haystack.includes(term));
    });
  }, [tools, query, family]);

  const grouped = FAMILY_ORDER.map((key) => ({
    key,
    items: results.filter((tool) => tool.family === key),
  })).filter((group) => group.items.length > 0);

  const activeFilter = query.trim() !== "" || family !== "todas";

  return (
    <div>
      {/* Buscador */}
      <div className="rounded-2xl border border-line bg-white p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <Icon name="search" className="h-5 w-5 shrink-0 text-magenta" />
          <label htmlFor="tool-search" className="sr-only">
            Buscar herramienta
          </label>
          <input
            ref={inputRef}
            id="tool-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar: IVA, nómina, retención, WhatsApp, cartera…"
            className="w-full bg-transparent py-2 text-base text-ink outline-none placeholder:text-slate/70"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 rounded-lg border border-line px-2 py-1 text-xs font-semibold text-slate hover:border-magenta hover:text-magenta"
            >
              Limpiar
            </button>
          )}
          <kbd className="hidden shrink-0 rounded-md border border-line bg-paper-soft px-2 py-1 font-mono text-[11px] text-slate sm:block">
            /
          </kbd>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 border-t border-line pt-3">
          <button
            type="button"
            onClick={() => setFamily("todas")}
            aria-pressed={family === "todas"}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
              family === "todas" ? "bg-night text-white" : "bg-paper-soft text-ink hover:bg-line/60"
            }`}
          >
            Todas · {tools.length}
          </button>
          {FAMILY_ORDER.map((key) => {
            const meta = FAMILIES[key];
            const count = tools.filter((tool) => tool.family === key).length;
            const active = family === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFamily(active ? "todas" : key)}
                aria-pressed={active}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                  active ? "bg-night text-white" : `${meta.chip} hover:brightness-95`
                }`}
              >
                <Icon name={meta.icon} className="h-3.5 w-3.5" />
                {meta.label} · {count}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-4 text-sm text-slate" aria-live="polite">
        {results.length} herramienta{results.length === 1 ? "" : "s"}
        {query.trim() && <> para «{query.trim()}»</>}
        {family !== "todas" && <> en {FAMILIES[family].label}</>}
      </p>

      {/* Destacado: la plataforma que recoge lo que la herramienta no guarda */}
      <a
        href="https://www.merez.co/"
        className="mt-4 flex items-center gap-4 rounded-2xl bg-night p-4 text-white transition hover:bg-night-800"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-yellow font-display text-xl font-black text-ink">
          M
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-yellow">Destacado</span>
          <span className="block font-display text-lg font-black leading-tight">Merez · la plataforma</span>
          <span className="block truncate text-xs text-slate-300/80">
            Catálogo, cotizaciones, pedidos y agentes: lo que la calculadora no guarda.
          </span>
        </span>
        <Icon name="external" className="h-5 w-5 shrink-0 text-yellow" />
      </a>

      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-white p-8 text-center">
          <p className="font-display text-lg font-bold text-ink">No hay una herramienta con eso.</p>
          <p className="mt-2 text-sm text-slate">
            Prueba con «IVA», «nómina», «retención» o «WhatsApp». También puedes limpiar el filtro.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFamily("todas");
            }}
            className="mt-4 rounded-xl bg-magenta px-4 py-2 text-sm font-bold text-white"
          >
            Ver todas
          </button>
        </div>
      ) : (
        <div className="mt-2 space-y-8">
          {grouped.map((group) => {
            const meta = FAMILIES[group.key];
            return (
              <section key={group.key} aria-labelledby={`familia-${group.key}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h2
                    id={`familia-${group.key}`}
                    className="inline-flex items-center gap-2 font-display text-lg font-black text-ink"
                  >
                    <span className={`grid h-6 w-6 place-items-center rounded-md ${meta.tile}`}>
                      <Icon name={meta.icon} className="h-3.5 w-3.5" />
                    </span>
                    {meta.label}
                  </h2>
                  <p className="text-xs text-slate">{meta.blurb}</p>
                </div>

                {/* Móvil: carril horizontal. Escritorio: rejilla. */}
                <div
                  className={
                    activeFilter
                      ? "mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
                      : "-mx-5 mt-3 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
                  }
                >
                  {group.items.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}/`}
                      className={`group flex items-center gap-2 rounded-xl border border-line bg-white p-2 transition sm:gap-3 sm:p-2.5 ${meta.hover} ${
                        activeFilter ? "" : "min-w-[152px] snap-start sm:min-w-0"
                      }`}
                    >
                      <ToolMark slug={tool.slug} className="h-9 w-9 sm:h-10 sm:w-10" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-bold leading-tight text-ink group-hover:text-magenta sm:truncate sm:text-sm">
                          {tool.title}
                        </span>
                        <span className="hidden truncate text-[11px] leading-snug text-slate sm:block">
                          {tool.promise}
                        </span>
                      </span>
                      <Icon
                        name="external"
                        className="hidden h-4 w-4 shrink-0 text-slate/60 group-hover:text-magenta sm:block"
                      />
                    </Link>
                  ))}
                </div>

                {!activeFilter && (
                  <p className="mt-1 text-[11px] text-slate sm:hidden">Desliza para ver todas →</p>
                )}
              </section>
            );
          })}
        </div>
      )}

      {activeFilter && results.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setFamily("todas");
          }}
          className="mt-8 text-sm font-semibold text-slate underline underline-offset-2 hover:text-magenta"
        >
          Limpiar búsqueda y ver las {tools.length}
        </button>
      )}
    </div>
  );
}
