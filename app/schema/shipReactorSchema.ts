import z from "zod";
import { shipConditionSchema } from "./shipConditionSchema";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipReactorSchema = z.object({
  symbol: z.enum(["REACTOR_SOLAR_I", "REACTOR_FUSION_I", "REACTOR_FISSION_I", "REACTOR_CHEMICAL_I", "REACTOR_ANTIMATTER_I"]),
  name: z.string(),
  description: z.string(),
  condition: shipConditionSchema.optional(),
  powerOutput: z.number().min(1),
  requirements: shipRequirementsSchema,
});

export type ShipReactor = z.infer<typeof shipReactorSchema>;
