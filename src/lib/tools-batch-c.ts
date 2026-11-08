import type { Tool } from "./tools";

export const batchC: Tool[] = [
  {
    slug: "dias-entre-fechas",
    title: "Días entre fechas",
    eyebrow: "Plazos",
    promise: "Cuánto pasó entre dos fechas, en días, semanas y hábiles.",
    description:
      "Pon la fecha inicial y la final: te devuelve los días calendario, las semanas y una cuenta aproximada de días hábiles de lunes a viernes.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Plazos que se avisan solos",
      text: "Si un vencimiento tiene que generar alerta en vez de revisarse a mano, eso se automatiza en el sitio.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Fechas guardadas",
      text: "Merez registra las fechas de un pedido y las conserva: el cálculo se hace sobre el dato, no sobre lo que recuerdas.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "edad-de-cartera",
    title: "Edad de cartera",
    eyebrow: "Cobranza",
    promise: "Cuántos días lleva vencida una factura y cuánto suma la mora.",
    description:
      "Con la fecha de la factura, su valor, el plazo y la tasa de mora mensual, te dice cuántos días lleva vencida y cuánto interés simple se acumuló.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Cartera a la vista",
      text: "Si la cartera de clientes tiene que verse en un tablero y avisar cuando vence, eso se integra.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Cobros y saldos",
      text: "En Merez la factura y sus pagos quedan registrados; el saldo pendiente sale del dato guardado.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "costo-promedio-ponderado",
    title: "Costo promedio",
    eyebrow: "Inventario",
    promise: "El costo real por unidad cuando compras a precios distintos.",
    description:
      "Tres compras con cantidad y precio: devuelve el costo promedio ponderado por unidad y lo compara con el promedio simple de los tres precios.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Costos sin hoja aparte",
      text: "Cuando el costo de compra tiene que alimentar precios y márgenes, eso vive en el sistema.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Costo por producto",
      text: "Merez guarda el costo de cada entrada de inventario y lo lleva al costo del producto.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "margen-real",
    title: "Margen real",
    eyebrow: "Precios",
    promise: "Qué margen queda después del descuento, no antes.",
    description:
      "Precio de venta, costo y descuento: devuelve el precio final, la utilidad, el margen sobre lo que cobras y el markup sobre el costo.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Precios con criterio",
      text: "Si el precio se define por reglas y no a ojo, eso se monta en el sistema.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "Precios y descuentos",
      text: "En Merez el precio de lista y el descuento se aplican sobre la misma ficha del producto.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "precio-por-libra",
    title: "Precio por libra",
    eyebrow: "Precios",
    promise: "El precio por kilo en libras, y de vuelta, sin regla de tres.",
    description:
      "Convierte el precio entre kilos y libras (1 lb = 0,45359237 kg) en los dos sentidos, para que la etiqueta y la balanza hablen el mismo idioma.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Catálogo en dos unidades",
      text: "Si vendes por kilo y por libra a la vez, el sistema puede publicar las dos presentaciones.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Precio por presentación",
      text: "Merez maneja presentaciones y unidades por producto: el precio se publica con la medida correcta.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "promedio-ventas",
    title: "Promedio de ventas",
    eyebrow: "Ventas",
    promise: "Cómo se reparte la semana: total, promedio, mejor y peor día.",
    description:
      "Carga las ventas de lunes a domingo y mira el total de la semana, el promedio diario, cuál fue el mejor día y cuánto se separa del promedio.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Ventas en un tablero",
      text: "Si el reporte de ventas tiene que salir solo cada día, eso se automatiza.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Ventas del día a día",
      text: "Merez registra las ventas por día y las deja consultables cuando las necesites.",
      href: "https://www.merez.co/product/",
    },
  },
];
