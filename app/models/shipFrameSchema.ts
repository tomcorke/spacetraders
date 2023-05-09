import z from "zod";
import { shipConditionSchema } from "./shipConditionSchema";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipFrameSchema = z.object({
  symbol: z.enum(["FRAME_PROBE", "FRAME_DRONE", "FRAME_INTERCEPTOR", "FRAME_RACER", "FRAME_FIGHTER", "FRAME_FRIGATE", "FRAME_SHUTTLE", "FRAME_EXPLORER", "FRAME_MINER", "FRAME_LIGHT_FREIGHTER", "FRAME_HEAVY_FREIGHTER", "FRAME_TRANSPORT", "FRAME_DESTROYER", "FRAME_CRUISER", "FRAME_CARRIER"]),
  name: z.string(),
  description: z.string(),
  condition: shipConditionSchema.optional(),
  moduleSlots: z.number().min(0),
  mountingPoints: z.number().min(0),
  fuelCapacity: z.number().min(0),
  requirements: shipRequirementsSchema,
});

export type ShipFrame = z.infer<typeof shipFrameSchema>;
