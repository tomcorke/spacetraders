import z from "zod";
import { shipConditionSchema } from "./shipConditionSchema";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipReactorSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string(),
  condition: shipConditionSchema,
  powerOutput: z.number(),
  requirements: shipRequirementsSchema
});

export type ShipReactor = z.infer<typeof shipReactorSchema>;
