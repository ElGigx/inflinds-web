import type { Tool } from "./tools";

export const batchD: Tool[] = [
  {
    slug: "hiring-cost",
    title: "Costo de contratar",
    eyebrow: "Nómina",
    promise: "Lo que cuesta de verdad un salario, con aportes y prestaciones.",
    description:
      "Suma salario, prestaciones, seguridad social y parafiscales: costo mensual, anual y por día hábil. Cada porcentaje es editable.",
    category: "diario",
    minutes: 2,
    inflinds: {
      title: "Nómina dentro del sistema",
      text: "Si el costo de contratar tiene que alimentar precios o reportes y no una hoja aparte, eso se monta en el sistema.",
      href: "/services/#consultoria",
    },
    merez: {
      title: "Datos ordenados",
      text: "Merez maneja catálogo, cotizaciones, pedidos y pagos; la nómina se calcula por fuera y se registra como dato del negocio.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "benefits-provision",
    title: "Provisión de prestaciones",
    eyebrow: "Prestaciones",
    promise: "Cuánto separar cada mes para prima, cesantías, intereses y vacaciones.",
    description:
      "Con el salario y los días del período, calcula la provisión de cada prestación y el total mensual que deberías apartar. Los porcentajes son referencias editables.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Provisión visible",
      text: "Si la provisión tiene que verse en un tablero y no en una hoja de cálculo, eso se automatiza.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Costos en el sistema",
      text: "Merez guarda precios, cotizaciones y pedidos; los costos laborales los defines tú y quedan consultables.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "vacation-payout",
    title: "Vacaciones",
    eyebrow: "Vacaciones",
    promise: "Cuánto vale un día de vacaciones y cuánto se paga por los días tomados.",
    description:
      "Calcula el valor del día, el total a pagar y los días calendario que cubren los días hábiles. La cuenta usa una base de 30 días por mes.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Registro sin fórmulas",
      text: "Si el descanso y su pago tienen que quedar registrados y avisar al área, eso se automatiza.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Solicitudes y pedidos",
      text: "En Merez las solicitudes y los pedidos quedan con su estado; el pago de vacaciones se liquida aparte.",
      href: "https://www.merez.co/how-it-works/",
    },
  },
  {
    slug: "service-bonus",
    title: "Prima de servicios",
    eyebrow: "Prestaciones",
    promise: "La prima del semestre y cuánto provisionar por mes.",
    description:
      "Calcula la prima sobre salario más auxilio de transporte según los días trabajados, y la provisión mensual equivalente. Ajusta los días a tu caso.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Cuentas claras",
      text: "Si la prima tiene que salir de datos guardados y no de una calculadora, eso se integra.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Cotizaciones y pedidos",
      text: "Merez ordena catálogo, cotizaciones, pedidos y pagos; la nómina se lleva por fuera.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "severance-and-interest",
    title: "Cesantías e intereses",
    eyebrow: "Cesantías",
    promise: "Cuánto va a cesantías y cuánto generan de intereses.",
    description:
      "Con salario, auxilio, días trabajados y la tasa anual, calcula las cesantías, sus intereses y el total a consignar o pagar. La tasa es editable.",
    category: "diario",
    minutes: 1,
    inflinds: {
      title: "Datos que no se pierden",
      text: "Si el cálculo tiene que quedar guardado y consultable, eso se monta en el sistema.",
      href: "/services/#desarrollo",
    },
    merez: {
      title: "Operación registrada",
      text: "Merez conserva el histórico de pedidos y pagos; las cesantías se liquidan con tu contador.",
      href: "https://www.merez.co/product/",
    },
  },
  {
    slug: "overtime",
    title: "Horas extra y recargos",
    eyebrow: "Recargos",
    promise: "El valor de cada hora extra y el total del período con recargos.",
    description:
      "Calcula la hora ordinaria, lo que vale cada recargo y el total con las horas extra diurnas, nocturnas y dominicales. Los porcentajes son referencias editables.",
    category: "diario",
    minutes: 2,
    inflinds: {
      title: "Horas desde la operación",
      text: "Si las horas extra tienen que salir de la operación y no de una calculadora, eso se automatiza.",
      href: "/services/#automatizacion",
    },
    merez: {
      title: "Agentes que atienden",
      text: "Los agentes de Merez atienden consultas y pedidos; la liquidación de horas se hace con tu contador.",
      href: "https://www.merez.co/agents/castor/",
    },
  },
];
