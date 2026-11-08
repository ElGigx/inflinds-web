"use client";

import Icon from "@/components/Icon";
import { FAMILIES, familyOf, iconOf } from "@/lib/tool-taxonomy";

export default function ToolMark({
  slug,
  className = "h-10 w-10",
}: {
  slug: string;
  className?: string;
}) {
  const family = FAMILIES[familyOf(slug)];
  const hash = [...slug].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variant = hash % 4;
  const dot = ["right-1 top-1", "right-1 bottom-1", "left-1 top-1", "left-1 bottom-1"][variant];
  const dotColor = variant % 2 === 0 ? "bg-yellow" : "bg-magenta";

  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-xl ring-1 ring-inset ring-black/5 ${family.tile} ${className}`}
      aria-hidden="true"
    >
      <Icon name={iconOf(slug)} className="h-[46%] w-[46%]" />
      <span className={`absolute h-1.5 w-1.5 rounded-full ${dot} ${dotColor}`} />
    </span>
  );
}
