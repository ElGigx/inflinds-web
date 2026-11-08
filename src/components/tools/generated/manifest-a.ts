import type { ComponentType } from "react";
import CreditInstallmentsTool from "./CreditInstallmentsTool";
import StackedDiscountsTool from "./StackedDiscountsTool";
import TipAndBillTool from "./TipAndBillTool";
import CostPerTripTool from "./CostPerTripTool";
import PriceRoundingTool from "./PriceRoundingTool";
import UnitConversionTool from "./UnitConversionTool";

export const manifestA: Record<string, ComponentType> = {
  "credit-installments": CreditInstallmentsTool,
  "stacked-discounts": StackedDiscountsTool,
  "tip-and-bill": TipAndBillTool,
  "cost-per-trip": CostPerTripTool,
  "price-rounding": PriceRoundingTool,
  "unit-conversion": UnitConversionTool,
};
