import z from "zod";
import { shipNavRouteSchema } from "./shipNavRouteSchema";
import { shipNavStatusSchema } from "./shipNavStatusSchema";
import { shipNavFlightModeSchema } from "./shipNavFlightModeSchema";

export const shipNavSchema = z.object({
  // The system symbol of the ship's current location.
  systemSymbol: z.string(),
  // The waypoint symbol of the ship's current location, or if the ship is in-transit, the waypoint symbol of the ship's destination.
  waypointSymbol: z.string(),
  route: shipNavRouteSchema,
  status: shipNavStatusSchema,
  flightMode: shipNavFlightModeSchema,
});

export type ShipNav = z.infer<typeof shipNavSchema>;
