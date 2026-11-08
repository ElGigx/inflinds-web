import type { ComponentType } from "react";
import WhatsappLinkTool from "./WhatsappLinkTool";
import PhoneNormalizerTool from "./PhoneNormalizerTool";
import SocialCharacterCountTool from "./SocialCharacterCountTool";
import NitCheckDigitTool from "./NitCheckDigitTool";
import EmailSignatureTool from "./EmailSignatureTool";
import SalesCommissionsTool from "./SalesCommissionsTool";

export const manifestB: Record<string, ComponentType> = {
  "whatsapp-link": WhatsappLinkTool,
  "phone-normalizer": PhoneNormalizerTool,
  "social-character-count": SocialCharacterCountTool,
  "nit-check-digit": NitCheckDigitTool,
  "email-signature": EmailSignatureTool,
  "sales-commissions": SalesCommissionsTool,
};
