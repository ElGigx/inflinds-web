import { Kicker } from "./parts";

const swatches = [
  { name: "brand-100", cls: "bg-brand-100" },
  { name: "brand-300", cls: "bg-brand-300" },
  { name: "brand-600", cls: "bg-brand-600" },
  { name: "brand-800", cls: "bg-brand-800" },
  { name: "night-700", cls: "bg-night-700" },
  { name: "night", cls: "bg-night border border-white/20" },
  { name: "magenta", cls: "bg-magenta" },
  { name: "orange", cls: "bg-orange" },
  { name: "yellow", cls: "bg-yellow" },
];

export function TokenSpecimen() {
  return (
    <div className="bg-night p-6 sm:p-8 text-white">
      <Kicker dark>Tokens · color</Kicker>
      <ul className="mt-4 grid grid-cols-3 gap-x-3 gap-y-4 sm:grid-cols-5">
        {swatches.map((s) => (
          <li key={s.name}>
            <div className={`h-12 w-full ${s.cls}`} aria-hidden="true" />
            <p className="mt-2 font-mono text-[11px] text-slate-300">{s.name}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-white/10 pt-6">
        <Kicker dark>Tokens · tipografía</Kicker>
        <div className="mt-4 space-y-3">
          <p className="font-display font-black text-5xl leading-none">Aa</p>
          <p className="font-display font-black text-2xl leading-tight">Título · Raleway Black</p>
          <p className="text-base text-slate-300">Texto de lectura · Lato Regular, 16 px</p>
          <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-yellow">
            Kicker · 12 px · 0,18 em
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <Kicker dark>Tokens · radios</Kicker>
        <div className="mt-4 flex gap-4">
          {["rounded-md", "rounded-xl", "rounded-3xl"].map((r) => (
            <div key={r} className="text-center">
              <div className={`h-12 w-16 border border-white/40 ${r}`} aria-hidden="true" />
              <p className="mt-2 font-mono text-[11px] text-slate-300">{r.replace("rounded-", "")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const steps = [
  { name: "Diseño", note: "Orquestador · Claude Opus" },
  { name: "Encargo", note: "Autocontenido" },
  { name: "Modelo según costo", note: "Claude Sonnet · Claude Haiku · DeepSeek" },
  { name: "Verificación automática", note: "Tipos, pruebas, contrato, fidelidad" },
  { name: "Revisión", note: "Del diff" },
  { name: "Producción", note: "" },
];

export function AiFlow() {
  return (
    <div className="bg-night p-6 sm:p-8 text-white">
      <Kicker dark>Flujo</Kicker>
      <ol className="mt-4">
        {steps.map((s, i) => (
          <li key={s.name} className="flex items-baseline gap-4 border-t border-white/10 py-3">
            <span className="w-8 shrink-0 font-display font-black text-2xl text-yellow">{i + 1}</span>
            <span>
              <span className="block font-display font-bold">{s.name}</span>
              {s.note && <span className="block text-sm text-slate-300">{s.note}</span>}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 border-t border-white/10 pt-6">
        <Kicker dark>Salida generada por Claude Opus</Kicker>
        <div className="mt-4 space-y-4">
          {[
            { label: "Antes", pct: 96, bar: "bg-white/40" },
            { label: "Ahora", pct: 74, bar: "bg-yellow" },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex justify-between font-display text-xs font-bold uppercase tracking-[0.18em]">
                <span>{b.label}</span>
                <span>{b.pct} %</span>
              </div>
              <div className="mt-2 h-3 w-full bg-white/10">
                <div className={`h-3 ${b.bar}`} style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
