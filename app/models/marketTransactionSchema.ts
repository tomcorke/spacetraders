import z from "zod";

export const marketTransactionSchema = z.object({
  waypointSymbol: z.string(),
  shipSymbol: z.string(),
  tradeSymbol: z.string(),
  type: z.string(),
  units: z.number(),
  pricePerUnit: z.number(),
  totalPrice: z.number(),
  timestamp: z.string()
});

export type MarketTransaction = z.infer<typeof marketTransactionSchema>;
