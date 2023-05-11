import z from "zod";
import { waypointTypeSchema } from "./waypointTypeSchema";
import { waypointOrbitalSchema } from "./waypointOrbitalSchema";
import { waypointFactionSchema } from "./waypointFactionSchema";
import { waypointTraitSchema } from "./waypointTraitSchema";
import { chartSchema } from "./chartSchema";

export const scannedWaypointSchema = z.object({
  symbol: z.string().min(1),
  type: waypointTypeSchema,
  systemSymbol: z.string().min(1),
  x: z.number(),
  y: z.number(),
  orbitals: z.array(
    waypointOrbitalSchema
  ),
  faction: waypointFactionSchema.optional(),
  // The traits of the waypoint.
  traits: z.array(
    waypointTraitSchema
  ),
  chart: chartSchema.optional(),
});

export type ScannedWaypoint = z.infer<typeof scannedWaypointSchema>;
