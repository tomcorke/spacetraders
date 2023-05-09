import z from "zod";

export const waypointOrbitalSchema = z.object({
  symbol: z.string().min(1)
});

export type WaypointOrbital = z.infer<typeof waypointOrbitalSchema>;
