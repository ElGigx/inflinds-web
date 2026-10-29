import { Container, SectionHeading } from "@/components/ui";
import { agents, merezFeatures, memoryPoints, riskLevels, toolGroups } from "../_data";
import type { Feature } from "../_data";
import { Kicker } from "./parts";

function Shot({ f }: { f: Feature }) {
  return (
    <div className="relative pb-6">
      <img
        src={f.image.src}
        alt={f.image.alt}
        width={f.image.w}
        height={f.image.h}
        loading="lazy"
        className="h-auto w-full border border-white/10"
      />
      {f.phone && (
        <img
          src={f.phone.src}
          alt={f.phone.alt}
          width={f.phone.w}
          height={f.phone.h}
          loading="lazy"
          className={`absolute bottom-0 right-3 h-auto border border-white/20 shadow-lg ${
            f.large ? "w-[24%]" : "w-[20%]"
          }`}
        />
      )}
    </div>
  );
}

function FeatureRow({ f, index }: { f: Feature; index: number }) {
  const flip = index % 2 === 1;
  const text = (
    <div className={f.large ? "grid gap-x-12 gap-y-4 lg:grid-cols-[1fr_1.4fr]" : ""}>
      <div>
        <Kicker dark>{f.kicker}</Kicker>
        <h4
          className={`mt-3 font-display font-black leading-tight text-white ${
            f.large ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl"
          }`}
        >
          {f.title}
        </h4>
      </div>
      <div className="space-y-3 text-slate-300 leading-relaxed">
        {f.body.map((b) => (
          <p key={b}>{b}</p>
        ))}
      </div>
    </div>
  );

  if (f.large) {
    return (
      <div className="border-t border-white/10 py-12">
        {text}
        <div className="mt-8">
          <Shot f={f} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid items-center gap-8 border-t border-white/10 py-12 lg:grid-cols-2 lg:gap-14">
      <div className={`order-last ${flip ? "lg:order-2" : "lg:order-none"}`}>
        <Kicker dark>{f.kicker}</Kicker>
        <h4 className="mt-3 font-display font-black text-2xl sm:text-3xl leading-tight text-white">{f.title}</h4>
        <div className="mt-4 space-y-3 text-slate-300 leading-relaxed">
          {f.body.map((b) => (
            <p key={b}>{b}</p>
          ))}
        </div>
      </div>
      <div className={`min-w-0 ${flip ? "lg:order-1" : ""}`}>
        <Shot f={f} />
      </div>
    </div>
  );
}

export default function MerezInside() {
  return (
    <section id="merez-por-dentro" className="scroll-mt-24 bg-night py-16 sm:py-24">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Merez por dentro"
          title="El producto, pantalla por pantalla"
          intro="Lo que hay detrás del caso: la interfaz, los agentes y la memoria que los une."
        />

        <div className="mt-10">
          {merezFeatures.map((f, i) => (
            <FeatureRow key={f.id} f={f} index={i} />
          ))}
        </div>

        <div className="border-t border-white/10 pt-14">
          <Kicker dark>Agentes con herramientas</Kicker>
          <div className="mt-6 flex flex-wrap gap-x-14 gap-y-6">
            <p>
              <span className="block font-display font-black text-7xl leading-none text-yellow">31</span>
              <span className="mt-2 block text-slate-300">herramientas</span>
            </p>
            <p>
              <span className="block font-display font-black text-7xl leading-none text-yellow">5</span>
              <span className="mt-2 block text-slate-300">niveles de riesgo</span>
            </p>
          </div>

          <ul className="mt-10 grid sm:grid-cols-3 sm:gap-8">
            {agents.map((a) => (
              <li key={a.name} className="border-t border-white/10 py-5">
                <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-yellow">{a.role}</p>
                <p className="mt-1 font-display font-black text-3xl text-white">{a.name}</p>
                <p className="mt-2 text-slate-300">{a.text}</p>
              </li>
            ))}
          </ul>

          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {toolGroups.map((g) => (
              <li key={g.name} className="border-t border-white/10 py-5">
                <p className="font-display font-bold text-xs uppercase tracking-[0.18em] text-yellow">{g.name}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-white/10 pt-6">
            <Kicker dark>Cómo deciden</Kicker>
            <ol className="-mx-5 mt-4 flex overflow-x-auto px-5 pb-1 lg:grid lg:grid-cols-5">
              {riskLevels.map((r, i) => (
                <li key={r} className="min-w-[10rem] shrink-0 border-l border-white/10 pl-4 pr-4 lg:min-w-0">
                  <span className="font-display font-black text-2xl text-yellow">{i + 1}</span>
                  <span className="mt-1 block font-display font-bold text-white">{r}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white">
              Leer es libre; todo lo que escribe se propone y una persona lo aprueba en el mismo chat. Si alguien
              pega una contraseña o una llave, se rechaza antes de llegar al modelo.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-10">
          <Kicker dark>Memoria por ficha</Kicker>
          <ul className="mt-4 grid gap-x-8 md:grid-cols-3">
            {memoryPoints.map((m) => (
              <li key={m} className="border-t border-white/10 py-4 text-slate-300 leading-relaxed">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
