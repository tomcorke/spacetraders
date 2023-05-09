import z from "zod";

export const waypointFactionSchema = z.object({
  symbol: z.string().min(1)
});

export type WaypointFaction = z.infer<typeof waypointFactionSchema>;
