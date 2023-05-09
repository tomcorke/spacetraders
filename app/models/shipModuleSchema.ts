import z from "zod";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipModuleSchema = z.object({
  symbol: z.string(),
  capacity: z.number(),
  range: z.number(),
  name: z.string(),
  description: z.string(),
  requirements: shipRequirementsSchema
});

export type ShipModule = z.infer<typeof shipModuleSchema>;
