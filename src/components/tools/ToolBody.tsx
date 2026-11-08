"use client";

import AutomationTool from "./AutomationTool";
import BreakEvenTool from "./BreakEvenTool";
import CrmCostTool from "./CrmCostTool";
import PaymentsTool from "./PaymentsTool";
import SalePriceTool from "./SalePriceTool";

export default function ToolBody({ slug }: { slug: string }) {
  switch (slug) {
    case "precio-de-venta":
      return <SalePriceTool />;
    case "costo-real-de-un-crm":
      return <CrmCostTool />;
    case "pasarela-o-breb":
      return <PaymentsTool />;
    case "horas-que-se-pierden":
      return <AutomationTool />;
    case "punto-de-equilibrio":
      return <BreakEvenTool />;
    default:
      return null;
  }
}
