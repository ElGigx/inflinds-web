import type { ComponentType } from "react";
import HiringCostTool from "./HiringCostTool";
import BenefitsProvisionTool from "./BenefitsProvisionTool";
import VacationPayoutTool from "./VacationPayoutTool";
import ServiceBonusTool from "./ServiceBonusTool";
import SeveranceInterestTool from "./SeveranceInterestTool";
import OvertimeTool from "./OvertimeTool";

export const manifestD: Record<string, ComponentType> = {
  "hiring-cost": HiringCostTool,
  "benefits-provision": BenefitsProvisionTool,
  "vacation-payout": VacationPayoutTool,
  "service-bonus": ServiceBonusTool,
  "severance-and-interest": SeveranceInterestTool,
  "overtime": OvertimeTool,
};
