import z from "zod";

export const contractDeliverGoodSchema = z.object({
  tradeSymbol: z.string().min(1),
  destinationSymbol: z.string().min(1),
  unitsRequired: z.number(),
  unitsFulfilled: z.number()
});

export type ContractDeliverGood = z.infer<typeof contractDeliverGoodSchema>;
