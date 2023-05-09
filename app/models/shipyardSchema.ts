import z from "zod";

export const shipyardSchema = z.object({
  symbol: z.string(),
  shipTypes: z.array(),
  transactions: z.array(),
  ships: z.array()
});

export type Shipyard = z.infer<typeof shipyardSchema>;
