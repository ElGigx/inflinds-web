"use client";

import type { ComponentType } from "react";
import AutomationTool from "./AutomationTool";
import BreakEvenTool from "./BreakEvenTool";
import BusinessDaysTool from "./BusinessDaysTool";
import CrmCostTool from "./CrmCostTool";
import CurrencyTool from "./CurrencyTool";
import IvaTool from "./IvaTool";
import PaymentsTool from "./PaymentsTool";
import PercentTool from "./PercentTool";
import ReorderTool from "./ReorderTool";
import SalePriceTool from "./SalePriceTool";
import UnitPriceTool from "./UnitPriceTool";
import { manifestA } from "./generated/manifest-a";
import { manifestB } from "./generated/manifest-b";
import { manifestC } from "./generated/manifest-c";
import { manifestD } from "./generated/manifest-d";
import { manifestE } from "./generated/manifest-e";

const core: Record<string, ComponentType> = {
  "vat-and-totals": IvaTool,
  porcentajes: PercentTool,
  divisas: CurrencyTool,
  "business-days": BusinessDaysTool,
  "reorder-point": ReorderTool,
  "unit-price": UnitPriceTool,
  "sale-price": SalePriceTool,
  "true-crm-cost": CrmCostTool,
  "gateway-or-breb": PaymentsTool,
  "lost-hours": AutomationTool,
  "break-even": BreakEvenTool,
};

const registry: Record<string, ComponentType> = {
  ...core,
  ...manifestA,
  ...manifestB,
  ...manifestC,
  ...manifestD,
  ...manifestE,
};

export default function ToolBody({ slug }: { slug: string }) {
  const Component = registry[slug];
  return Component ? <Component /> : null;
}
