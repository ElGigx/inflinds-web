import Link from "next/link";
import Image from "next/image";

// Logo oficial de Inflinds (assets reales en /public/brand).
// light=true usa la versión blanca para fondos oscuros/de color.
export default function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="Inflinds — inicio" className={`inline-flex items-center ${className}`}>
      <Image
        src={light ? "/brand/logo-blanco.svg" : "/brand/logo.svg"}
        alt="Inflinds"
        width={430}
        height={108}
        priority
        className="h-8 w-auto md:h-9"
      />
    </Link>
  );
}
