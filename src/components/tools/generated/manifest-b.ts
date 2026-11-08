import type { ComponentType } from "react";
import EnlaceWhatsappTool from "./EnlaceWhatsappTool";
import NormalizarTelefonosTool from "./NormalizarTelefonosTool";
import CaracteresRedesTool from "./CaracteresRedesTool";
import DigitoVerificacionNitTool from "./DigitoVerificacionNitTool";
import FirmaCorreoTool from "./FirmaCorreoTool";
import ComisionesVentaTool from "./ComisionesVentaTool";

export const manifestB: Record<string, ComponentType> = {
  "enlace-de-whatsapp": EnlaceWhatsappTool,
  "normalizar-telefonos": NormalizarTelefonosTool,
  "caracteres-para-redes": CaracteresRedesTool,
  "digito-de-verificacion-nit": DigitoVerificacionNitTool,
  "firma-de-correo": FirmaCorreoTool,
  "comisiones-de-venta": ComisionesVentaTool,
};
