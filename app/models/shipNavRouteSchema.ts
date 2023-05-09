import z from "zod";
import { shipNavRouteWaypointSchema } from "./shipNavRouteWaypointSchema";

export const shipNavRouteSchema = z.object({
  destination: shipNavRouteWaypointSchema,
  departure: shipNavRouteWaypointSchema,
  departureTime: z.string(),
  arrival: z.string()
});

export type ShipNavRoute = z.infer<typeof shipNavRouteSchema>;
