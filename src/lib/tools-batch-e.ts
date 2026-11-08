import type { Tool } from "./tools";

export const batchE: Tool[] = [
  {
    slug: "withholding-tax",
    title: "Retención en la fuente",
    eyebrow: "DIAN",
    promise: "Cuánto te retienen y cuánto le pagas al proveedor.",
    description:
      "Elige el concepto, ajusta la tarifa y mira la retención, el neto que recibe el proveedor y la tarifa efectiva sobre la base.",
    category: "diario",
    minutes: 2,
    inflinds: {
      title: "Retenciones sin dudas",
      text: "Si la retención te frena una factura o un pago, la revisamos con tu contador y dejamos la regla clara.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "La retención en la factura",
      text: "En Merez la factura sale con sus retenciones y el neto a pagar calculado sobre el mismo documento.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "ica-tax",
    title: "ICA y reteICA",
    eyebrow: "ICA",
    promise: "El ICA de tu actividad y lo que te retiene el cliente.",
    description:
      "Pon la base, la tarifa por mil de tu municipio y el porcentaje de reteICA: ves el impuesto, lo retenido y el saldo que te toca pagar.",
    category: "diario",
    minutes: 2,
    inflinds: {
      title: "Reportes que salen solos",
      text: "Si el ICA se arma juntando facturas en una hoja, esos datos pueden calcularse desde el mismo sistema.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "El municipio en el dato",
      text: "Merez guarda la factura y el municipio; el reporte de ICA sale de los mismos documentos.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "invoice-with-withholdings",
    title: "Factura con retenciones",
    eyebrow: "Facturación",
    promise: "El neto que de verdad entra a la cuenta.",
    description:
      "Subtotal, IVA y retenciones en una sola vista: total de la factura, cuánto se retiene y cuánto te consignan. La cuenta que se hace en cada cobro.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Facturación y recaudo",
      text: "Si la factura y el cobro tienen que salir del mismo sistema, eso se integra en tu sitio.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Cobros con su neto",
      text: "En Merez el pedido, la factura y las retenciones viven en el mismo flujo, con el neto a la vista.",
      href: "https://www.merez.co/integrations/",
    },
  },
  {
    slug: "company-setup-cost",
    title: "Costo de crear empresa",
    eyebrow: "Empresa",
    promise: "Cuánto cuesta montarla y cuánto capital necesitas.",
    description:
      "Suma matrícula, notaría, firma, contador y otros, y añade los gastos mensuales: ves el costo de constitución, el capital inicial y el primer año.",
    category: "diario",
    minutes: 2,
    inflinds: {
      title: "Arrancar en orden",
      text: "Si vas a montar la company, ordenamos la parte legal y la operación desde el primer mes.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "El negocio en un mismo lugar",
      text: "Merez organiza el catálogo, los pedidos y los cobros para que no arranques con todo separado.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "social-security",
    title: "Aportes de seguridad social",
    eyebrow: "Nómina",
    promise: "Qué cuesta la nómina además del salario.",
    description:
      "Con el salario y las tarifas de salud, pensión, ARL, caja y parafiscales, mira el costo mensual, el anual y su peso sobre el salario.",
    category: "diario",
    minutes: 2,
    inflinds: {
      title: "Nómina sin sorpresas",
      text: "Si los aportes se calculan a mano, el error aparece en la liquidación; eso se puede automatizar.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Equipo y costos en el mismo lugar",
      text: "Merez relaciona el equipo con los costos del negocio para que el margen no se calcule a ciegas.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "sgsst-cost",
    title: "Costo de SG-SST",
    eyebrow: "SG-SST",
    promise: "El presupuesto anual de seguridad y salud en el trabajo.",
    description:
      "ARL sobre la nómina, capacitaciones, exámenes médicos y otros gastos: el total del año y cuánto cuesta por empleado.",
    category: "diario",
    minutes: 2,
    inflinds: {
      title: "Cumplir sin gastar de más",
      text: "Si el SG-SST vive en carpetas y recordatorios sueltos, lo pasamos a un proceso con evidencia.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "Tareas y vencimientos a la vista",
      text: "Merez guarda las tareas y los vencimientos del equipo para que la evidencia esté cuando la pidan.",
      href: "https://www.merez.co/how-it-works/",
    },
  },
];
