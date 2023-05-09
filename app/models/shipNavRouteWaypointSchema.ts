import z from "zod";
import { waypointTypeSchema } from "./waypointTypeSchema";

export const shipNavRouteWaypointSchema = z.object({
  symbol: z.string(),
  type: waypointTypeSchema,
  systemSymbol: z.string(),
  x: z.number(),
  y: z.number()
});

export type ShipNavRouteWaypoint = z.infer<typeof shipNavRouteWaypointSchema>;
