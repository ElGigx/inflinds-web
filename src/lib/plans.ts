import { plans, type Plan } from "./site";

export async function plansForPricing(): Promise<Plan[]> {
  return plans;
}
