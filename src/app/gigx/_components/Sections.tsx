import { Container, SectionHeading } from "@/components/ui";
import { logos, pieces, products, sites, timeline } from "../_data";
import { ExternalLink, Kicker } from "./parts";

function Placeholder({ name, ratio = "aspect-[16/10]" }: { name: string; ratio?: string }) {
  return (
    <div className={`mb-4 grid ${ratio} w-full place-items-center border border-line bg-paper-soft`} aria-hidden="true">
      <span className="font-display font-black text-6xl text-line">{name.charAt(0)}</span>
    </div>
  );
}

export function Timeline() {
  return (
    <section id="linea-de-tiempo" className="scroll-mt-24 bg-night py-16 sm:py-24">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Línea de tiempo"
          title="Siete años, de piezas gráficas a un SaaS propio"
        />
        <ol className="mt-12">
          {timeline.map((t) => (
            <li
              key={t.year}
              className="group relative border-l border-white/10 pb-10 pl-8 last:pb-0 lg:w-1/2 lg:odd:border-l-0 lg:odd:border-r lg:odd:pl-0 lg:odd:pr-12 lg:odd:text-right lg:even:ml-auto lg:even:pl-12"
            >
              <span
                className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-yellow lg:group-odd:left-auto lg:group-odd:-right-[5px]"
                aria-hidden="true"
              />
              <p className="font-display font-black text-4xl text-yellow">{t.year}</p>
              <h3 className="mt-1 font-display font-bold text-lg text-white">{t.title}</h3>
              <ul className="mt-3 space-y-1 text-slate-300">
                {t.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Sites() {
  return (
    <section id="sitios" className="scroll-mt-24 py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Sitios"
          title="Sitios y comercio electrónico 2020–2024"
          intro="Lo que ya no está en línea se conserva aquí como registro."
        />
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((s) => (
            <li key={s.name} className="border-t border-line pt-4">
              {!s.image && <Placeholder name={s.name} />}
              {s.image && (
                <img
                  src={s.image.src}
                  alt={`Captura del sitio de ${s.name}`}
                  width={s.image.w}
                  height={s.image.h}
                  loading="lazy"
                  className="mb-4 aspect-[16/10] w-full border border-line object-cover object-top"
                />
              )}
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                {s.year} · {s.type}
              </p>
              <h3 className="mt-1 font-display font-black text-xl text-ink">{s.name}</h3>
              {s.href ? (
                <ExternalLink
                  href={s.href}
                  className="mt-1 inline-block text-sm font-bold text-brand-600 underline-offset-4 hover:underline"
                >
                  Visitar ↗
                </ExternalLink>
              ) : (
                <p className="mt-1 text-sm text-muted">Ya no está en línea</p>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Products() {
  return (
    <section id="producto" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow="Producto" title="Producto y prototipos" />
        <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li key={p.name} className="border-t border-line pt-4">
              {!p.image && <Placeholder name={p.name} ratio="aspect-[4/3]" />}
              {p.image && (
                <img
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.w}
                  height={p.image.h}
                  loading="lazy"
                  className="mb-4 aspect-[4/3] w-full border border-line object-cover object-top"
                />
              )}
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-600">
                {p.years} · {p.type}
              </p>
              <h3 className="mt-1 font-display font-black text-xl text-ink">{p.name}</h3>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Design() {
  return (
    <section id="diseno" className="scroll-mt-24 border-t border-line py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Diseño"
          title="Diseño de marca y piezas"
          intro="Donde empezó todo: identidad, redes y piezas para clientes."
        />
        <ul className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {pieces.map((p) => (
            <li key={p.src} className="mb-6 break-inside-avoid">
              <img
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                loading="lazy"
                className="h-auto w-full border border-line"
              />
              <p className="mt-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                {p.caption}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-line pt-6">
          <Kicker>Logotipos</Kicker>
          <ul className="-mx-5 mt-4 flex gap-4 overflow-x-auto px-5 pb-1">
            {logos.map((l) => (
              <li key={l.src} className="shrink-0">
                <div className="grid h-28 w-28 place-items-center border border-line bg-paper-soft p-3">
                  <img
                    src={l.src}
                    alt={l.alt}
                    width={l.w}
                    height={l.h}
                    loading="lazy"
                    className="max-h-full w-auto max-w-full"
                  />
                </div>
                <p className="mt-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
                  {l.caption}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10">
          <ExternalLink
            href="https://www.behance.net/miguelyaeza"
            className="font-display font-bold text-brand-600 underline-offset-4 hover:underline"
          >
            Más en Behance ↗
          </ExternalLink>
        </p>
      </Container>
    </section>
  );
}
