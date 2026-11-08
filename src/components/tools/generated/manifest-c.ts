import type { ComponentType } from "react";
import DaysBetweenDatesTool from "./DaysBetweenDatesTool";
import ReceivablesAgeTool from "./ReceivablesAgeTool";
import WeightedAverageCostTool from "./WeightedAverageCostTool";
import RealMarginTool from "./RealMarginTool";
import PricePerPoundTool from "./PricePerPoundTool";
import SalesAverageTool from "./SalesAverageTool";

export const manifestC: Record<string, ComponentType> = {
  "days-between-dates": DaysBetweenDatesTool,
  "receivables-age": ReceivablesAgeTool,
  "weighted-average-cost": WeightedAverageCostTool,
  "real-margin": RealMarginTool,
  "price-per-pound": PricePerPoundTool,
  "sales-average": SalesAverageTool,
};
