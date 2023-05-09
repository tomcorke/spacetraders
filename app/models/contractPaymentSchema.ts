import z from "zod";

export const contractPaymentSchema = z.object({
  // The amount of credits received up front for accepting the contract.
  onAccepted: z.number(),
  // The amount of credits received when the contract is fulfilled.
  onFulfilled: z.number(),
});

export type ContractPayment = z.infer<typeof contractPaymentSchema>;
