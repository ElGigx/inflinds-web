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

export default function ProcessStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {methodology.map((step, i) => (
        <li
          key={step.n}
          className={`rounded-2xl border p-4 ${
            dark ? "border-white/10 bg-white/5" : "border-line bg-white"
          }`}
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              dark ? "bg-white/5 text-magenta" : "bg-paper-soft text-magenta"
            }`}
          >
            <Icon name={stepIcons[i]} className="h-4 w-4" />
          </span>
          <p
            className={`mt-3 font-display text-[10px] font-bold tracking-widest ${
              dark ? "text-slate-400" : "text-slate"
            }`}
          >
            {String(step.n).padStart(2, "0")}
          </p>
          <p className={`mt-1 text-sm font-bold leading-tight ${dark ? "text-white" : "text-ink"}`}>
            {step.name}
          </p>
        </li>
      ))}
    </ol>
  );
}
