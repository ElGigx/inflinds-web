import type { ComponentType } from "react";
import RetencionFuenteTool from "./RetencionFuenteTool";
import IcaReteicaTool from "./IcaReteicaTool";
import FacturaRetencionesTool from "./FacturaRetencionesTool";
import CrearEmpresaTool from "./CrearEmpresaTool";
import AportesSeguridadSocialTool from "./AportesSeguridadSocialTool";
import CostoSgsstTool from "./CostoSgsstTool";

export const manifestE: Record<string, ComponentType> = {
  "retencion-en-la-fuente": RetencionFuenteTool,
  "ica-y-reteica": IcaReteicaTool,
  "factura-con-retenciones": FacturaRetencionesTool,
  "costo-de-crear-empresa": CrearEmpresaTool,
  "aportes-seguridad-social": AportesSeguridadSocialTool,
  "costo-sgsst": CostoSgsstTool,
};
