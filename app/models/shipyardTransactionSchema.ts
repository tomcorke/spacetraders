import z from "zod";

export const shipyardTransactionSchema = z.object({
  waypointSymbol: z.string(),
  shipSymbol: z.string(),
  price: z.number(),
  agentSymbol: z.string(),
  timestamp: z.string().datetime()
});

export type ShipyardTransaction = z.infer<typeof shipyardTransactionSchema>;
