import Icon from "./Icon";
import { methodology } from "@/lib/site";

const stepIcons = [
  "search",
  "clipboard",
  "flag",
  "layers",
  "layout",
  "pen",
  "code",
  "check",
  "send",
  "trending",
];

// Tira horizontal del proceso de 10 fases: icono en tarjeta blanca,
// conectores punteados (solo en desktop), número y nombre de la fase.
export default function ProcessStrip() {
  return (
    <ol className="grid grid-cols-2 gap-x-2 gap-y-8 sm:grid-cols-5 lg:grid-cols-10">
      {methodology.map((step, i) => (
        <li key={step.n} className="relative text-center">
          {i < methodology.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute top-7 left-[calc(50%+34px)] hidden w-[calc(100%-68px)] border-t-2 border-dotted border-brand-200 lg:block"
            />
          )}
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white shadow-sm text-magenta">
            <Icon name={stepIcons[i]} />
          </span>
          <p className="mt-3 font-display font-black text-xs tracking-widest text-ink">
            {String(step.n).padStart(2, "0")}
          </p>
          <p className="mt-0.5 text-xs font-semibold text-slate">{step.name}</p>
        </li>
      ))}
    </ol>
  );
}
