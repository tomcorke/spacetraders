import z from "zod";
import { waypointTypeSchema } from "./waypointTypeSchema";

export const shipNavRouteWaypointSchema = z.object({
  symbol: z.string().min(1),
  type: waypointTypeSchema,
  systemSymbol: z.string().min(1),
  x: z.number(),
  y: z.number()
});

export type ShipNavRouteWaypoint = z.infer<typeof shipNavRouteWaypointSchema>;
