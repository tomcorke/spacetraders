import z from "zod";
import { contractPaymentSchema } from "./contractPaymentSchema";
import { contractDeliverGoodSchema } from "./contractDeliverGoodSchema";

export const contractTermsSchema = z.object({
  // The deadline for the contract.
  deadline: z.string().datetime(),
  payment: contractPaymentSchema,
  deliver: z.array(
    contractDeliverGoodSchema
  ).optional(),
});

export type ContractTerms = z.infer<typeof contractTermsSchema>;
