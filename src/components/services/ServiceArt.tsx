type ArtKey = "diseno" | "desarrollo" | "automatizacion" | "inteligencia-artificial" | "consultoria" | "seo-geo";

const palette: Record<ArtKey, { stroke: string; fill: string; soft: string }> = {
  diseno: { stroke: "text-brand-600", fill: "fill-brand-600", soft: "fill-brand-100" },
  desarrollo: { stroke: "text-magenta", fill: "fill-magenta", soft: "fill-magenta/10" },
  automatizacion: { stroke: "text-orange-600", fill: "fill-orange", soft: "fill-orange/10" },
  "inteligencia-artificial": { stroke: "text-brand-700", fill: "fill-brand-700", soft: "fill-brand-100" },
  consultoria: { stroke: "text-night", fill: "fill-night", soft: "fill-slate/10" },
  "seo-geo": { stroke: "text-brand-800", fill: "fill-brand-800", soft: "fill-brand-100" },
};

export default function ServiceArt({ slug }: { slug: string }) {
  const key = (slug in palette ? slug : "diseno") as ArtKey;
  const color = palette[key];

  return (
    <svg viewBox="0 0 320 220" className={`h-full w-full ${color.stroke}`} aria-hidden="true" fill="none">
      {key === "diseno" && (
        <>
          <rect x="18" y="24" width="120" height="76" rx="10" className={color.soft} />
          <rect x="150" y="24" width="152" height="34" rx="8" className="stroke-current" strokeWidth="2" />
          <rect x="150" y="66" width="152" height="34" rx="8" className="stroke-current" strokeWidth="2" />
          <rect x="18" y="114" width="284" height="76" rx="12" className="stroke-current" strokeWidth="2" />
          <circle cx="46" cy="138" r="8" className={color.fill} />
          <line x1="66" y1="138" x2="180" y2="138" strokeWidth="2" className="stroke-current" />
          <line x1="66" y1="154" x2="240" y2="154" strokeWidth="2" className="stroke-current opacity-40" />
          <rect x="240" y="128" width="44" height="18" rx="9" className={color.fill} />
        </>
      )}

      {key === "desarrollo" && (
        <>
          <rect x="18" y="22" width="284" height="160" rx="12" className="stroke-current" strokeWidth="2" />
          <line x1="18" y1="52" x2="302" y2="52" strokeWidth="2" className="stroke-current" />
          <circle cx="36" cy="37" r="4" className={color.fill} />
          <circle cx="52" cy="37" r="4" className="stroke-current" strokeWidth="2" />
          <circle cx="68" cy="37" r="4" className="stroke-current" strokeWidth="2" />
          <rect x="34" y="70" width="76" height="96" rx="8" className={color.soft} />
          <rect x="126" y="70" width="160" height="26" rx="6" className="stroke-current" strokeWidth="2" />
          <rect x="126" y="106" width="160" height="26" rx="6" className="stroke-current" strokeWidth="2" />
          <rect x="126" y="142" width="96" height="24" rx="6" className={color.fill} />
        </>
      )}

      {key === "automatizacion" && (
        <>
          <rect x="20" y="30" width="64" height="40" rx="8" className="stroke-current" strokeWidth="2" />
          <rect x="128" y="90" width="64" height="40" rx="20" className="stroke-current" strokeWidth="2" />
          <rect x="236" y="150" width="64" height="40" rx="8" className="stroke-current" strokeWidth="2" />
          <path d="M84 50h32a12 12 0 0 1 12 12v28" className="stroke-current" strokeWidth="2" strokeDasharray="5 5" />
          <path d="M192 110h32a12 12 0 0 1 12 12v28" className="stroke-current" strokeWidth="2" strokeDasharray="5 5" />
          <circle cx="100" cy="50" r="5" className={color.fill} />
          <circle cx="236" cy="110" r="5" className={color.fill} />
          <circle cx="160" cy="110" r="8" className={color.fill} />
        </>
      )}

      {key === "inteligencia-artificial" && (
        <>
          <circle cx="160" cy="110" r="34" className={color.soft} />
          <circle cx="160" cy="110" r="34" className="stroke-current" strokeWidth="2" />
          <circle cx="160" cy="110" r="8" className={color.fill} />
          {[0, 60, 120, 180, 240, 300].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x = 160 + Math.cos(rad) * 82;
            const y = 110 + Math.sin(rad) * 82;
            return (
              <g key={angle}>
                <line x1="160" y1="110" x2={x} y2={y} className="stroke-current opacity-40" strokeWidth="1.5" />
                <circle cx={x} cy={y} r="6" className="stroke-current" strokeWidth="2" />
              </g>
            );
          })}
          <rect x="236" y="26" width="64" height="24" rx="12" className={color.fill} />
          <rect x="20" y="170" width="64" height="24" rx="12" className="stroke-current" strokeWidth="2" />
        </>
      )}

      {key === "consultoria" && (
        <>
          <circle cx="160" cy="110" r="72" className="stroke-current opacity-30" strokeWidth="2" />
          <circle cx="160" cy="110" r="46" className="stroke-current opacity-60" strokeWidth="2" />
          <circle cx="160" cy="110" r="20" className={color.soft} />
          <circle cx="160" cy="110" r="6" className={color.fill} />
          <path d="M160 110L232 60" className="stroke-current" strokeWidth="3" />
          <path d="M232 60l-22 2 12 12z" className={color.fill} />
          <circle cx="70" cy="160" r="5" className={color.fill} />
          <circle cx="250" cy="160" r="5" className={color.fill} />
          <circle cx="86" cy="56" r="5" className="stroke-current" strokeWidth="2" />
        </>
      )}
      {key === "seo-geo" && (
        <>
          <rect x="18" y="24" width="284" height="26" rx="13" className="stroke-current" strokeWidth="2" />
          <circle cx="38" cy="37" r="5" className={color.fill} />
          <line x1="54" y1="37" x2="150" y2="37" className="stroke-current" strokeWidth="2" />
          <rect x="18" y="64" width="150" height="26" rx="13" className="stroke-current" strokeWidth="2" />
          <rect x="18" y="104" width="196" height="26" rx="13" className={color.soft} />
          <line x1="34" y1="117" x2="150" y2="117" className="stroke-current" strokeWidth="2" />
          <rect x="18" y="144" width="120" height="26" rx="13" className="stroke-current" strokeWidth="2" />
          <circle cx="236" cy="124" r="34" className="stroke-current" strokeWidth="3" />
          <line x1="260" y1="150" x2="288" y2="180" className="stroke-current" strokeWidth="4" />
          <path d="M220 132l10-12 8 8 12-16" className="stroke-current" strokeWidth="3" fill="none" />
          <circle cx="232" cy="76" r="6" className={color.fill} />
        </>
      )}
    </svg>
  );
}
