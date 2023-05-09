import z from "zod";
import { contractTermsSchema } from "./contractTermsSchema";

export const contractSchema = z.object({
  id: z.string(),
  factionSymbol: z.string(),
  type: z.string(),
  terms: contractTermsSchema,
  accepted: undefined,
  fulfilled: undefined,
  expiration: z.string()
});

export type Contract = z.infer<typeof contractSchema>;
