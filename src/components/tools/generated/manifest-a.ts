import type { ComponentType } from "react";
import CuotasCreditoTool from "./CuotasCreditoTool";
import DescuentosCascadaTool from "./DescuentosCascadaTool";
import PropinaCuentaTool from "./PropinaCuentaTool";
import CostoViajeTool from "./CostoViajeTool";
import RedondeoPreciosTool from "./RedondeoPreciosTool";
import ConversionMedidasTool from "./ConversionMedidasTool";

export const manifestA: Record<string, ComponentType> = {
  "cuotas-de-credito": CuotasCreditoTool,
  "descuentos-en-cascada": DescuentosCascadaTool,
  "propina-y-cuenta": PropinaCuentaTool,
  "costo-por-viaje": CostoViajeTool,
  "redondeo-de-precios": RedondeoPreciosTool,
  "conversion-de-medidas": ConversionMedidasTool,
};
