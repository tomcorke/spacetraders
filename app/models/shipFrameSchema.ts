import z from "zod";
import { shipConditionSchema } from "./shipConditionSchema";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipFrameSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string(),
  condition: shipConditionSchema,
  moduleSlots: z.number(),
  mountingPoints: z.number(),
  fuelCapacity: z.number(),
  requirements: shipRequirementsSchema
});

export type ShipFrame = z.infer<typeof shipFrameSchema>;
