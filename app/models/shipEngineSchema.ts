import z from "zod";
import { shipConditionSchema } from "./shipConditionSchema";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipEngineSchema = z.object({
  symbol: z.enum(["ENGINE_IMPULSE_DRIVE_I", "ENGINE_ION_DRIVE_I", "ENGINE_ION_DRIVE_II", "ENGINE_HYPER_DRIVE_I"]),
  name: z.string(),
  description: z.string(),
  condition: shipConditionSchema,
  speed: z.number(),
  requirements: shipRequirementsSchema
});

export type ShipEngine = z.infer<typeof shipEngineSchema>;
