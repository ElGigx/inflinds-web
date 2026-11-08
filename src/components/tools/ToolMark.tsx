"use client";

import Icon from "@/components/Icon";
import { FAMILIES, familyOf, iconOf } from "@/lib/tool-taxonomy";

/**
 * Marca de cada herramienta: baldosa con el color de su categoría, su icono y
 * un acento propio (posición derivada del slug) para que dos herramientas de la
 * misma familia no se lean iguales.
 */
export default function ToolMark({
  slug,
  size = 44,
  className = "",
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const family = FAMILIES[familyOf(slug)];
  const hash = [...slug].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = hash % 4;
  const dot = [
    "right-1 top-1",
    "right-1 bottom-1",
    "left-1 top-1",
    "left-1 bottom-1",
  ][variant];
  const dotColor = variant % 2 === 0 ? "bg-yellow" : "bg-magenta";

  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-xl ring-1 ring-inset ring-black/5 ${family.tile} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Icon name={iconOf(slug)} className="h-[46%] w-[46%]" />
      <span className={`absolute h-1.5 w-1.5 rounded-full ${dot} ${dotColor}`} />
    </span>
  );
}
