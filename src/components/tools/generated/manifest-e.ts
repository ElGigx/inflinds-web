import type { ComponentType } from "react";
import WithholdingTaxTool from "./WithholdingTaxTool";
import IcaTaxTool from "./IcaTaxTool";
import InvoiceWithholdingsTool from "./InvoiceWithholdingsTool";
import CompanySetupTool from "./CompanySetupTool";
import SocialSecurityTool from "./SocialSecurityTool";
import SgsstCostTool from "./SgsstCostTool";

export const manifestE: Record<string, ComponentType> = {
  "withholding-tax": WithholdingTaxTool,
  "ica-tax": IcaTaxTool,
  "invoice-with-withholdings": InvoiceWithholdingsTool,
  "company-setup-cost": CompanySetupTool,
  "social-security": SocialSecurityTool,
  "sgsst-cost": SgsstCostTool,
};
