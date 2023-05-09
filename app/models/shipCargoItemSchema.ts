import z from "zod";

export const shipCargoItemSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string(),
  units: z.number()
});

export type ShipCargoItem = z.infer<typeof shipCargoItemSchema>;
