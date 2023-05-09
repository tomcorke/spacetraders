import z from "zod";
import { shipNavRouteWaypointSchema } from "./shipNavRouteWaypointSchema";

export const shipNavRouteSchema = z.object({
  destination: shipNavRouteWaypointSchema,
  departure: shipNavRouteWaypointSchema,
  // The date time of the ship's departure.
  departureTime: z.string().datetime(),
  // The date time of the ship's arrival. If the ship is in-transit, this is the expected time of arrival.
  arrival: z.string().datetime(),
});

export type ShipNavRoute = z.infer<typeof shipNavRouteSchema>;
