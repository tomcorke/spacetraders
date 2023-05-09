import z from "zod";
import { waypointTypeSchema } from "./waypointTypeSchema";
import { waypointFactionSchema } from "./waypointFactionSchema";
import { chartSchema } from "./chartSchema";

export const scannedWaypointSchema = z.object({
  symbol: z.string().min(1),
  type: waypointTypeSchema,
  systemSymbol: z.string().min(1),
  x: z.number(),
  y: z.number(),
  orbitals: z.array(),
  faction: waypointFactionSchema,
  traits: z.array(),
  chart: chartSchema
});

export type ScannedWaypoint = z.infer<typeof scannedWaypointSchema>;
