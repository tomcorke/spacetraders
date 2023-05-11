import z from "zod";

export const shipCargoItemSchema = z.object({
  // The unique identifier of the cargo item type.
  symbol: z.string(),
  // The name of the cargo item type.
  name: z.string(),
  // The description of the cargo item type.
  description: z.string(),
  // The number of units of the cargo item.
  units: z.number().min(1),
});

export type ShipCargoItem = z.infer<typeof shipCargoItemSchema>;
