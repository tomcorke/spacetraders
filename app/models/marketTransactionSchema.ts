import z from "zod";

export const marketTransactionSchema = z.object({
  // The symbol of the waypoint where the transaction took place.
  waypointSymbol: z.string(),
  // The symbol of the ship that made the transaction.
  shipSymbol: z.string(),
  // The symbol of the trade good.
  tradeSymbol: z.string(),
  // The type of transaction.
  type: z.enum(["PURCHASE", "SELL"]),
  // The number of units of the transaction.
  units: z.number().min(1),
  // The price per unit of the transaction.
  pricePerUnit: z.number().min(1),
  // The total price of the transaction.
  totalPrice: z.number().min(1),
  // The timestamp of the transaction.
  timestamp: z.string().datetime(),
});

export type MarketTransaction = z.infer<typeof marketTransactionSchema>;
