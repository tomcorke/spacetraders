import z from "zod";

export const contractDeliverGoodSchema = z.object({
  // The symbol of the trade good to deliver.
  tradeSymbol: z.string().min(1),
  // The destination where goods need to be delivered.
  destinationSymbol: z.string().min(1),
  // The number of units that need to be delivered on this contract.
  unitsRequired: z.number(),
  // The number of units fulfilled on this contract.
  unitsFulfilled: z.number(),
});

export type ContractDeliverGood = z.infer<typeof contractDeliverGoodSchema>;
