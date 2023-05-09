import z from "zod";
import { shipCargoItemSchema } from "./shipCargoItemSchema";

export const shipCargoSchema = z.object({
  // The max number of items that can be stored in the cargo hold.
  capacity: z.number().min(0),
  // The number of items currently stored in the cargo hold.
  units: z.number().min(0),
  // The items currently in the cargo hold.
  inventory: z.array(
    shipCargoItemSchema
  ),
});

export type ShipCargo = z.infer<typeof shipCargoSchema>;
