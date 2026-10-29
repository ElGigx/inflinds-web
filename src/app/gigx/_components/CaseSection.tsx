import { Container } from "@/components/ui";
import type { CaseImage, CaseStudy } from "../_data";
import { ChipRow, ExternalLink, Kicker } from "./parts";
import { AiFlow, TokenSpecimen } from "./Visuals";

const sizeClass: Record<CaseImage["size"], string> = {
  full: "w-full",
  half: "min-w-0 flex-1",
  phone: "w-[24%] shrink-0",
  thumb: "w-24 shrink-0",
};

function Figure({ image }: { image: CaseImage }) {
  return (
    <figure className={sizeClass[image.size]}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.w}
        height={image.h}
        loading="lazy"
        className="h-auto w-full border border-line"
      />
      {image.caption && (
        <figcaption className="mt-1.5 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function Media({ study }: { study: CaseStudy }) {
  if (study.visual === "tokens") return <TokenSpecimen />;
  if (study.visual === "ai") return <AiFlow />;

  const [main, ...rest] = study.images;
  const phone = rest.find((i) => i.size === "phone");
  const below = rest.filter((i) => i.size !== "phone");

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        <div className="min-w-0 flex-1">
          <Figure image={main} />
        </div>
        {phone && <Figure image={phone} />}
      </div>
      {below.length > 0 && (
        <div className="flex items-end gap-4">
          {below.map((i) => (
            <Figure key={i.src} image={i} />
          ))}
        </div>
      )}
    </div>
  );
}

const subhead = "font-display font-bold text-xs uppercase tracking-[0.18em] text-ink";

export default function CaseSection({ study, index }: { study: CaseStudy; index: number }) {
  const flip = index % 2 === 1;

  return (
    <article id={study.id} className="scroll-mt-24 border-t border-line py-14 sm:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className={flip ? "lg:order-2" : ""}>
            <Kicker>{`0${index + 1} · ${study.kicker}`}</Kicker>
            <h3 className="mt-3 font-display font-black text-3xl sm:text-4xl leading-tight tracking-tight text-ink">
              {study.title}
            </h3>
            <p className="mt-4 text-lg text-slate leading-relaxed">{study.summary}</p>

            <h4 className={`mt-8 ${subhead}`}>El problema</h4>
            <p className="mt-2 text-slate leading-relaxed">{study.problem}</p>

            <h4 className={`mt-8 ${subhead}`}>Lo que hice</h4>
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {study.did.map((d) => (
                <li key={d} className="py-2.5 text-slate leading-relaxed">
                  {d}
                </li>
              ))}
            </ul>

            <h4 className={`mt-8 ${subhead}`}>Resultado</h4>
            <dl className="mt-2">
              {study.figures.map((f) => (
                <div
                  key={f.value}
                  className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-line py-3 last:border-b"
                >
                  <dt className="font-display font-black text-3xl text-brand-600 sm:min-w-[9rem]">{f.value}</dt>
                  <dd className="min-w-0 flex-1 basis-40 text-sm text-slate">{f.label}</dd>
                </div>
              ))}
            </dl>
            {study.footnote && <p className="mt-3 text-xs text-muted">{study.footnote}</p>}

            {study.stack && (
              <>
                <h4 className={`mt-8 ${subhead}`}>Stack</h4>
                <div className="mt-3">
                  <ChipRow label={`Stack de ${study.title}`} items={study.stack.map((text) => ({ text }))} wrap />
                </div>
              </>
            )}

            {study.links && (
              <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {study.links.map((l) => (
                  <ExternalLink
                    key={l.href}
                    href={l.href}
                    className="font-display font-bold text-brand-600 underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </ExternalLink>
                ))}
              </p>
            )}
          </div>

          <div className={`order-first min-w-0 lg:sticky lg:top-24 lg:self-start ${flip ? "lg:order-1" : "lg:order-none"}`}>
            <Media study={study} />
          </div>
        </div>
      </Container>
    </article>
  );
}
