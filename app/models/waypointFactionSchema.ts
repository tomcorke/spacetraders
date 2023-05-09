import z from "zod";

export const waypointFactionSchema = z.object({
  symbol: z.string()
});

export type WaypointFaction = z.infer<typeof waypointFactionSchema>;
