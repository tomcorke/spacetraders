import z from "zod";
import { contractPaymentSchema } from "./contractPaymentSchema";

export const contractTermsSchema = z.object({
  deadline: z.string().datetime(),
  payment: contractPaymentSchema,
  deliver: z.array()
});

export type ContractTerms = z.infer<typeof contractTermsSchema>;
