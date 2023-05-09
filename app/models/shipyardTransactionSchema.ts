import z from "zod";

export const shipyardTransactionSchema = z.object({
  // The symbol of the waypoint where the transaction took place.
  waypointSymbol: z.string(),
  // The symbol of the ship that was purchased.
  shipSymbol: z.string(),
  // The price of the transaction.
  price: z.number().min(1),
  // The symbol of the agent that made the transaction.
  agentSymbol: z.string(),
  // The timestamp of the transaction.
  timestamp: z.string().datetime(),
});

export type ShipyardTransaction = z.infer<typeof shipyardTransactionSchema>;
