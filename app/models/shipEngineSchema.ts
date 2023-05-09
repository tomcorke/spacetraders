import z from "zod";
import { shipConditionSchema } from "./shipConditionSchema";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipEngineSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string(),
  condition: shipConditionSchema,
  speed: z.number(),
  requirements: shipRequirementsSchema
});

export type ShipEngine = z.infer<typeof shipEngineSchema>;
