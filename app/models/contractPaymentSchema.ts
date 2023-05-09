import z from "zod";

export const contractPaymentSchema = z.object({
  onAccepted: z.number(),
  onFulfilled: z.number()
});

export type ContractPayment = z.infer<typeof contractPaymentSchema>;
