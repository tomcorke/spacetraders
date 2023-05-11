import z from "zod";
import { contractTermsSchema } from "./contractTermsSchema";

export const contractSchema = z.object({
  id: z.string().min(1),
  // The symbol of the faction that this contract is for.
  factionSymbol: z.string().min(1),
  type: z.enum(["PROCUREMENT", "TRANSPORT", "SHUTTLE"]),
  terms: contractTermsSchema,
  // Whether the contract has been accepted by the agent
  accepted: z.boolean(),
  // Whether the contract has been fulfilled
  fulfilled: z.boolean(),
  // The time at which the contract expires
  expiration: z.string().datetime(),
});

export type Contract = z.infer<typeof contractSchema>;
