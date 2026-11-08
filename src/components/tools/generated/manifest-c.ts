import type { ComponentType } from "react";
import DiasEntreFechasTool from "./DiasEntreFechasTool";
import EdadCarteraTool from "./EdadCarteraTool";
import CostoPromedioTool from "./CostoPromedioTool";
import MargenRealTool from "./MargenRealTool";
import PrecioPorLibraTool from "./PrecioPorLibraTool";
import PromedioVentasTool from "./PromedioVentasTool";

export const manifestC: Record<string, ComponentType> = {
  "dias-entre-fechas": DiasEntreFechasTool,
  "edad-de-cartera": EdadCarteraTool,
  "costo-promedio-ponderado": CostoPromedioTool,
  "margen-real": MargenRealTool,
  "precio-por-libra": PrecioPorLibraTool,
  "promedio-ventas": PromedioVentasTool,
};
