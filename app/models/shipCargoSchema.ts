import z from "zod";

export const shipCargoSchema = z.object({
  capacity: z.number(),
  units: z.number(),
  inventory: z.array()
});

export type ShipCargo = z.infer<typeof shipCargoSchema>;
