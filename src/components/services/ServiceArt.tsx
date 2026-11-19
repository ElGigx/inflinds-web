type ArtKey = "diseno" | "desarrollo" | "automatizacion" | "inteligencia-artificial" | "consultoria" | "seo-geo";

const palette: Record<
  ArtKey,
  { ink: string; fill: string; soft: string; accent: string }
> = {
  diseno: {
    ink: "text-brand-700",
    fill: "fill-brand-600",
    soft: "fill-brand-100",
    accent: "fill-magenta",
  },
  desarrollo: {
    ink: "text-magenta",
    fill: "fill-magenta",
    soft: "fill-magenta/10",
    accent: "fill-brand-600",
  },
  automatizacion: {
    ink: "text-orange-600",
    fill: "fill-orange",
    soft: "fill-orange/10",
    accent: "fill-brand-600",
  },
  "inteligencia-artificial": {
    ink: "text-brand-700",
    fill: "fill-brand-600",
    soft: "fill-brand-100",
    accent: "fill-magenta",
  },
  consultoria: {
    ink: "text-night",
    fill: "fill-night",
    soft: "fill-slate/10",
    accent: "fill-magenta",
  },
  "seo-geo": {
    ink: "text-brand-800",
    fill: "fill-brand-700",
    soft: "fill-brand-100",
    accent: "fill-magenta",
  },
};

export default function ServiceArt({ slug }: { slug: string }) {
  const key = (slug in palette ? slug : "diseno") as ArtKey;
  const color = palette[key];

  return (
    <svg
      viewBox="0 0 320 220"
      className={`h-full w-full ${color.ink}`}
      aria-hidden="true"
      fill="none"
    >
      <rect x="62" y="8" width="196" height="204" rx="52" className={color.soft} />

      {key === "diseno" && (
        <>
          <rect x="98" y="54" width="58" height="58" rx="14" className={color.accent} />
          <rect x="170" y="58" width="52" height="16" rx="8" className={color.fill} opacity=".4" />
          <rect x="170" y="84" width="52" height="16" rx="8" className={color.fill} opacity=".4" />
          <rect x="98" y="128" width="124" height="44" rx="14" stroke="currentColor" strokeWidth="8" />
          <circle cx="118" cy="150" r="7" className={color.fill} />
          <rect x="190" y="143" width="20" height="14" rx="7" className={color.accent} />
        </>
      )}

      {key === "desarrollo" && (
        <>
          <rect x="96" y="48" width="128" height="124" rx="18" stroke="currentColor" strokeWidth="8" />
          <line x1="96" y1="76" x2="224" y2="76" stroke="currentColor" strokeWidth="8" />
          <circle cx="112" cy="62" r="5" className={color.fill} />
          <circle cx="126" cy="62" r="5" className={color.fill} />
          <circle cx="140" cy="62" r="5" className={color.fill} />
          <rect x="112" y="94" width="62" height="10" rx="5" className={color.fill} opacity=".4" />
          <rect x="112" y="112" width="42" height="10" rx="5" className={color.fill} />
          <rect x="112" y="134" width="62" height="14" rx="7" className={color.accent} />
        </>
      )}

      {key === "automatizacion" && (
        <>
          <rect x="100" y="54" width="42" height="42" rx="12" className={color.accent} />
          <rect x="139" y="89" width="42" height="42" rx="12" className={color.fill} />
          <rect x="178" y="124" width="42" height="42" rx="12" className={color.accent} />
          <path d="M142 75 160 96" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M181 110 199 131" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </>
      )}

      {key === "inteligencia-artificial" && (
        <>
          <rect x="118" y="68" width="84" height="84" rx="24" className={color.fill} />
          <path
            d="M160 52v16M160 152v16M102 110h16M202 110h16"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M160 91l5 17 17 5-17 5-5 17-5-17-17-5 17-5z"
            className={color.accent}
          />
        </>
      )}

      {key === "consultoria" && (
        <>
          <circle cx="160" cy="110" r="46" stroke="currentColor" strokeWidth="8" />
          <circle cx="160" cy="110" r="22" stroke="currentColor" strokeWidth="8" />
          <circle cx="160" cy="110" r="7" className={color.accent} />
          <line x1="160" y1="110" x2="204" y2="66" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <path d="M204 66l-16 3 5 13z" className={color.fill} />
        </>
      )}

      {key === "seo-geo" && (
        <>
          <circle cx="142" cy="96" r="38" stroke="currentColor" strokeWidth="10" />
          <line x1="170" y1="124" x2="206" y2="160" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
          <line x1="122" y1="88" x2="162" y2="88" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <line x1="122" y1="104" x2="150" y2="104" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <circle cx="164" cy="104" r="7" className={color.accent} />
        </>
      )}
    </svg>
  );
}
