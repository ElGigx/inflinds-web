type Step = {
  name: string;
  outcome: string;
};

export default function ServiceProcess({ steps }: { steps: Step[] }) {
  return (
    <ol className="relative">
      {steps.map((step, index) => (
        <li key={step.name} className="relative flex gap-4 pb-6 last:pb-0">
          {index < steps.length - 1 && (
            <span aria-hidden="true" className="absolute bottom-0 left-5 top-10 w-px bg-line" />
          )}
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-paper font-display text-xs font-black tracking-wide text-magenta">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="pt-1.5">
            <p className="font-display text-sm font-black text-ink">{step.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate">{step.outcome}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
