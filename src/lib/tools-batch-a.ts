import type { Tool } from "./tools";

export const batchA: Tool[] = [
  {
    slug: "cuotas-de-credito",
    title: "Cuotas de crédito",
    eyebrow: "Crédito",
    promise: "Cuánto queda la cuota y cuánto se va en intereses.",
    description:
      "Pon el monto, la tasa mensual y el plazo: ves la cuota fija, el total pagado y cuánto de eso son intereses, antes de firmar.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Simuladores en el sitio",
      text: "Si la financiación se explica en tu sitio, ese simulador se construye con el equipo de desarrollo.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Cotización y pedido",
      text: "En Merez la cotización y el pedido viven en el mismo flujo: el cliente ve el valor y el negocio conserva el registro.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "descuentos-en-cascada",
    title: "Descuentos en cascada",
    eyebrow: "Precio",
    promise: "Qué queda de verdad cuando dos descuentos se suman.",
    description:
      "Pon el precio de lista, los dos descuentos y el IVA: ves el precio antes de IVA, el ahorro y el total final. El 20 % más 10 % no da 30 %.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Precios en el catálogo",
      text: "Si las promociones se calculan a mano en cada cotización, eso se puede resolver en el sitio.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Precio que sale del catálogo",
      text: "En Merez el precio de la cotización sale del catálogo del negocio, no de una lista paralela en una hoja de cálculo.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "propina-y-cuenta",
    title: "Propina y cuenta",
    eyebrow: "Cuenta",
    promise: "Dividir la cuenta sin discutir por cincuenta pesos.",
    description:
      "Total, número de personas y propina: la propina, el total con propina y cuánto pone cada uno, redondeado al peso hacia arriba.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Cobros en el sitio",
      text: "Si el negocio cobra en su sitio, el checkout y la integración con la operación los construimos nosotros.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Pago dentro del pedido",
      text: "Merez cierra el pedido con su pago y deja el registro donde vive la venta.",
      href: "https://www.merez.co/integrations/",
    },
  },
  {
    slug: "costo-por-viaje",
    title: "Costo por viaje",
    eyebrow: "Transporte",
    promise: "Lo que cuesta un viaje de verdad, no solo el tanque.",
    description:
      "Con la distancia, el rendimiento del carro, el precio del galón, los peajes y otros costos, ves los galones, el combustible, el total y el costo por kilómetro.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Operación y logística",
      text: "Si los costos de ruta se calculan en una hoja aparte, se pueden integrar a la operación del negocio.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Pedidos y despachos",
      text: "En Merez el pedido queda con su estado y el negocio deja de buscarlo en el chat.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "redondeo-de-precios",
    title: "Redondeo de precios",
    eyebrow: "Precio",
    promise: "Un precio redondo sin perder el margen.",
    description:
      "Parte del costo y del margen que quieres, y redondea hacia arriba en cientos o miles. Ves la utilidad y el margen real del precio final.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Cómo se ve el precio",
      text: "Si el precio y su presentación en el sitio son el problema, entra la línea de diseño y desarrollo.",
      href: "/services/#diseno",
    },
    merez: {
      title: "Precio y costo por producto",
      text: "Merez guarda precio y costo en la misma ficha, y Cóndor revisa la cotización contra el costo antes de que salga.",
      href: "https://www.merez.co/agents/condor/",
    },
  },
  {
    slug: "conversion-de-medidas",
    title: "Conversión de medidas",
    eyebrow: "Medidas",
    promise: "Pasar kilos a libras, litros a galones y unidades a docenas.",
    description:
      "Elige la unidad de origen y la de destino: ves el resultado y la equivalencia usada, para comprar y vender sin cambiar de aplicación.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Compras y proveedores",
      text: "Si compras y vendes en unidades distintas, esa conversión puede quedar fija en el sistema y no en la cabeza de alguien.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "Presentación en el catálogo",
      text: "En Merez el producto se vende con su presentación, y el precio y el stock quedan en la misma ficha.",
      href: "https://www.merez.co/product/",
    },
  },
];
