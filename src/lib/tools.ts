import { batchA } from "./tools-batch-a";
import { batchB } from "./tools-batch-b";
import { batchC } from "./tools-batch-c";
import { batchD } from "./tools-batch-d";
import { batchE } from "./tools-batch-e";

export type Tool = {
  slug: string;
  title: string;
  eyebrow: string;
  promise: string;
  description: string;
  category: "diario" | "negocio";
  minutes: number;
  inflinds: { title: string; text: string; href: string };
  merez: { title: string; text: string; href: string };
};

const coreTools: Tool[] = [
  {
    slug: "vat-and-totals",
    title: "IVA y totales",
    eyebrow: "Facturación",
    promise: "Sumar o quitar el IVA sin equivocarse en la base.",
    description:
      "Pon el monto y la tarifa: te devuelve la base, el IVA y el total. Sirve igual para revisar una factura que para armar un precio.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Facturación en el sitio",
      text: "Si la facturación tiene que salir del sitio y no de una calculadora, eso se integra.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Cotizaciones con IVA",
      text: "En Merez el IVA se calcula por línea y la cotización sale con su total cerrado.",
      href: "https://www.merez.co/agents/condor/",
    },
  },
  {
    slug: "percentages",
    title: "Porcentajes y variaciones",
    eyebrow: "Cuentas",
    promise: "El porcentaje de un valor, y cuánto cambió entre dos.",
    description:
      "Tres cuentas que se hacen a diario: cuánto es el X %, qué porcentaje representa A de B y cuánto subió o bajó entre dos cifras.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Reportes claros",
      text: "Cuando el porcentaje tiene que vivir en un tablero y no en una servilleta, lo montamos.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "La variación en el dato",
      text: "Merez guarda el histórico: la variación se calcula sobre lo que pasó, no sobre lo que recuerdas.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "currency",
    title: "Dólares y pesos",
    eyebrow: "Divisas",
    promise: "Convertir con la tasa que usas hoy, sin buscar en otra pestaña.",
    description:
      "Convierte USD a COP y de vuelta con tu propia tasa, y aplica el margen que quieras para cubrir la diferencia del día.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Compras y proveedores",
      text: "Si compras fuera y necesitas control de costos en pesos, eso entra en el sistema.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "Costos en pesos",
      text: "Merez opera en pesos: el costo de una compra se registra en COP y queda en la ficha.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "business-days",
    title: "Días hábiles y vencimientos",
    eyebrow: "Plazos",
    promise: "A qué fecha cae un plazo de N días hábiles.",
    description:
      "Suma días hábiles a una fecha y salta fines de semana. Para prometer entregas, pagos y vencimientos sin contar con los dedos.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Operación y entregas",
      text: "Cuando los plazos se prometen a mano y se olvidan, el problema es de proceso.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Fechas de entrega",
      text: "En Merez el pedido lleva su fecha y su estado; no hay que recordarla de memoria.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "reorder-point",
    title: "Punto de reorden",
    eyebrow: "Inventario",
    promise: "Con cuánto stock pedir, antes de quedarte sin producto.",
    description:
      "Con el consumo diario, el tiempo de entrega del proveedor y un colchón de seguridad, calcula el nivel que dispara la compra.",
    category: "diario",
    minutes: 2,
    inflinds: {
      title: "Compras y logística",
      text: "Si el inventario se lleva en una hoja, ahí es donde se pierde la venta.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Catálogo y pedidos",
      text: "Merez conoce el producto y el pedido; el stock que se agota deja de ser una sorpresa.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "unit-price",
    title: "Precio por unidad",
    eyebrow: "Compras",
    promise: "Cuál presentación sale más barata, sin cuentas mentales.",
    description:
      "Compara dos presentaciones por kilo, litro o unidad. La más grande no siempre es la más barata.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Costos y proveedores",
      text: "Si la compra mueve el margen, conviene tener la comparación sistematizada.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "Precio en el catálogo",
      text: "Merez guarda el precio y el costo de cada producto; la comparación deja de ser manual.",
      href: "https://www.merez.co/agents/condor/",
    },
  },

  {
    slug: "sale-price",
    title: "Precio de venta y margen",
    eyebrow: "Precio",
    promise: "Cuánto cobrar para que el margen no se lo coma el descuento.",
    description:
      "Parte del costo real, define el margen que quieres y mira cuánto queda si el cliente pide descuento. Sin cuenta y sin instalar nada.",
    category: "negocio",
    minutes: 1,
    inflinds: {
      title: "Precios y oferta",
      text: "Si el problema es cómo se presenta el precio en tu sitio, eso lo armamos con la línea de diseño y desarrollo.",
      href: "/services/#diseno",
    },
    merez: {
      title: "Cotizaciones que no pierden plata",
      text: "En Merez la cotización sale del catálogo y queda con su margen a la vista; Cóndor frena lo que va por debajo del costo.",
      href: "https://www.merez.co/agents/condor/",
    },
  },
  {
    slug: "true-crm-cost",
    title: "Costo real de un CRM",
    eyebrow: "CRM",
    promise: "La factura a doce meses, no el precio de la lista.",
    description:
      "Suma licencia por usuario, implementación y horas del equipo. Es la cuenta que no aparece en la página de precios del proveedor.",
    category: "negocio",
    minutes: 2,
    inflinds: {
      title: "Implementación y datos",
      text: "Si necesitas migrar datos, integrar sistemas o montar el flujo completo, entra el equipo de desarrollo.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Sin cobro por usuario",
      text: "Merez cobra por negocio, no por persona. La comparación honesta está en la página de precios y en la comparativa.",
      href: "https://www.merez.co/compare/crm-per-user/",
    },
  },
  {
    slug: "gateway-or-breb",
    title: "Pasarela o Bre-B",
    eyebrow: "Cobros",
    promise: "Cuánto cuesta cobrar con pasarela y cuándo Bre-B deja de alcanzar.",
    description:
      "Compara la comisión de una pasarela con la verificación manual de Bre-B, incluido el tiempo de la persona que confirma pagos.",
    category: "negocio",
    minutes: 2,
    inflinds: {
      title: "Checkout y sitio",
      text: "El checkout, la tienda y la integración con tu operación los construimos desde el sitio.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Los dos modos de cobro",
      text: "Merez trae Bre-B y pasarela en el mismo pedido; cambias de modo cuando el volumen lo pide.",
      href: "https://www.merez.co/integrations/",
    },
  },
  {
    slug: "lost-hours",
    title: "Horas que se pierden",
    eyebrow: "Automatización",
    promise: "Qué cuesta seguir haciendo a mano lo que se puede automatizar.",
    description:
      "Ponle tarifa a las horas repetidas de tu equipo. El resultado es el dinero que se va en tareas que una automatización puede absorber.",
    category: "negocio",
    minutes: 2,
    inflinds: {
      title: "Automatización e IA",
      text: "Diseñamos el flujo, lo conectamos con tus herramientas y lo dejamos funcionando.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Automatizaciones dentro del CRM",
      text: "Merez ejecuta las reglas sobre el mismo dato del negocio: recordatorios, seguimientos y tareas.",
      href: "https://www.merez.co/how-it-works/",
    },
  },
  {
    slug: "break-even",
    title: "Punto de equilibrio",
    eyebrow: "Operación",
    promise: "Cuánto hay que vender para no perder.",
    description:
      "Con costos fijos, precio y costo variable, el número de unidades y de ventas que cubre la operación del mes.",
    category: "negocio",
    minutes: 1,
    inflinds: {
      title: "Modelo y tablero",
      text: "Si quieres el tablero con tus números reales y no una calculadora suelta, lo montamos.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "El margen en la cotización",
      text: "Cóndor revisa cada línea contra el costo real antes de que la cotización salga.",
      href: "https://www.merez.co/agents/condor/",
    },
  },
];

export const tools: Tool[] = [...coreTools, ...batchA, ...batchB, ...batchC, ...batchD, ...batchE];

export function getTool(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export const dailyTools = tools.filter((tool) => tool.category === "diario");
export const businessTools = tools.filter((tool) => tool.category === "negocio");
