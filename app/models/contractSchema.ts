import z from "zod";
import { contractTermsSchema } from "./contractTermsSchema";

export const contractSchema = z.object({
  id: z.string().min(1),
  factionSymbol: z.string().min(1),
  type: z.enum(["PROCUREMENT", "TRANSPORT", "SHUTTLE"]),
  terms: contractTermsSchema,
  accepted: z.boolean(),
  fulfilled: z.boolean(),
  expiration: z.string().datetime()
});

export type Contract = z.infer<typeof contractSchema>;
