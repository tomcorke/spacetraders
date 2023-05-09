import z from "zod";

export const waypointTraitSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string()
});

export type WaypointTrait = z.infer<typeof waypointTraitSchema>;
