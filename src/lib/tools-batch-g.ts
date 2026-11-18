import type { Tool } from "./tools";

export const batchG: Tool[] = [
  {
    slug: "cuentas-claras",
    title: "Cuentas claras",
    eyebrow: "Operación",
    promise: "Quién te debe, cuánto y desde cuándo. Sin cuaderno y sin señal.",
    description:
      "Para tiendas, comida, servicios y oficios. Fía, cobra, abona y recuerda por WhatsApp; el saldo, el día y el total se calculan solos.",
    category: "negocio",
    minutes: 1,
    kind: "app",
    inflinds: {
      title: "Tus cuentas, a tu medida",
      text: "Si manejas varias cobranzas, necesitas un reporte propio o quieres el recordatorio con tu marca, se ajusta.",
      href: "/contact/",
    },
    merez: {
      title: "El historial y el crédito directo",
      text: "La cuenta gratis de Merez guarda tus clientes y sus saldos, y convierte la lista en crédito y seguimiento.",
      href: "https://app.merez.co",
    },
  },
];
