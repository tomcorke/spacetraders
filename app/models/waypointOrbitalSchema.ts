import z from "zod";

export const waypointOrbitalSchema = z.object({
  symbol: z.string()
});

export type WaypointOrbital = z.infer<typeof waypointOrbitalSchema>;
