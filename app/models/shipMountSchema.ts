import z from "zod";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipMountSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string(),
  strength: z.number(),
  deposits: z.array(),
  requirements: shipRequirementsSchema
});

export type ShipMount = z.infer<typeof shipMountSchema>;
