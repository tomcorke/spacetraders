import z from "zod";

export const contractDeliverGoodSchema = z.object({
  tradeSymbol: z.string(),
  destinationSymbol: z.string(),
  unitsRequired: z.number(),
  unitsFulfilled: z.number()
});

export type ContractDeliverGood = z.infer<typeof contractDeliverGoodSchema>;
