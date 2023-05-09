import z from "zod";
import { systemTypeSchema } from "./systemTypeSchema";
import { systemWaypointSchema } from "./systemWaypointSchema";
import { systemFactionSchema } from "./systemFactionSchema";

export const systemSchema = z.object({
  symbol: z.string().min(1),
  sectorSymbol: z.string().min(1),
  type: systemTypeSchema,
  x: z.number(),
  y: z.number(),
  waypoints: z.array(
    systemWaypointSchema
  ),
  factions: z.array(
    systemFactionSchema
  ),
});

export type System = z.infer<typeof systemSchema>;
