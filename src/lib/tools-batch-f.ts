import type { Tool } from "./tools";

export const batchF: Tool[] = [
  {
    slug: "time-billing",
    title: "Cobro por tiempo",
    eyebrow: "Operación",
    promise: "Entra, mira el tiempo y cobra. Sin cuenta y sin señal.",
    description:
      "Para parqueaderos, inflables y alquiler por horas. Se configuran las tarifas una vez y después son dos toques por cliente: entrar y cobrar.",
    category: "negocio",
    minutes: 1,
    inflinds: {
      title: "Te lo adapto a tu negocio",
      text: "Si son tres bahías, si el ticket lleva el logo o si necesita un reporte propio, se ajusta. La herramienta es el punto de partida, no el techo.",
      href: "/contact/",
    },
    merez: {
      title: "El historial y el respaldo",
      text: "La cuenta gratis de Merez guarda los días, el cierre del mes y lo que te deben. Si el teléfono falla, el registro no se va con él.",
      href: "https://app.merez.co",
    },
  },
];
