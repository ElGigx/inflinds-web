import type { ComponentType } from "react";
import CostoContratarTool from "./CostoContratarTool";
import ProvisionPrestacionesTool from "./ProvisionPrestacionesTool";
import LiquidacionVacacionesTool from "./LiquidacionVacacionesTool";
import PrimaServiciosTool from "./PrimaServiciosTool";
import CesantiasInteresesTool from "./CesantiasInteresesTool";
import HorasExtraTool from "./HorasExtraTool";

export const manifestD: Record<string, ComponentType> = {
  "costo-de-contratar": CostoContratarTool,
  "provision-prestaciones": ProvisionPrestacionesTool,
  "liquidacion-vacaciones": LiquidacionVacacionesTool,
  "prima-de-servicios": PrimaServiciosTool,
  "cesantias-e-intereses": CesantiasInteresesTool,
  "horas-extra": HorasExtraTool,
};
